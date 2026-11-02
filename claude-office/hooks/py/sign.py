import os, sys, time, hashlib
token = os.environ.get('OFFICE_TOKEN', '')
if not token:
    sys.exit(0)
def _hmac_sha256_hex(key, msg):
    # HMAC-SHA256 per RFC 2104 on hashlib, far cheaper to load than hmac:
    # importing the hmac module costs ~5 ms on every hook run
    if len(key) > 64:
        key = hashlib.sha256(key).digest()
    key = key.ljust(64, b'\0')
    inner = hashlib.sha256(bytes(b ^ 0x36 for b in key) + msg).digest()
    return hashlib.sha256(bytes(b ^ 0x5c for b in key) + inner).hexdigest()

def _url_path(url):
    # The request path and query of a URL (what urlsplit gives, without
    # importing urllib.parse): http://127.0.0.1:3334/event?x -> /event?x
    rest = url.split('://', 1)[-1].split('#', 1)[0]
    i = rest.find('/')
    return rest[i:] if i >= 0 else '/'

method = os.environ.get('OFFICE_METHOD', '')
path = _url_path(os.environ.get('OFFICE_URL', ''))
body = sys.stdin.buffer.read()
ts = str(int(time.time() * 1000))
msg = (method + '\n' + path + '\n' + ts + '\n').encode() + body
sig = _hmac_sha256_hex(token.encode(), msg)
sys.stdout.write(ts + '\x1f' + sig)
