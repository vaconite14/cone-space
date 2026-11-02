# Sets up Cone Space on a Windows device: tools, the office server, hooks, voice and a desktop shortcut.
# Run once per device from the cloned folder (double-click Setup-Kantor.cmd). Safe to re-run: finished steps are skipped.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

function Step($msg) { Write-Host "`n== $msg" -ForegroundColor Cyan }
function Refresh-Path { $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User') }
function Install-IfMissing($id, [scriptblock]$present) {
  if (& $present) { Write-Host "  sudah ada: $id" ; return }
  Write-Host "  memasang $id ..."
  winget install --id $id -e --silent --accept-package-agreements --accept-source-agreements
  Refresh-Path
}

Step 'Memasang program yang dibutuhkan (bisa minta izin administrator)'
$py = Join-Path $env:LOCALAPPDATA 'Programs\Python\Python312'
Install-IfMissing 'Git.Git' { Test-Path 'C:\Program Files\Git\bin\bash.exe' }
Install-IfMissing 'OpenJS.NodeJS.LTS' { Test-Path 'C:\Program Files\nodejs\node.exe' }
Install-IfMissing 'Python.Python.3.12' { Test-Path (Join-Path $py 'python.exe') }
Install-IfMissing 'Gyan.FFmpeg' { Get-Command ffmpeg -ErrorAction SilentlyContinue }
Install-IfMissing 'GitHub.cli' { Get-Command gh -ErrorAction SilentlyContinue }
if (-not (Test-Path 'C:\Program Files\Google\Chrome\Application\chrome.exe')) { Write-Warning 'Google Chrome belum terpasang: dibutuhkan untuk render video (animation-studio). Pasang dari google.com/chrome.' }
Refresh-Path

Step 'Menyiapkan bash dan python3 untuk hook'
if (-not (Test-Path (Join-Path $py 'python3.exe'))) { Copy-Item (Join-Path $py 'python.exe') (Join-Path $py 'python3.exe') }
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -notlike '*Git\bin*') { [Environment]::SetEnvironmentVariable('Path', 'C:\Program Files\Git\bin;' + $userPath, 'User') }
Refresh-Path

Step 'Memasang Claude CLI dan suara AI (edge-tts)'
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) { & npm.cmd install -g @anthropic-ai/claude-code --no-fund --no-audit }
& (Join-Path $py 'python.exe') -m pip install --user --quiet edge-tts

Step 'Menyiapkan server kantor (claude-office)'
Push-Location (Join-Path $root 'claude-office')
& npm.cmd install --no-fund --no-audit
& npm.cmd rebuild better-sqlite3
& npm.cmd run build
Pop-Location

Step 'Menghubungkan Claude Code ke rapat video (hook)'
& node (Join-Path $root 'setup\install-hooks.mjs')

Step 'Membuat shortcut di Desktop'
$shell = New-Object -ComObject WScript.Shell
$lnk = $shell.CreateShortcut((Join-Path ([Environment]::GetFolderPath('Desktop')) 'Cone Space.lnk'))
$lnk.TargetPath = Join-Path $root 'Mulai-Kantor.cmd'
$lnk.WorkingDirectory = $root
$lnk.Save()

Step 'Login'
& git config user.name 'Val Aconite'
& git config http.postBuffer 524288000 # big pushes (renders, assets) were reset mid-way without it
& git config http.version HTTP/1.1
# status checks go through cmd: in PowerShell 5.1 a redirected native stderr would stop this script
cmd /c "gh auth status >nul 2>&1"; if ($LASTEXITCODE -ne 0) { Write-Host 'Login GitHub (untuk sinkron):'; gh auth login --web --git-protocol https }
gh auth setup-git
cmd /c "claude auth status >nul 2>&1"; if ($LASTEXITCODE -ne 0) { Write-Host 'Login Claude (untuk Sena di chat):'; & claude.cmd auth login }

Write-Host "`nSelesai! Buka 'Cone Space' di Desktop. Login Claude di aplikasi desktop dan Google Drive tetap per device." -ForegroundColor Green
