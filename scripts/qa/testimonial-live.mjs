import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1536,height:900}});
const result={createdAt:new Date().toISOString(),controls:[]};
try {
 await page.goto('https://web-production-d7aa.up.railway.app/',{waitUntil:'networkidle'});
 const buttons=page.locator('button[aria-controls^="testimonial-quote-"]');assert.equal(await buttons.count(),3);
 for(let i=0;i<await buttons.count();i++){
  const button=buttons.nth(i);const id=await button.getAttribute('aria-controls');
  const text=()=>page.locator('#'+id).evaluate(el=>{const clone=el.cloneNode(true);clone.querySelectorAll('[aria-hidden="true"]').forEach(e=>e.remove());return clone.textContent.trim();});
  const collapsed=await text();assert(!/^["“”]|["“”]$/.test(collapsed));assert.equal(await button.getAttribute('aria-label'),null);assert((await button.textContent()).startsWith('Read full perspective'));
  await button.focus();assert(await button.evaluate(e=>e.matches(':focus-visible')));await page.keyboard.press('Space');assert.equal(await button.getAttribute('aria-expanded'),'true');assert((await button.textContent()).startsWith('Show less'));const expanded=await text();assert(expanded.length>collapsed.length);assert(!/^["“”]|["“”]$/.test(expanded));assert.equal(await page.locator('#'+id+' [aria-hidden="true"]').count(),2);
  await page.keyboard.press('Space');assert.equal(await button.getAttribute('aria-expanded'),'false');result.controls.push({id,collapsedLength:collapsed.length,expandedLength:expanded.length,visibleLabelNameParity:true,keyboard:true,normalizedQuotes:true,decorativeQuoteSpans:2});
 }
 result.passed=true;console.log('PASS: All three live testimonial controls retain visible native names, keyboard expansion, normalized text and decorative blue quotes.');
}catch(e){result.passed=false;result.error=String(e);process.exitCode=1;console.error(e);}
finally{fs.writeFileSync(process.argv[2]||'testimonial-live.json',JSON.stringify(result,null,2)+'\n');await browser.close();}
