// Uruchom lokalny serwer repozytorium na porcie 4240 i: node tests/word-review.cjs.
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = (process.env.BASE_URL || 'http://127.0.0.1:4240').replace(/\/$/,'');
const key = 'informatyka-review-5-word-v1';
const material = 'powtorzenie-5-1-edytor-tekstu';
const url = base+'/klasa5/powtorzenie-edytor-tekstu.html?v=wordreview1';
(async()=>{
  const browser = await chromium.launch({headless:true,...(process.env.BROWSER_EXE?{executablePath:process.env.BROWSER_EXE}:{})});
  try {
    const context = await browser.newContext({viewport:{width:1366,height:900},permissions:['clipboard-read','clipboard-write']});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/#class/5/reviews');
    const card = page.locator(`a.material-card[href="#item/${material}"]`);
    await card.waitFor();
    assert.equal(await page.locator('[data-type="review"]').getAttribute('aria-pressed'),'true');
    await page.locator('[data-type="task"]').click();
    assert.equal(await card.count(),0,'Powtórzenie nie trafia do zadań praktycznych');
    await page.locator('[data-type="review"]').click();
    await card.click();
    await page.getByRole('link',{name:'Rozpocznij powtórzenie w Wordzie →'}).click();
    await page.waitForFunction(()=>document.getElementById('ip-save-status')?.textContent.length>0);
    assert.match(await page.title(),/Mistrz edytora tekstu/);
    assert.equal(await page.locator('input[type=checkbox]').count(),21);
    assert.equal(await page.locator('article[id^=mission-]').count(),4);
    assert.match(await page.locator('#ip-progress-label').textContent(),/0 \/ 19/);
    for(const id of ['ip-text-zad1','ip-text-zad2']) {
      await page.locator(`[data-copy="${id}"]`).click();
      await page.waitForFunction(()=>document.getElementById('ip-save-status').textContent.startsWith('Tekst skopiowany'));
      const expected=await page.locator('#'+id).textContent();
      assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),expected.trim().replace(/\r\n/g,'\n'));
    }
    await page.locator('#ip-step-1-1').check();
    await page.locator('#ip-toggle-spe').click();
    await page.locator('#theme').click();
    await page.evaluate(()=>localStorage.setItem('other-lesson-test','zachowaj'));
    await page.reload();
    assert.equal(await page.locator('#ip-step-1-1').isChecked(),true);
    assert.equal(await page.locator('#ip-toggle-spe').getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('dark')),true);
    assert.match(await page.locator('#ip-progress-label').textContent(),/1 \/ 19/);
    await page.evaluate(()=>document.querySelectorAll('input[type=checkbox]:not([data-bonus])').forEach(el=>{el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}));
    assert.equal(await page.locator('[role=progressbar]').getAttribute('aria-valuenow'),'100');
    assert.match(await page.locator('#bonus-progress').textContent(),/0 \/ 2/);
    assert.match(await page.locator('#ip-completion').textContent(),/ukończona/);
    await page.locator('#ip-step-5-1').check();
    assert.equal(await page.locator('[role=progressbar]').getAttribute('aria-valuenow'),'100');
    assert.match(await page.locator('#bonus-progress').textContent(),/1 \/ 2/);
    page.once('dialog',dialog=>dialog.dismiss());
    await page.locator('#ip-reset').click();
    assert.equal(await page.locator('input:checked').count(),20);
    page.once('dialog',dialog=>dialog.accept());
    await page.locator('#ip-reset').click();
    assert.equal(await page.locator('input:checked').count(),0);
    assert.equal(await page.evaluate(()=>localStorage.getItem('other-lesson-test')),'zachowaj');
    await page.reload();
    assert.equal(await page.locator('input:checked').count(),0);
    await page.locator('#theme').click();
    await page.evaluate(()=>scrollTo(0,0));
    await page.waitForTimeout(200); // Koniec krótkiego przejścia kolorów.
    const out=path.resolve(__dirname,'../../word-review-check'); fs.mkdirSync(out,{recursive:true});
    await page.screenshot({path:path.join(out,'desktop.png')});
    await page.locator('#theme').click();
    await page.setViewportSize({width:390,height:844});
    await page.locator('#ip-toggle-spe').click();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Brak poziomego przewijania z dużym tekstem');
    await page.locator('#mission-3').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(out,'mobile-dark.png')});
    await page.locator('.ip-portal-nav a').click();
    await card.waitFor();
    assert.equal(await page.locator('[data-type="review"]').getAttribute('aria-pressed'),'true');
    // Poprzednie materiały klasy V nadal mają sprawne odsyłacze.
    await page.goto(base+'/#item/karta-5-atlas-odkrywcy');
    await page.getByRole('link',{name:'Otwórz projekt — Karta Atlasu Odkrywcy →'}).waitFor();
    // Schowek zablokowany: żadnego fałszywego komunikatu o skopiowaniu.
    const blocked = await browser.newContext();
    const other = await blocked.newPage();
    await other.addInitScript(()=>{
      Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw new Error('blocked')}}});
      document.execCommand=()=>false;
    });
    await other.goto(url);
    await other.locator('[data-copy="ip-text-zad2"]').click();
    await other.waitForFunction(()=>document.getElementById('ip-save-status').textContent.includes('Schowek jest zablokowany'));
    assert.equal(await other.locator('.ip-copied').count(),0);
    assert.ok((await other.evaluate(()=>getSelection().toString())).includes('Zasady pracy'));
    await other.evaluate(key=>localStorage.setItem(key,'{broken'),key);
    await other.reload();
    assert.equal(await other.locator('input:checked').count(),0);
    await other.locator('#ip-step-s1').check();
    assert.equal(await other.evaluate(key=>JSON.parse(localStorage.getItem(key)).version,key),1);
    assert.deepEqual(errors,[]);
    console.log('OK: zakładka Powtórzenie, 4 zadania + bonus, kopiowanie, zapis/F5/reset, stary materiał, tryb ciemny, powiększenie i 390 px.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
