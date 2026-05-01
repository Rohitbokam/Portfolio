import urllib.request
import re
html = urllib.request.urlopen('https://graphacademy.neo4j.com/c/f088a375-fa32-4c14-a8c0-8ce0dd8919aa/').read().decode('utf-8')
m = re.search(r'property="og:image"\s+content="([^"]+)"', html)
print(m.group(1) if m else 'Not found')
