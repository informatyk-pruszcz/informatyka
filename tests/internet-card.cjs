const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXE});
 try{
  const page=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const base=process.env.BASE_URL||'http://127.0.0.1:4182';
  await page.goto(base+'/#item/karta-4-2-korzystanie-z-internetu');
  await page.getByRole('link',{name:'Otwórz kartę pracy →',exact:true}).click();
  await page.locator('select').first().waitFor();
  assert.equal(await page.locator('select').count(),15);
  await page.locator('select').first().selectOption('A');assert.match(await page.locator('#answer-feedback-0').textContent(),/Spróbuj/);
  await page.getByRole('button',{name:/Sprawdź moje/}).click();assert.match(await page.locator('#feedbackBox').textContent(),/0 \/ 15/);
  const answers=['C','E','A','B','D','Netykieta','krzyk','hasło','dorosłemu','fakt','PRAWDA','PRAWDA','FAŁSZ','PRAWDA','PRAWDA'];
  for(let i=0;i<answers.length;i++)await page.locator('select').nth(i).selectOption(answers[i]);
  assert.match(await page.locator('#feedbackBox').textContent(),/Wszystkie 15/);
  for(const c of await page.locator('.progress-check').all())await c.check();
  assert.equal(await page.locator('[role=progressbar]').getAttribute('aria-valuenow'),'8');
  await page.locator('#stName').fill('Uczeń testowy');await page.reload();
  assert.equal(await page.locator('#stName').inputValue(),'Uczeń testowy');
  assert.equal(await page.locator('select').first().inputValue(),'C');
  assert.equal(await page.locator('.progress-check:checked').count(),8);
  await page.locator('select').first().selectOption('');assert.match(await page.locator('#feedbackBox').textContent(),/14 \/ 15/);
  for(const width of [390,800,1366]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
  await page.screenshot({path:path.resolve(__dirname,'../../exam-revision/internet-card-light.png'),fullPage:true});
  await page.locator('#theme').click();await page.screenshot({path:path.resolve(__dirname,'../../exam-revision/internet-card-dark.png'),fullPage:true});
  await page.emulateMedia({media:'print'});
  assert.equal(await page.locator('.topbar').isVisible(),false);
  assert.equal(await page.locator('.actions-bar').isVisible(),false);
  assert.equal(await page.locator('.print-answer').first().isVisible(),true);
  await page.pdf({path:path.resolve(__dirname,'../../exam-revision/internet-card-print.pdf'),preferCSSPageSize:true,printBackground:true});
  await page.emulateMedia({media:'screen'});
  page.once('dialog',d=>d.accept());await page.locator('#new-student').click();
  assert.equal(await page.locator('#stName').inputValue(),'');assert.equal(await page.locator('.progress-check:checked').count(),0);
  assert.equal(await page.locator('select').first().inputValue(),'');assert.equal(await page.locator('#feedbackBox').isVisible(),false);
  await page.reload();assert.equal(await page.locator('select').first().inputValue(),'');
  assert.deepEqual(errors,[]);console.log('PASS: route, 15 answers, hints, live score, progress, reload, reset, dark mode, print and responsive layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
