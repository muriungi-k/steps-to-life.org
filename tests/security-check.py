from pathlib import Path
from html.parser import HTMLParser
class Audit(HTMLParser):
 def __init__(self):super().__init__();self.csp=False;self.cookies=False
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if tag=='meta' and d.get('http-equiv')=='Content-Security-Policy':
   self.csp=True
   for directive in ["script-src 'self'", "script-src-attr 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'"]:assert directive in d.get('content','')
  if tag=='script' and d.get('src')=='js/cookies.js':self.cookies=True
  assert not any(key.lower().startswith('on') for key in d),'Inline event handler'
  if tag=='a' and d.get('target')=='_blank':assert {'noopener','noreferrer'}.issubset(set(d.get('rel','').split()))
  if tag=='iframe':assert 'src' not in d and d.get('data-consent-src','').startswith('https://www.youtube-nocookie.com/embed/')
for page in Path('.').glob('*.html'):
 audit=Audit();audit.feed(page.read_text());assert audit.csp and audit.cookies,page
assert 'innerHTML =' not in Path('js/shop.js').read_text()
assert "frame-ancestors 'none'" in Path('_headers').read_text()
print('Passed: CSP, consent script, external-link protections, consent-gated frames, safe product rendering, and production anti-framing headers.')
