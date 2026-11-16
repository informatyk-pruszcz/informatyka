const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXE});try{
const p=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto((process.env.BASE_URL||'http://127.0.0.1:4182')+'/#item/karta-4-3-3-warstwy');await p.getByRole('link',{name:'Otwórz kartę pracy →',exact:true}).click();
await p.locator('#q0').selectOption('A');assert.match(await p.locator('#fb0').textContent(),/Spróbuj/);
for(const q of await p.locator('select[data-answer]').all())await q.selectOption(await q.getAttribute('data-answer'));
for(const c of await p.locator('.step').all())await c.check();assert.equal(await p.locator('#progress').getAttribute('value'),'32');
await p.locator('#prompt').fill('Zielony robot na białym tle.');
await p.getByRole('button',{name:'Widoczność: Obiekt',exact:true}).click();assert.equal(await p.locator('[data-layer=object]').getAttribute('display'),'none');
await p.getByRole('button',{name:'Widoczność: Obiekt',exact:true}).click();await p.getByRole('button',{name:'Tło w górę',exact:true}).click();await p.getByRole('button',{name:'Tło w górę',exact:true}).click();assert.equal(await p.locator('#scene g').last().getAttribute('data-layer'),'bg');
await p.locator('#erase').click();assert.equal(await p.locator('[data-layer=object] path').count(),2);await p.reload();assert.equal(await p.locator('[data-layer=object] path').count(),2);assert.equal(await p.locator('#scene g').last().getAttribute('data-layer'),'bg');assert.equal(await p.locator('#progress').getAttribute('value'),'32');assert.equal(await p.locator('#prompt').inputValue(),'Zielony robot na białym tle.');
await p.locator('#undo').click();assert.equal(await p.locator('[data-layer=object] path').count(),3);await p.locator('#demo-reset').click();assert.equal(await p.locator('#scene g').first().getAttribute('data-layer'),'bg');
for(const width of [390,800,1366]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width);}
const out=path.resolve(__dirname,'../../exam-revision');await p.locator('#scene').scrollIntoViewIfNeeded();await p.screenshot({path:out+'/layers-light.png'});await p.locator('#theme').click();await p.locator('#scene').scrollIntoViewIfNeeded();await p.screenshot({path:out+'/layers-dark.png'});
await p.emulateMedia({media:'print'});assert.equal(await p.locator('.topbar').isVisible(),false);assert.equal(await p.locator('#print-q0').isVisible(),true);await p.pdf({path:out+'/layers-print.pdf',preferCSSPageSize:true,printBackground:true});await p.emulateMedia({media:'screen'});
p.once('dialog',d=>d.accept());await p.locator('#new-student').click();assert.equal(await p.locator('#progress').getAttribute('value'),'0');assert.equal(await p.locator('#prompt').inputValue(),'');assert.deepEqual(errors,[]);console.log('PASS: navigation, 12 questions, 32 progress items, layer visibility/order/eraser/undo, reload, reset, responsive, themes, print.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
