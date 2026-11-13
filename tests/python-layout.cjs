const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const base=(process.env.BASE_URL||'http://127.0.0.1:4182').replace(/\/$/,'');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXE?{executablePath:process.env.BROWSER_EXE}:{})});
 try {
  const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/python-lab/index.html#pierwszy-program');
  await page.locator('.lesson-link').first().waitFor();
  assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'true');
  assert.ok(await page.locator('#sidebar').isVisible());
  const openMain=await page.locator('#main').boundingBox(),openCode=await page.locator('#code').boundingBox();
  const output=await page.locator('.output-card').boundingBox();
  assert.ok(output.x>openCode.x,'Wynik obok kodu na szkolnym monitorze');
  assert.ok((await page.locator('#run').boundingBox()).y<400,'Uruchamianie jest widoczne bez przewijania');
  await page.screenshot({path:path.join(__dirname,'../../python-layout-open.png'),fullPage:true});
  await page.locator('#code').fill('print("Zachowaj moją pracę")');
  await page.locator('#menu').click();
  assert.equal(await page.locator('#sidebar').isVisible(),false);
  assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'false');
  assert.ok((await page.locator('#main').boundingBox()).width-openMain.width>225,'Odzyskana cała szerokość menu');
  assert.ok((await page.locator('#code').boundingBox()).width-openCode.width>90,'Edytor korzysta z odzyskanej szerokości');
  assert.equal(await page.locator('#code').inputValue(),'print("Zachowaj moją pracę")');
  for(const id of ['backup','restore','download','upload'])assert.ok(await page.locator('#'+id).isVisible(),'Dostęp do '+id+' przy zamkniętym menu');
  await page.screenshot({path:path.join(__dirname,'../../python-layout-closed.png'),fullPage:true});
  await page.reload();await page.waitForFunction(()=>document.querySelector('#lesson-title').textContent==='Pierwsza wiadomość');
  assert.equal(await page.locator('#sidebar').isVisible(),false);
  assert.equal(await page.locator('#code').inputValue(),'print("Zachowaj moją pracę")');
  await page.locator('#next').click();assert.equal(await page.locator('#sidebar').isVisible(),false);
  await page.locator('#menu').click();assert.equal(await page.locator('#sidebar').isVisible(),true);
  await page.locator('#focus').click();assert.equal(await page.locator('#sidebar').isVisible(),false);
  await page.locator('#menu').click();assert.equal(await page.locator('#sidebar').isVisible(),true);
  await page.locator('#focus').click();assert.equal(await page.locator('#sidebar').isVisible(),true);
  // Sterowanie klawiaturą: przycisk poza panelem pozostaje dostępny.
  await page.locator('#menu').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#sidebar').isVisible(),false);
  await page.keyboard.press('Enter');assert.equal(await page.locator('#sidebar').isVisible(),true);
  for(const width of [390,800,1024,1366,1920]){
    await page.setViewportSize({width,height:768});
    // CSS i zdarzenie matchMedia muszą zakończyć ten sam cykl zmiany rozmiaru.
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    for(let i=0;i<2;i++){
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Bez poziomego przewijania: '+width);
      const visible=await page.locator('#sidebar').isVisible();assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),String(visible));
      await page.locator('#menu').click();
    }
  }
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.locator('#menu').click();assert.ok(await page.locator('#sidebar').isVisible());
  await page.locator('.lesson-link[href="#input"]').click();
  assert.equal(await page.locator('#sidebar').isVisible(),false);assert.equal(await page.locator('#input-box').getAttribute('open'),'');
  await page.locator('#menu').click();await page.keyboard.press('Escape');assert.equal(await page.locator('#sidebar').isVisible(),false);
  await page.screenshot({path:path.join(__dirname,'../../python-layout-mobile.png'),fullPage:true});
  await page.setViewportSize({width:1366,height:768});await page.locator('#theme').click();
  await page.screenshot({path:path.join(__dirname,'../../python-layout-dark.png'),fullPage:true});
  assert.deepEqual(errors,[]);console.log('OK: reclaimed width, draft + F5, navigation, files, focus, keyboard, mobile and dark layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
