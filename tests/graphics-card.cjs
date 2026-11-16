const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXE});try{
 const p=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto((process.env.BASE_URL||'http://127.0.0.1:4182')+'/#item/karta-4-3-1-grafika');
 await p.getByRole('link',{name:'Otwórz kartę pracy →',exact:true}).click();
 await p.locator('#q0').selectOption('foldery');assert.match(await p.locator('#fb0').textContent(),/Spróbuj/);
 for(const [i,v] of ['piksele','szerokość','Zapisz jako','Zapisz'].entries())await p.locator('#q'+i).selectOption(v);
 assert.equal(await p.locator('#progress').getAttribute('value'),'4');
 for(const c of await p.locator('.step').all())await c.check();assert.equal(await p.locator('#progress').getAttribute('value'),'16');
 await p.locator('#stName').fill('Test');await p.locator('#reflection').fill('Pędzel — narysowałem słońce.');
 await p.locator('#pixel-grid button').first().click();await p.keyboard.press('ArrowRight');await p.keyboard.press('Space');
 let download=p.waitForEvent('download');await p.locator('#pixel-download').click();let d=await download,b=fs.readFileSync(await d.path());
 assert.equal(d.suggestedFilename(),'piksel-trening.png');assert.equal(b.readUInt32BE(16),16);assert.equal(b.readUInt32BE(20),16);
 await p.reload();assert.equal(await p.locator('#progress').getAttribute('value'),'16');assert.equal(await p.locator('#reflection').inputValue(),'Pędzel — narysowałem słońce.');
 assert.equal(await p.locator('#pixel-grid button').nth(1).evaluate(b=>b.style.backgroundColor),'rgb(37, 99, 235)');
 for(const width of [390,800,1366]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 const out=path.resolve(__dirname,'../../exam-revision');await p.screenshot({path:out+'/graphics-light.png',fullPage:true});
 await p.locator('#theme').click();await p.screenshot({path:out+'/graphics-dark.png',fullPage:true});
 await p.emulateMedia({media:'print'});assert.equal(await p.locator('.topbar').isVisible(),false);assert.equal(await p.locator('#print-q0').isVisible(),true);
 await p.pdf({path:out+'/graphics-print.pdf',preferCSSPageSize:true,printBackground:true});await p.emulateMedia({media:'screen'});
 p.once('dialog',d=>d.accept());await p.locator('#new-student').click();assert.equal(await p.locator('#progress').getAttribute('value'),'0');assert.equal(await p.locator('#reflection').inputValue(),'');
 assert.equal(await p.locator('#pixel-grid button').first().evaluate(b=>b.style.backgroundColor),'rgb(255, 255, 255)');
 assert.deepEqual(errors,[]);console.log('PASS: quiz, 16-step progress, keyboard pixels, PNG 16x16, reload, reset, responsive, dark mode, print.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
