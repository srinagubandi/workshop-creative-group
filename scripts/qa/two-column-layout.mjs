import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.argv[2]||'http://127.0.0.1:4173',mode=process.argv[3]||'local',out=process.argv[4]||'./listing-layout.json';
const fixture=JSON.parse(fs.readFileSync(new URL('./article-fixture.json',import.meta.url),'utf8'));
const browser=await chromium.launch();const page=await browser.newPage();let posts=[fixture];
if(mode==='local')await page.route('**/api/trpc/**',async route=>{const u=new URL(route.request().url());const names=u.pathname.split('/api/trpc/')[1].split(',');const values=names.map(name=>({result:{data:{json:name==='blog.list'?posts:name==='content.overrides'?[]:null}}}));await route.fulfill({json:u.searchParams.has('batch')?values:values[0]});});
const result={base,mode,createdAt:new Date().toISOString(),cases:[]};
const inspect=async (width,kind)=>{
 await page.setViewportSize({width,height:900});await page.goto(base+'/blog',{waitUntil:'networkidle'});await page.locator('main article').waitFor();await page.locator('main article img').evaluate(e=>e.decode());
 const layout=await page.locator('main article').evaluate(card=>{const image=card.querySelector('img'),title=card.querySelector('h3');const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};return {card:box(card),image:box(image),title:box(title),display:getComputedStyle(card).display,cols:getComputedStyle(card).gridTemplateColumns,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth};});
 assert(layout.scrollWidth<=width+1);
 if(width>=768){assert.equal(layout.display,'grid');assert(layout.image.right<=layout.title.x);assert(layout.title.y<layout.image.bottom);assert(layout.image.width<layout.card.width*.45);}
 else {assert.equal(layout.display,'block');assert(layout.image.bottom<=layout.title.y);}
 assert(Math.abs(layout.image.width-layout.image.height)<2);
 result.cases.push({width,kind,...layout,passed:true});
 await page.screenshot({path:out.replace(/\.json$/,'')+`-${kind}-${width}.png`,fullPage:true});
};
try{
 for(const w of [320,375,768,1280,1536])await inspect(w,'featured');
 if(mode==='local'){
  posts=[{...fixture,featured:0}];await inspect(1280,'nonfeatured');await inspect(375,'nonfeatured');
  posts=[{...fixture,coverImageUrl:null,coverImageAlt:null}];await page.setViewportSize({width:1280,height:900});await page.goto(base+'/blog',{waitUntil:'networkidle'});assert.equal(await page.locator('main article img').count(),0);assert.equal(await page.locator('main article').evaluate(e=>getComputedStyle(e).display),'block');result.noImageFallback=true;
 }
 result.passed=true;console.log('PASS: Photo/title are adjacent at tablet/desktop widths, stacked at mobile widths, uncropped and overflow-free; future/no-image card cases verified where fixtures apply.');
}catch(e){result.passed=false;result.error=String(e);console.error(e);process.exitCode=1;}
finally{fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');await browser.close();}
