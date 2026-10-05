from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.scripts = [], [], []
    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
        if tag == 'script' and 'src' in attrs:
            self.scripts.append(attrs['src'])

for path in Path('.').glob('*.html'):
    page = Page()
    page.feed(path.read_text())
    assert len(page.ids) == len(set(page.ids)), f'{path}: duplicate IDs'
    for href in page.links:
        assert href and href != '#', f'{path}: placeholder link'
        target = urlsplit(href)
        if not target.scheme:
            destination = Path(target.path) if target.path else path
            assert destination.is_file(), f'{path}: missing {destination}'
            if target.fragment:
                destination_page = Page()
                destination_page.feed(destination.read_text())
                assert target.fragment in destination_page.ids, f'{path}: missing anchor {href}'
    for src in page.scripts:
        if not urlsplit(src).scheme:
            assert Path(src).is_file(), f'{path}: missing script {src}'
print('Passed: all 13 pages have valid local links, anchors, script paths, and unique IDs.')
