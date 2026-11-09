// BASE_URL wskazuje działającą statyczną kopię serwisu. Testy używają własnego profilu przeglądarki.
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const base = (process.env.BASE_URL || 'http://127.0.0.1:4218/').replace(/\/?$/,'/');
(async () => {
 const browser = await chromium.launch(process.env.BROWSER_EXE ? {executablePath:process.env.BROWSER_EXE} : {});
 try {
  const ctx = await browser.newContext({ignoreHTTPSErrors:true});
  const p = await ctx.newPage();
  await p.goto(base);
  await p.waitForSelector('.grade-grid');
  assert(!await p.evaluate(()=>performance.getEntriesByType('resource').some(r=>r.name.includes('worksheets-478.js'))));
  const topics = await p.evaluate(async () => (await import('./curriculum.js')).curriculum);
  for(const t of topics) {
   const id='topic-'+t.grade+'-'+t.number.replace('.','-');
   await p.evaluate(id=>location.hash='item/'+id,id);
   await p.waitForFunction(title=>document.querySelector('.detail-head h1')?.textContent===title,t.title);
   assert(!((await p.locator('.article').innerText()).includes('Notatka z lekcji jest w przygotowaniu')),id);
  }
  assert.equal(topics.length,82);
  await p.goto(base+'#item/karta-8-1-tabele-przestawne');
  const downloading=p.waitForEvent('download');
  await p.click('#piv-download-xlsx');
  const attachment=await downloading;
  assert.equal(attachment.suggestedFilename(),'prawo-jazdy.xlsx');
  assert.equal(require('fs').readFileSync(await attachment.path()).subarray(0,2).toString(),'PK');
  await p.goto(base+'#item/karta-8-1-misja-vat');
  for(const [value,ok] of [['tak',true],['nie',false],['nie wystarczy',false],['',false],['xyz',false]]){
   await p.fill('#vat-m5-enough',value);
   await p.click('#vat-check-answers');
   assert.equal(await p.locator('#vat-m5-enough').evaluate(e=>e.classList.contains('ws-good-cell')),ok);
  }
  await p.click('#vat-toggle-raw');
  const dataRows=p.locator('#vat-raw-table-wrap tbody tr');
  assert.equal(await dataRows.count(),25);
  await p.getByRole('button',{name:'Następne rekordy'}).click();
  assert.equal(await dataRows.first().locator('td').first().textContent(),'27');
  await p.goto(base+'html-lab/');
  await p.clock.install();
  await p.fill('#code','<h1>Test</h1>');
  await p.keyboard.press('Tab');
  assert(await p.locator('#reset').evaluate(e=>e===document.activeElement));
  await p.keyboard.press('Shift+Tab');
  assert.equal(await p.inputValue('#code'),'<h1>Test</h1>');
  assert(await p.locator('#code').evaluate(e=>e===document.activeElement));
  await p.keyboard.press('Control+Enter');
  assert.equal(await p.locator('#progress').getAttribute('value'),'1');
  const second=await ctx.newPage(); await second.goto(base+'html-lab/');
  await p.clock.fastForward(41*60000);
  await p.waitForFunction(()=>document.querySelector('#expiry-notice').textContent.length>0);
  await p.click('#extend-session'); await p.clock.fastForward(5*60000);
  assert.equal(await p.inputValue('#code'),'<h1>Test</h1>');
  assert.equal(await second.inputValue('#code'),'<h1>Test</h1>');
  await p.click('#new-student'); await p.click('#confirm-session');
  await second.waitForFunction(()=>document.querySelector('#code').value!=='<h1>Test</h1>');
  await p.goto(base+'klawiatura.html');
  await p.click('#start');await p.keyboard.insertText('ą');
  await p.reload();
  assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('pracownia-klawiatury-lekcja-v2')).index),1);
  await p.clock.fastForward(41*60000);
  await p.locator('#typing-warning:not([hidden])').waitFor();
  await p.click('#typing-extend');await p.clock.fastForward(5*60000);
  assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('pracownia-klawiatury-lekcja-v2')).index),1);
  await p.clock.fastForward(41*60000);
  assert.equal(await p.evaluate(()=>localStorage.getItem('pracownia-klawiatury-lekcja-v2')),null);
  console.log('OK: 82 tematy, XLSX, VAT, strony danych, Tab, kopie i czas sesji.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
