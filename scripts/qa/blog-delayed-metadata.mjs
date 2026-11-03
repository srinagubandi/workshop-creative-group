import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.argv[2] || 'http://127.0.0.1:4173';
const mode=process.argv[3] || 'local';
const output=process.argv[4] || './delayed-metadata.json';
const article=JSON.parse(fs.readFileSync(new URL('./article-fixture.json',import.meta.url),'utf8'));
const articlePath='/blog/'+article.slug;
const browser=await chromium.launch();const page=await browser.newPage();
let release;const gate=new Promise(resolve=>release=resolve);
if(mode==='local')await page.route(base+articlePath,async r=>{await r.fulfill({status:200,contentType:'text/html',body:fs.readFileSync(new URL('./article-server-fixture.html',import.meta.url),'utf8')});});
await page.route('**/api/trpc/**',async route=>{
 const url=new URL(route.request().url());const names=url.pathname.split('/api/trpc/')[1].split(',');
 if(names.includes('blog.bySlug'))await gate;
 if(mode==='live'){const response=await route.fetch();await route.fulfill({response});}
 else {const values=names.map(name=>({result:{data:{json:name==='blog.bySlug'?article:name==='content.overrides'?[]:null}}}));await route.fulfill({json:url.searchParams.has('batch')?values:values[0]});}
});
const head=()=>page.evaluate(()=>({title:document.title,canonical:document.querySelector('link[rel="canonical"]').href,robots:document.querySelector('meta[name="robots"]').content,schema:JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)}));
const result={base,mode,createdAt:new Date().toISOString()};
try{
 await page.goto(base+articlePath,{waitUntil:'domcontentloaded'});
 await page.getByRole('status').filter({hasText:'Loading article'}).waitFor();await page.waitForTimeout(300);
 result.pending=await head();assert(result.pending.title.includes(article.title));assert(result.pending.canonical.endsWith(articlePath));assert(!result.pending.robots.includes('noindex'));assert.equal(result.pending.schema[0]['@type'],'BlogPosting');
 release();await page.locator('#article-heading').waitFor();await page.waitForTimeout(100);result.resolved=await head();assert.deepEqual(result.resolved,result.pending);result.passed=true;console.log('PASS: Authoritative server article metadata is unchanged during delayed API loading and resolution.');
}catch(e){result.passed=false;result.error=String(e);console.error(e);process.exitCode=1;}
finally{release();fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');await browser.close();}
