// Team bridge: the video call's chat works like a group chat with the whole office.
// Polls the office chat for messages from Val. A small, cheap "router" call reads each message and decides who
// answers (whoever Val calls by name, a few teammates for a general message, Sena when nobody fits) and how
// heavy the answer is: "ringan" (small talk, a cheap model), "diskusi" (a thoughtful talk, a mid model) or
// "kerja" (real work with tools, the full model). Each teammate runs as its own Claude Code session
// (--agent <type>, Sena as the main session) and posts its reply to the chat under its own name.
// Sessions are kept across messages in .sena-session.json; each teammate handles its messages one at a time.
// Which session belongs to whom goes to claude-office/dist/rapat-status.json so the call page can light the right tile.
//
//   node sena-bridge.mjs        (the office server must be running on 127.0.0.1:3334)
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const SERVER = 'http://127.0.0.1:3334';
const HERE = dirname(fileURLToPath(import.meta.url));
const STATE = join(HERE, '.sena-session.json');
const LOCK = join(HERE, '.sena-bridge.pid');
const STATUS = join(HERE, 'claude-office', 'dist', 'rapat-status.json');
const FROM = 'Val';
const CLAUDE = join(process.env.APPDATA || '', 'npm', 'claude.cmd');
const MAX_REPLIES = 3;
// the router replaces Claude Code's long default system prompt with this one line
const ROUTER_PROMPT = join(tmpdir(), 'cone-space-router.txt');
writeFileSync(ROUTER_PROMPT, 'Kamu pengatur giliran bicara di grup chat. Balas hanya dengan JSON sesuai instruksi pengguna.');

// One bridge only: a second copy would answer every message twice
if (existsSync(LOCK)) {
  const pid = Number(readFileSync(LOCK, 'utf8'));
  // an emptied lock reads as pid 0, and kill(0, 0) always succeeds: only a real pid counts
  if (pid > 0) {
    try { process.kill(pid, 0); console.log(`[tim] bridge sudah jalan (pid ${pid}), yang ini berhenti.`); process.exit(0); } catch { /* stale lock */ }
  }
}
writeFileSync(LOCK, String(process.pid));
const unlock = () => { try { if (Number(readFileSync(LOCK, 'utf8')) === process.pid) writeFileSync(LOCK, ''); } catch {} };
process.on('exit', unlock);
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(sig, () => process.exit(0));

// The team: `type` is the subagent type (null = Sena, the main session), `name` is how they sign in the chat
const TEAM = {
  sena: { name: 'Sena', type: null, about: 'Manager kantor: koordinasi, status tugas, brief umum, apa pun yang tidak jelas untuk siapa' },
  'riset-tren': { name: 'Salomo', type: 'riset-tren', about: 'riset tren, ide & kompetitor' },
  scriptwriter: { name: 'Daud', type: 'scriptwriter', about: 'naskah, caption, copy, judul & deskripsi' },
  planner: { name: 'Saul', type: 'planner', about: 'kalender, jadwal, timeline & strategi' },
  'brand-manager': { name: 'Yerobeam', type: 'brand-manager', about: 'email marketing, brand deal & follow-up (draft)' },
  'video-editor': { name: 'Yehu', type: 'video-editor', about: 'video & motion graphic Remotion, storyboard, render' },
  'analis-data': { name: 'Omri', type: 'analis-data', about: 'analisis data & performa, rekap + grafik' },
  keuangan: { name: 'Menahem', type: 'keuangan', about: 'pencatatan keuangan & budget di Google Sheets' },
};

// Model and tools per tier. "kerja" keeps the old bridge's tools (approved by Val on 2026-10-28: shell for Yehu's renders;
// CLAUDE.md limits what the shell is used for); an --agent session is further limited to its own agent's tools.
// "lean" tiers load only their few tools: no MCP connectors and no skills, which keeps a chat reply to a few thousand tokens.
const LEAN = ['--strict-mcp-config', '--disable-slash-commands'];
const TIERS = {
  ringan: { model: 'haiku', tools: 'Read,Glob,Grep', lean: true, note: 'Ini obrolan santai: balas pendek (1-3 kalimat), natural, tanpa mengerjakan tugas.' },
  diskusi: { model: 'sonnet', tools: 'Read,Glob,Grep,WebSearch,WebFetch', lean: true, note: 'Ini diskusi serius: jawab dengan pertimbangan yang matang tapi tetap ringkas. Jangan menulis file kecuali diminta.' },
  kerja: { model: null, tools: 'Read,Write,Edit,Glob,Grep,WebSearch,WebFetch,Agent,Task,TodoWrite,Skill,PowerShell,Bash', note: 'Ini tugas: kerjakan sampai selesai, simpan hasil panjang ke file lalu sebut path-nya, dan catat tugasnya di office/data/tasks.js (+ Notion) sesuai CLAUDE.md.' },
};

const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
state.since ??= Date.now();
state.sessions ??= {};
// the old single-thread bridge kept Sena's session at the top level
if (state.sessionId && !state.sessions.sena) state.sessions.sena = { id: state.sessionId, started: !!state.started };
delete state.sessionId; delete state.started;
const save = () => writeFileSync(STATE, JSON.stringify(state, null, 1));
save();

// ---------- what the call page needs to know ----------
const working = {}, routerIds = [], chatSessions = {};
function writeStatus() {
  try {
    mkdirSync(dirname(STATUS), { recursive: true });
    const sessions = { ...chatSessions, ...Object.fromEntries(Object.entries(state.sessions).map(([who, s]) => [s.id, who])) };
    writeFileSync(STATUS, JSON.stringify({ updated: Date.now(), sessions, router: routerIds, working }));
  } catch (e) { console.error('[tim] status tidak bisa ditulis:', e.message); }
}
writeStatus();

// ---------- chat ----------
const history = []; // recent lines, so every teammate knows what was just said
const remember = (who, text) => { history.push(`${who}: ${String(text).replace(/\s+/g, ' ').slice(0, 400)}`); while (history.length > 14) history.shift(); };
const post = (sender, text) => fetch(`${SERVER}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sender, text }) });
async function reply(sender, text) {
  // the server keeps 2000 characters per message: long answers go out in parts
  const parts = String(text).match(/[\s\S]{1,1900}(?=\s|$)|[\s\S]{1,1900}/g) || ['(kosong)'];
  for (const p of parts) await post(sender, p.trim());
}

// ---------- running Claude ----------
function runClaude(args, input) {
  return new Promise((resolve) => {
    // claude.cmd needs a shell on Windows; every argument is a fixed token without spaces
    const child = spawn(`"${CLAUDE}" ${args.join(' ')}`, { cwd: HERE, shell: true, windowsHide: true });
    let out = '', err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('close', (code) => {
      try { resolve({ ok: true, ...JSON.parse(out) }); }
      catch { resolve({ ok: false, error: `kode ${code}. ${err.trim().split('\n').slice(-2).join(' ')}` }); }
    });
    child.stdin.end(input);
  });
}

// The router: one cheap call, no tools, no saved session; answers with JSON only
async function route(text, ctx) {
  const roster = Object.entries(TEAM).map(([id, t]) => `- ${id} (${t.name}): ${t.about}`).join('\n');
  const ask = `Kamu pengatur giliran bicara di grup chat kantor Val. Tentukan siapa yang menjawab pesan terbaru Val dan seberat apa jawabannya.

Anggota:
${roster}

Aturan:
- Kalau Val memanggil nama tertentu (atau jelas mengajak bicara orang tertentu), HANYA mereka yang menjawab, kecuali Val juga minta pendapat yang lain.
- Pesan untuk semua orang (sapaan, "gimana semuanya", pengumuman) dijawab 2-3 anggota yang paling nyambung; Sena boleh ikut.
- Pesan tanpa sasaran jelas: pilih 1 anggota yang paling relevan; kalau tidak ada yang cocok, Sena.
- Maksimal ${MAX_REPLIES} anggota.
- tier "ringan": basa-basi, sapaan, bercanda, pertanyaan singkat yang bisa dijawab langsung.
- tier "diskusi": diskusi serius, minta pendapat/strategi/analisis, pertimbangan penting, tapi belum minta dibuatkan sesuatu.
- tier "kerja": minta dibuatkan/dikerjakan sesuatu (file, naskah, riset web, jadwal, email, edit sheet, video), atau tugas penting.

Obrolan terakhir:
${ctx || '(belum ada)'}

Pesan terbaru Val: ${text}

Balas HANYA JSON tanpa teks lain, contoh: {"replies":[{"agent":"riset-tren","tier":"ringan"}]}`;
  const id = randomUUID();
  routerIds.push(id); while (routerIds.length > 30) routerIds.shift();
  writeStatus();
  const r = await runClaude(['-p', '--output-format', 'json', '--model', 'haiku', '--tools', '""', ...LEAN, '--no-session-persistence',
    '--system-prompt-file', `"${ROUTER_PROMPT}"`, '--session-id', id], ask);
  if (r.ok) console.log(`[tim] router: $${(r.total_cost_usd || 0).toFixed(4)}`);
  try {
    const json = JSON.parse(String(r.result).match(/\{[\s\S]*\}/)[0]);
    const seen = new Set();
    const picks = (json.replies || [])
      .filter((p) => TEAM[p.agent] && TIERS[p.tier] && !seen.has(p.agent) && seen.add(p.agent))
      .slice(0, MAX_REPLIES);
    if (picks.length) return picks;
  } catch { console.error('[tim] router gagal:', r.error || String(r.result).slice(0, 200)); }
  return [{ agent: 'sena', tier: 'kerja' }]; // when unsure, Sena handles it like before
}

async function askMember(who, tier, text, ctx) {
  const t = TEAM[who], tr = TIERS[tier];
  // Chat and discussion start a short throwaway session (the recent chat lines are enough context, and resuming a long
  // work session on a small model would re-read all of it); real work continues the teammate's own session.
  const s = tr.lean ? { id: randomUUID(), lean: true } : (state.sessions[who] ??= { id: randomUUID(), started: false });
  if (s.lean) { chatSessions[s.id] = who; const ids = Object.keys(chatSessions); if (ids.length > 30) delete chatSessions[ids[0]]; writeStatus(); }
  const args = ['-p', '--output-format', 'json', '--permission-mode', 'acceptEdits', '--allowedTools', tr.tools,
    ...(tr.lean ? ['--tools', tr.tools, ...LEAN, '--no-session-persistence'] : []),
    ...(tr.model ? ['--model', tr.model] : []),
    ...(t.type ? ['--agent', t.type] : []),
    ...(s.started ? ['--resume', s.id] : ['--session-id', s.id])];
  const me = t.type ? `Kamu ${t.name} (bukan Sena); aturan kantor di CLAUDE.md tetap berlaku, tapi jawab sebagai dirimu sendiri. ` : '';
  const input = `[Pesan dari Val lewat chat rapat video (grup chat tim). ${me}${tr.note} Jangan tulis nama atau label di awal balasan.]

Obrolan terakhir:
${ctx || '(belum ada)'}

Val: ${text}`;
  const r = await runClaude(args, input);
  if (r.ok) { if (!s.lean) { s.started = true; save(); } console.log(`[tim] ${t.name} (${tier}, ${tr.model || 'model penuh'}): $${(r.total_cost_usd || 0).toFixed(4)}`); }
  if (!r.ok) return `Maaf Val, aku gagal jalan (${r.error})`;
  return r.is_error ? `Maaf Val, ada kendala: ${r.result || r.subtype}` : r.result;
}

// After real work, save and share it with Val's other devices (Sinkron.cmd: commit, pull --rebase, push)
let syncing = Promise.resolve();
function sync() {
  if (!existsSync(join(HERE, '.git'))) return syncing;
  syncing = syncing.then(() => new Promise((resolve) => {
    const child = spawn('cmd', ['/c', join(HERE, 'Sinkron.cmd')], { cwd: HERE, windowsHide: true });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.on('close', async (code) => {
      console.log(`[tim] sync ${code === 0 ? 'ok' : 'failed'}`);
      if (code !== 0) await post('Sena', `⚠ Sinkron ke GitHub gagal: ${out.trim().split('\n').pop() || 'cek terminal'}`).catch(() => {});
      resolve();
    });
  }));
  return syncing;
}

// ---------- queues: messages are routed in order; each teammate answers its own messages one at a time ----------
const inbox = [], lanes = {};
let routing = false;
async function routeNext() {
  if (routing || !inbox.length) return;
  routing = true;
  const m = inbox.shift();
  console.log(`[tim] Val: ${m.text}`);
  const ctx = history.join('\n'); // what was said before this message
  remember('Val', m.text);
  const picks = await route(m.text, ctx);
  console.log(`[tim] -> ${picks.map((p) => `${TEAM[p.agent].name}(${p.tier})`).join(', ')}`);
  for (const p of picks) {
    (lanes[p.agent] ??= { busy: false, jobs: [] }).jobs.push({ ...p, text: m.text, ctx });
    working[p.agent] ??= Date.now();
    runLane(p.agent);
  }
  writeStatus();
  routing = false;
  routeNext();
}

async function runLane(who) {
  const lane = lanes[who];
  if (lane.busy || !lane.jobs.length) return;
  lane.busy = true;
  const job = lane.jobs.shift();
  working[who] = Date.now(); writeStatus();
  const answer = await askMember(who, job.tier, job.text, job.ctx);
  const name = TEAM[who].name;
  console.log(`[tim] ${name}: ${String(answer).slice(0, 120)}`);
  remember(name, answer);
  await reply(name, answer).catch((e) => console.error('[tim] balasan gagal dikirim:', e.message));
  if (!lane.jobs.length) delete working[who];
  writeStatus();
  if (job.tier === 'kerja') await sync();
  lane.busy = false;
  runLane(who);
}

async function poll() {
  try {
    const { messages = [] } = await (await fetch(`${SERVER}/chat?since=${state.since}`)).json();
    for (const m of messages) {
      if (m.id <= (state.lastId || 0)) continue; // seen on an earlier tick
      state.lastId = m.id;
      if (m.timestamp > state.since) state.since = m.timestamp - 1;
      if (m.sender === FROM && m.text && !m.text.startsWith('/')) inbox.push(m);
    }
    save();
    routeNext();
  } catch {
    // the office server is not up yet: try again on the next tick
  }
}

console.log(`[tim] bridge siap: chat dari ${FROM} -> grup chat tim di ${HERE}`);
setInterval(poll, 2000);
poll();
