import requests,json,pathlib,sys,concurrent.futures,hashlib
from bs4 import BeautifulSoup
from collections import Counter
base=sys.argv[1];out=pathlib.Path(sys.argv[2]);out.mkdir(parents=True,exist_ok=True)
fixture=json.loads(pathlib.Path(__file__).with_name('article-fixture.json').read_text());slug=fixture['slug'];articlePath='/blog/'+slug
result={'base':base,'checks':[]}
def get(path):
 r=requests.get(base+path,timeout=40);return r
def check(name,detail):result['checks'].append({'name':name,'passed':True,'detail':detail});print('PASS:',name,flush=True)
posts=get('/api/trpc/blog.list').json()['result']['data']['json'];assert len(posts)==1
post=posts[0];assert post['slug']==slug and post['content']==fixture['content'] and post['authorName']=='Brent';assert post['publishedAt'].startswith('2026-11-03')
result['publication']={k:post[k] for k in ['id','slug','title','authorName','publishedAt','updatedAt']};check('Actual database article matches owner source and current publication date',result['publication'])
by=get('/api/trpc/blog.bySlug?input='+requests.utils.quote(json.dumps({'json':{'slug':slug}}))).json()['result']['data']['json'];assert by['id']==post['id'];check('Listing and individual post agree',{'id':by['id']})
for origin in [base,'https://www.workshopcreativegroup.com']:
 for path in ['/blog',articlePath]:
  r=requests.get(origin+path,timeout=40);assert r.status_code==200;soup=BeautifulSoup(r.text,'html.parser');title=soup.title.text;canonical=soup.select_one('link[rel="canonical"]')['href'];assert canonical=='https://www.workshopcreativegroup.com'+path
  if path==articlePath:
   assert fixture['title'] in title;assert soup.select_one('meta[property="og:type"]')['content']=='article';schema=json.loads(soup.select_one('script[type="application/ld+json"]').text)[0];assert schema['@type']=='BlogPosting' and schema['author']['name']=='Brent' and schema['datePublished']==post['publishedAt'];assert schema['image'].endswith(post['coverImageUrl'])
  else:assert title=='Blog | Workshop Creative Group'
  assert 'noindex' not in soup.select_one('meta[name="robots"]')['content'];check('Initial HTML metadata/canonical '+origin+path,{'status':r.status_code,'title':title,'canonical':canonical})
  (out/('article-source.html' if path==articlePath else 'blog-source.html')).write_text(r.text)
img=get(post['coverImageUrl']);assert img.status_code==200 and img.headers.get('content-type','').startswith('image/');assert hashlib.sha256(img.content).hexdigest()==hashlib.sha256((pathlib.Path(__file__).resolve().parents[2]/'client/public'/post['coverImageUrl'].lstrip('/')).read_bytes()).hexdigest();check('Public article photo integrity',{'status':img.status_code,'bytes':len(img.content)})
sitemap=get('/sitemap.xml');assert sitemap.status_code==200 and '<loc>https://www.workshopcreativegroup.com/blog</loc>' in sitemap.text and 'https://www.workshopcreativegroup.com'+articlePath in sitemap.text;check('Blog and article included in sitemap',{'status':sitemap.status_code});(out/'sitemap.xml').write_text(sitemap.text)
missing=get('/blog/not-a-published-article');assert missing.status_code==404 and 'noindex,follow' in missing.text;check('Missing article HTTP 404/noindex',{'status':missing.status_code})
media=get('/api/trpc/media.gallery?input='+requests.utils.quote(json.dumps({'json':{}}))).json()['result']['data']['json'];records={item['id']:item for item in media}
def request_media(item):
 try:
  r=requests.get(base+item['src'],timeout=45);return {'id':item['id'],'status':r.status_code,'type':r.headers.get('content-type',''),'category':item['category']}
 except Exception as e:return {'id':item['id'],'error':type(e).__name__}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:outcomes=list(pool.map(request_media,records.values()))
assert all(x.get('status')==200 and (x['type'].startswith('image/') or x['type'].startswith('video/')) for x in outcomes)
result['media']={'count':len(outcomes),'categories':dict(Counter(x['category'] for x in outcomes)),'responses':outcomes};check('All published gallery/Home-logo media healthy',{'count':len(outcomes),'categories':result['media']['categories']})
result['passed']=True;(out/'http-audit.json').write_text(json.dumps(result,indent=2)+'\n');(out/'publication.json').write_text(json.dumps(result['publication'],indent=2)+'\n')
