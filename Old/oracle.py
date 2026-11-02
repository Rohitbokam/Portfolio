import urllib.request
import re
req = urllib.request.Request('https://catalog-education.oracle.com/ords/certview/sharebadge?id=059B313F5DE072A3730229BB818D6AFA9B989C1BCEDA9E37127A4CD04EEA34EE', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
m = re.search(r'property="og:image"\s+content="([^"]+)"', html)
print(m.group(1) if m else 'Not found')
