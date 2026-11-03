import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const base = process.argv[2] || 'http://127.0.0.1:4173';
const mode = process.argv[3] || 'local';
const out = path.resolve(process.argv[4] || `evidence-${mode}`);
fs.mkdirSync(out, {recursive:true});
const fixture = JSON.parse(fs.readFileSync(new URL('./article-fixture.json',import.meta.url),'utf8'));
const articlePath = '/blog/'+fixture.slug;
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({viewport:{width:1536,height:900}});
let localList = [fixture];
if (mode==='local') {
 await context.route('**/api/trpc/**', async route => {
  const url = new URL(route.request().url());
  const names = url.pathname.split('/api/trpc/')[1].split(',');
  const input = JSON.parse(url.searchParams.get('input') || '{}');
  const values = names.map((name,i) => {
   let result = null;
   if (name==='blog.list') result=localList;
   else if(name==='blog.bySlug') result=(input[i]?.json?.slug===fixture.slug || input.json?.slug===fixture.slug)?fixture:null;
   else if(name==='content.overrides'||name==='testimonials.list'||name==='media.gallery') result=[];
   return {result:{data:{json:result}}};
  });
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(url.searchParams.has('batch')?values:values[0])});
 });
}
const page = await context.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const result={mode,base,createdAt:new Date().toISOString(),browser:browser.version(),checks:[],scans:[],reflow:[],consoleErrors:errors};
const check=(name,detail)=>{result.checks.push({name,passed:true,detail});console.log('PASS:',name);};
const goto=async p=>{await page.goto(base+p,{waitUntil:'networkidle'});await page.locator('h1').waitFor();};
const noOverflow=async()=>page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,passed:document.documentElement.scrollWidth<=innerWidth+1}));
try {
 await goto('/blog');
 assert.equal(await page.locator('h1').innerText(),'Blog');
 assert.equal(await page.title(),'Blog | Workshop Creative Group');
 assert(!/Brent['’]s Blog|Read It or Listen|Relationships That Shaped/.test(await page.locator('body').innerText()));
 check('Neutral Blog branding without old intro or placeholder');
 assert.equal(await page.locator('main article').count(),1);
 await page.locator('main article img').evaluate(im=>im.decode());
 const image=await page.locator('main article img').evaluate(im=>({naturalWidth:im.naturalWidth,naturalHeight:im.naturalHeight,alt:im.alt,displayWidth:im.width,displayHeight:im.height}));
 assert.equal(image.naturalWidth,1024);assert.equal(image.naturalHeight,1024);assert(image.alt.includes('Just serviced'));assert(Math.abs(image.displayWidth-image.displayHeight)<2);
 check('One real featured post and full-frame loaded photo',image);
 await page.screenshot({path:out+'/blog-desktop.png',fullPage:true});
 await goto('/blog');
 await page.keyboard.press('Tab');
 const skip=await page.evaluate(()=>({text:document.activeElement.textContent,visible:document.activeElement.matches(':focus-visible'),top:document.activeElement.getBoundingClientRect().top}));
 assert(skip.text.includes('Skip to main'));assert(skip.visible);assert(skip.top>=0);
 await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
 check('Keyboard skip link is visible and moves focus to main',skip);
 // Native keyboard entry to article.
 await page.locator('main a').last().focus();
 assert(await page.locator('main a').last().evaluate(el=>el.matches(':focus-visible')));
 await page.keyboard.press('Enter');
 await page.waitForURL('**'+articlePath);await page.locator('#article-heading').waitFor();
 assert.equal(await page.locator('h1').innerText(),fixture.title);
 assert((await page.locator('main').innerText()).includes('By Brent'));
 assert((await page.locator('main time').innerText()).includes('November 3, 2026'));
 assert.equal(await page.locator('article header p').getAttribute('class'),'text-white');
 assert.equal(await page.locator('main article .prose-wscg ul li').count(),5);
 assert.equal(await page.locator('main article .prose-wscg p').count(),8);
 check('Keyboard article entry; approved headline, byline, current date, eight paragraphs and five list items');
 const metadata=await page.evaluate(()=>({title:document.title,canonical:document.querySelector('link[rel="canonical"]').href,type:document.querySelector('meta[property="og:type"]').content,schema:JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),robots:document.querySelector('meta[name="robots"]').content}));
 assert(metadata.canonical.endsWith(articlePath));assert(metadata.title.includes(fixture.title));assert.equal(metadata.type,'article');assert.equal(metadata.schema[0]['@type'],'BlogPosting');assert.equal(metadata.schema[0].author.name,'Brent');assert(!metadata.robots.includes('noindex'));
 check('Client navigation sets article-specific canonical, metadata and schema',metadata);
 await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0);});await page.waitForTimeout(300);
 await page.screenshot({path:out+'/article-desktop.png',fullPage:true});
 for(const route of ['/blog',articlePath,'/','/large-format-printing']){
  await goto(route);await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const scan=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});return {version:axe.version,violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.length})),passes:r.passes.length};});
  result.scans.push({route,viewport:'1536x900',...scan});
  console.log('AXE',route,'violations',scan.violations.length);
  assert.equal(scan.violations.length,0);
 }
 check('WCAG A/AA axe-core scans pass on Blog, article, Home and Large Format');
 for(const width of [320,375,768,1280,1536]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/blog',articlePath]){
   await goto(route);const layout=await noOverflow();result.reflow.push({route,...layout});assert(layout.passed,JSON.stringify({route,...layout}));
   if(width===375)await page.screenshot({path:out+(route==='/blog'?'/blog-mobile.png':'/article-mobile.png'),fullPage:true});
  }
 }
 check('Blog and article reflow at 320, 375, 768, 1280 and 1536 CSS px');
 await page.setViewportSize({width:375,height:700});await goto('/blog');
 const menu=page.getByRole('button',{name:'Open menu'});await menu.focus();await page.keyboard.press('Space');
 assert.equal(await page.locator('#mobile-navigation').isVisible(),true);
 const mobileLink=page.locator('#mobile-navigation').getByRole('link',{name:'Blog',exact:true});assert(await mobileLink.isVisible());
 await page.keyboard.press('Escape');assert.equal(await page.locator('#mobile-navigation').isVisible(),false);assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'Open menu');
 await menu.focus();await page.keyboard.press('Space');await mobileLink.focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('#mobile-navigation').isVisible(),false);
 check('Mobile menu exposes Blog, responds to keyboard/Escape, restores focus and closes after selection');
 await goto(articlePath);
 await page.addStyleTag({content:'* {letter-spacing:.12em !important;word-spacing:.16em !important;line-height:1.5 !important;} p {margin-bottom:2em !important;}'});
 const spaced=await noOverflow();assert(spaced.passed);check('Article remains readable at enlarged text spacing and mobile width',spaced);
 await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
 const mobileScan=await page.evaluate(async()=>{const r=await axe.run({runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>v.id),passes:r.passes.length};});
 result.scans.push({route:articlePath,viewport:'375x700 enlarged spacing',...mobileScan});assert.equal(mobileScan.violations.length,0);
 if(mode==='local'){
  localList=[];await goto('/blog');assert((await page.locator('main').innerText()).includes('No articles have been published yet'));assert.equal(await page.locator('main article').count(),0);check('Empty Blog data never creates a fake story');
  localList=[{...fixture,featured:0}];await goto('/blog');assert.equal(await page.locator('main article').count(),1);assert(!await page.locator('#featured-article-heading').count());check('Future nonfeatured posts remain discoverable');
 }
 await goto('/blog/not-a-published-article');assert((await page.locator('h1').innerText()).includes('not found'));assert((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));
 check('Missing article shows a useful return path and noindex');
 assert.equal(errors.length,0);check('No JavaScript runtime errors');
 result.passed=true;
} catch(error){result.passed=false;result.error=String(error);await page.screenshot({path:out+'/failure.png',fullPage:true});console.error(error);process.exitCode=1;}
finally{fs.writeFileSync(out+'/audit.json',JSON.stringify(result,null,2)+'\n');await browser.close();}
