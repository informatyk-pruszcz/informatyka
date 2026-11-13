const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const base=(process.env.BASE_URL||'http://127.0.0.1:4182').replace(/\/$/,'');
const settle=page=>page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXE?{executablePath:process.env.BROWSER_EXE}:{})});
 try {
  const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/python-lab/index.html#pierwszy-program');
  await page.locator('.lesson-link').first().waitFor();
  for(const id of ['export-now','import-now']){
   assert.ok(await page.locator('#'+id).isEnabled());
   assert.ok((await page.locator('#'+id).boundingBox()).y<300,'Zapis jest nad zadaniem');
  }
  const solution=await page.evaluate(async()=>(await import('./lessons.js')).lessons[0].solution);
  await page.locator('#code').fill(solution);await page.locator('#check').click();
  assert.equal(await page.locator('#import-now').isEnabled(),false,'Import zablokowany podczas sprawdzania');
  await page.waitForFunction(()=>document.querySelectorAll('.lesson-link.done').length===1,null,{timeout:130000});
  await page.locator('.lesson-link[href="#input"]').click();
  const draft='imie = input("Imię: ")\nprint(imie)';
  await page.locator('#code').fill(draft);await page.locator('#stdin').fill('Ala');
  await page.locator('#menu').click();
  const downloadPromise=page.waitForEvent('download');await page.locator('#export-now').click();
  const download=await downloadPromise,backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));
  assert.equal(backup.activeLesson,'input');assert.equal(backup.inputs.input,'Ala');
  assert.equal(backup.drafts.input,draft);assert.equal(Object.keys(backup.passed).length,1);
  await page.locator('#new-student').click();await page.getByRole('button',{name:'Potwierdź',exact:true}).click();
  assert.equal(await page.locator('#progress').getAttribute('value'),'0');
  const chooserPromise=page.waitForEvent('filechooser');await page.locator('#import-now').click();
  await (await chooserPromise).setFiles({name:'python-postep.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
  await page.getByRole('button',{name:'Potwierdź',exact:true}).click();
  assert.ok(page.url().endsWith('#input'));assert.equal(await page.locator('#code').inputValue(),draft);
  assert.equal(await page.locator('#stdin').inputValue(),'Ala');assert.equal(await page.locator('#progress').getAttribute('value'),'1');
  assert.equal(await page.locator('#sidebar').isVisible(),false);
  await page.reload();await page.waitForFunction(()=>document.querySelector('#code').value.includes('imie ='));
  assert.equal(await page.locator('#stdin').inputValue(),'Ala');
  // Uszkodzony plik nie narusza danych. Starszy format bez activeLesson nadal działa.
  await page.locator('#restore-file').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{')});
  await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('Nie udało się odczytać JSON'));
  assert.equal(await page.locator('#code').inputValue(),draft);
  delete backup.activeLesson;
  await page.locator('#restore-file').setInputFiles({name:'old.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
  await page.getByRole('button',{name:'Potwierdź',exact:true}).click();
  assert.equal(await page.locator('#progress').getAttribute('value'),'1');
  await page.screenshot({path:path.join(__dirname,'../../python-progress.png'),fullPage:false});
  console.log('OK: Python JSON contains drafts, inputs and completions; restores last lesson; survives F5; supports older files.');

  await page.goto(base+'/html-lab/index.html#pierwszy-naglowek');
  await page.locator('.lesson-link').first().waitFor();
  assert.equal(await page.locator('#toggle-menu').getAttribute('aria-expanded'),'true');
  const html=await page.evaluate(()=>LESSONS[0].solution);
  await page.locator('#code').fill(html);await page.locator('#check').click();
  await page.waitForFunction(()=>document.querySelector('#progress').value===1);
  const mainOpen=await page.locator('#workspace').boundingBox(),codeOpen=await page.locator('#code').boundingBox();
  await page.screenshot({path:path.join(__dirname,'../../html-menu-open.png'),fullPage:false});
  await page.locator('#toggle-menu').click();
  assert.equal(await page.locator('#sidebar').isVisible(),false);
  assert.ok((await page.locator('#workspace').boundingBox()).width-mainOpen.width>240);
  assert.ok((await page.locator('#code').boundingBox()).width-codeOpen.width>100);
  assert.equal(await page.locator('#code').inputValue(),html);
  assert.equal(await page.locator('#progress').getAttribute('value'),'1');
  const heading=await page.frameLocator('#preview').locator('h1').textContent();assert.ok(heading.length>0);
  await page.screenshot({path:path.join(__dirname,'../../html-menu-closed.png'),fullPage:false});
  await page.reload();await page.waitForFunction(()=>document.querySelector('#lesson-title').textContent.length>0);
  assert.equal(await page.locator('#sidebar').isVisible(),false);assert.equal(await page.locator('#code').inputValue(),html);
  assert.equal(await page.frameLocator('#preview').locator('h1').textContent(),heading);
  // Eksport i import pozostają dostępne przy zamkniętym menu.
  const htmlDownloadPromise=page.waitForEvent('download');await page.locator('#export-now').click();
  const htmlFile=await htmlDownloadPromise,htmlBackup=fs.readFileSync(await htmlFile.path());
  await page.locator('#code').fill('<h1>Niedokończone');
  const htmlChooserPromise=page.waitForEvent('filechooser');await page.locator('#import-now').click();
  await (await htmlChooserPromise).setFiles({name:'html.json',mimeType:'application/json',buffer:htmlBackup});
  await page.locator('#import-confirm').click();
  assert.equal(await page.locator('#code').inputValue(),html);assert.equal(await page.locator('#progress').getAttribute('value'),'1');
  await page.locator('#next').click();assert.equal(await page.locator('#sidebar').isVisible(),false);
  await page.locator('#toggle-menu').focus();await page.keyboard.press('Enter');
  assert.equal(await page.locator('#sidebar').isVisible(),true);
  await page.locator('.lesson-link[href="#pierwszy-naglowek"]').click();
  assert.equal(await page.locator('#sidebar').isVisible(),true,'Nawigacja nie zwija menu na komputerze');
  for(const width of [390,800,1024,1366,1920]){
   await page.setViewportSize({width,height:768});await settle(page);
   for(let i=0;i<2;i++){
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'HTML overflow: '+width);
    assert.equal(await page.locator('#toggle-menu').getAttribute('aria-expanded'),String(await page.locator('#sidebar').isVisible()));
    await page.locator('#toggle-menu').click();
   }
  }
  await page.setViewportSize({width:390,height:844});await settle(page);
  await page.locator('#toggle-menu').click();await page.locator('.lesson-link[href="#akapity"]').click();
  assert.equal(await page.locator('#sidebar').isVisible(),false);
  await page.locator('#toggle-menu').click();await page.keyboard.press('Escape');assert.equal(await page.locator('#sidebar').isVisible(),false);
  await page.screenshot({path:path.join(__dirname,'../../html-menu-mobile.png'),fullPage:false});
  await page.setViewportSize({width:1366,height:768});await settle(page);await page.locator('#theme').click();
  await page.screenshot({path:path.join(__dirname,'../../html-menu-dark.png'),fullPage:false});
  assert.deepEqual(errors,[]);
  console.log('OK: HTML collapsible menu reclaims width; code + preview + completions preserved; desktop/mobile/keyboard/dark tested.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
