// Registers the office's hooks in Claude Code's user settings (~/.claude/settings.json) so every Claude session on this
// device reports to the video call. Safe to re-run: the office's old entries (any path to agent-tracker.sh) are replaced,
// everything else in the file is kept, and a backup is written first.
//   node setup/install-hooks.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tracker = path.join(root, 'claude-office', 'hooks', 'agent-tracker.sh').replaceAll('\\', '/');
const bash = 'C:/Program Files/Git/bin/bash.exe';
const EVENTS = ['PreToolUse', 'PostToolUse', 'PostToolUseFailure', 'SubagentStart', 'SubagentStop', 'SessionStart', 'SessionEnd',
  'UserPromptSubmit', 'Stop', 'PermissionRequest', 'Notification', 'StopFailure', 'PreCompact', 'PostCompact', 'PostToolBatch',
  'CwdChanged', 'PostModelSwitch', 'TaskCreated', 'TaskCompleted'];

const dir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const file = path.join(dir, 'settings.json');
fs.mkdirSync(dir, { recursive: true });

let settings = {};
if (fs.existsSync(file)) {
  const raw = fs.readFileSync(file, 'utf8');
  try { settings = raw.trim() ? JSON.parse(raw) : {}; } catch (e) {
    console.error(`settings.json is not valid JSON (${e.message}); nothing changed. Fix it or move it away, then re-run.`);
    process.exit(1);
  }
  fs.copyFileSync(file, `${file}.backup-${Date.now()}`);
}

settings.hooks ??= {};
for (const ev of EVENTS) {
  // exec form (command + args): runs bash directly, and a failing hook never blocks Claude's tools
  const kept = (settings.hooks[ev] || []).filter((group) => !JSON.stringify(group).includes('agent-tracker'));
  settings.hooks[ev] = [...kept, { hooks: [{ type: 'command', command: bash, args: [tracker] }] }];
}
fs.writeFileSync(file, JSON.stringify(settings, null, 2));
console.log(`hooks -> ${tracker}\nwritten to ${file}`);
