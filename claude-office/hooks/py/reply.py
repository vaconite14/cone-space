import json, os, sys, time, hmac, hashlib
try:
    r = json.loads(sys.stdin.read() or '{}')
except Exception:
    r = {}
if not isinstance(r, dict):
    r = {}
mode = sys.argv[1] if len(sys.argv) > 1 else ''
if mode == 'created':
    wait = r.get('wait') if isinstance(r.get('wait'), dict) else {}
    pid = r.get('permissionId')
    if isinstance(pid, str) and pid:
        print('\x1f'.join([pid, str(int(wait.get('pollMs') or 20000)), str(int(wait.get('deadline') or 0))]))
elif mode == 'poll':
    status = str(r.get('status') or '')
    deadline = r.get('deadline')
    late = isinstance(deadline, (int, float)) and time.time() * 1000 > deadline + 2000
    out = ''
    if status in ('allowed', 'denied'):
        token = os.environ.get('OFFICE_TOKEN', '')
        nonce = os.environ.get('OFFICE_NONCE', '')
        pid = sys.argv[2] if len(sys.argv) > 2 else ''
        decision = str(r.get('decision') or '')
        proof = str(r.get('proof') or '')
        if token and nonce and decision in ('allow', 'allow-remember', 'deny'):
            # Constant-time check that the answer came from a holder of the
            # token. A squatter cannot produce this, so its answer prints
            # nothing and the terminal dialog stays in charge.
            expected = hmac.new(token.encode(), (nonce + pid + decision).encode(), hashlib.sha256).hexdigest()
            if hmac.compare_digest(expected, proof):
                if decision == 'allow':
                    dec = {'behavior': 'allow'}
                elif decision == 'allow-remember':
                    try:
                        suggestions = json.loads(os.environ.get('OFFICE_SUGGESTIONS', '[]'))
                    except Exception:
                        suggestions = []
                    if not isinstance(suggestions, list):
                        suggestions = []
                    # Echo only the dialog's OWN permission_suggestions, never
                    # anything the server made up, and never an updatedInput.
                    dec = {'behavior': 'allow', 'updatedPermissions': suggestions}
                else:
                    dec = {'behavior': 'deny', 'message': 'Denied from Claude Office', 'interrupt': False}
                out = json.dumps({'hookSpecificOutput': {'hookEventName': 'PermissionRequest', 'decision': dec}})
    print('\x1f'.join([status, '1' if late else '0', out]))
