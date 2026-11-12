/* Test merytoryczny danych oraz przejścia ucznia w przeglądarce.
 * Uruchom serwer repozytorium i: node tests/contest.cjs
 * BASE_URL domyślnie http://127.0.0.1:4239, BROWSER_EXE opcjonalnie Edge. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'konkursy/kuratoryjny-zadania-2024-2026.js'), 'utf8'), context);
const { tasks, stages } = context.window.KURATORYJNY_2024_2026;
const html = fs.readFileSync(path.join(root, 'konkursy/kuratoryjny-trener.html'), 'utf8');
const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(inline);
vm.runInNewContext(inline.split('// --- STAN APLIKACJI')[0] + ';window.testBank = BANK;', context);
const all = context.window.testBank;
assert.equal(tasks.length, 152);
assert.equal(all.length, 214);
assert.equal(new Set(all.map(q => q.id)).size, all.length, 'Unikalne ID, także wobec starszej bazy');
for (const [stage, source] of Object.entries(stages)) {
  assert.ok(tasks.filter(q => q.stage === stage).length >= 10);
  const pdf = fs.readFileSync(path.join(root, 'konkursy/arkusze', source.file));
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
}
for (const q of tasks) {
  assert.ok(q.hint && q.explain && q.source.page >= 2);
  assert.ok(['bin','algo','excel','hw','app','logic'].includes(q.cat));
  assert.equal(q.source.file, stages[q.stage].file);
  if (q.options) {
    assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length);
    assert.equal(new Set(q.options).size, q.options.length, q.id);
  } else assert.ok(q.accepted.length && q.accepted.every(a => a.length));
}
const answer = id => tasks.find(q => q.id === `ark_${id}`)?.accepted?.[0];
const expected = (id, value) => assert.equal(answer(id), String(value), id);
expected('rejonowy24_8_a', 9*9*8/9);
expected('rejonowy24_8_b', 9*9*(8/9)**2);
expected('rejonowy24_10_a', (255).toString(2));
expected('rejonowy24_10_b', Math.floor(99/10).toString(2));
expected('rejonowy24_10_d', (127%26).toString(2));
expected('rejonowy24_19', 500*8/100);
expected('final24_6_a', 30-10+1-1);
expected('final24_10', Math.ceil(Math.log2(20)));
expected('final24_11', 7%3);
expected('rejonowy24xii_8_a', [...(100).toString(2)].filter(c=>c==='1').length);
expected('rejonowy24xii_8_b', [...Math.floor(987/65).toString(2)].filter(c=>c==='1').length);
expected('rejonowy24xii_12', 24*26**2+6*26+4);
expected('final25_1_a', 15*20);
expected('final25_1_b', 20*15*16/2);
const vig = (text, key, reverse=false) => [...text].map((c,i)=>String.fromCharCode(65+(c.charCodeAt(0)-65+(reverse?-1:1)*(key.charCodeAt(i%key.length)-65)+26)%26)).join('');
expected('rejonowy26_8_a', vig('CMYK','RGB'));
expected('rejonowy26_8_b', vig('CICU','BIT',true));
assert.equal(vig('HERZ', answer('rejonowy26_8_c')), 'JECB');
const distances = [];
for(let sy=0;sy<4;sy++) for(let sx=0;sx<4;sx++) {
  let sum=0;
  for(let y=0;y<4;y++) for(let x=0;x<4;x++) sum+=2*(Math.abs(sx-x)+Math.abs(sy-y));
  distances.push(sum);
}
expected('rejonowy26_10_c', Math.min(...distances));
assert.equal(distances.filter(d=>d===64).length,4);
expected('rejonowy26_14_a', (45).toString(2));
expected('final26_4_a', Math.floor(0xFE/0xD).toString(2));
expected('final26_4_b', (0xCB%0xA).toString(2));
console.log('Dane: 152 nowe zadania, 8 PDF-ów, 214 unikalnych ID; obliczenia poprawne.');

(async () => {
  const base = process.env.BASE_URL || 'http://127.0.0.1:4239';
  const browser = await chromium.launch({headless:true, ...(process.env.BROWSER_EXE ? {executablePath:process.env.BROWSER_EXE} : {})});
  try {
    const page = await browser.newPage({viewport:{width:1366,height:900}});
    const errors = [];
    page.on('pageerror',e=>errors.push(e.message));
    const key = 'inf_pruszcz_konkurs_kuratoryjny_v1';
    // Istniejący postęp i brudnopis muszą przetrwać rozszerzenie bazy.
    await page.addInitScript(({key,oldId})=>{
      if(!localStorage.getItem(key)) localStorage.setItem(key,JSON.stringify({solvedIds:[oldId],points:7,scratchpad:'Mój wcześniejszy brudnopis'}));
    },{key,oldId:all[0].id});
    await page.goto(base+'/konkursy/kuratoryjny-trener.html');
    assert.equal(await page.locator('#bank-list .question-card').count(),214);
    assert.equal(await page.locator('#stat-pts').textContent(),'7');
    assert.equal(await page.locator('#scratchpad-text').inputValue(),'Mój wcześniejszy brudnopis');
    for(const [stage, source] of Object.entries(stages)) {
      await page.locator(`[data-stage="${stage}"]`).click();
      assert.equal(await page.locator('#bank-list .question-card').count(),tasks.filter(q=>q.stage===stage).length);
      // Na hostingu wystarczy sygnatura i rozmiar; unikamy pobierania kilkunastu MB.
      const response=await page.request.get(base+'/konkursy/arkusze/'+source.file,{headers:{Range:'bytes=0-4'}});
      assert.ok([200,206].includes(response.status()));
      assert.equal((await response.body()).subarray(0,5).toString(),'%PDF-');
      if(response.status()===206) assert.equal(Number(response.headers()['content-range'].split('/')[1]),fs.statSync(path.join(root,'konkursy/arkusze',source.file)).size);
    }
    await page.locator('[data-cat="bin"]').click();
    assert.equal(await page.locator('#bank-list .question-card').count(),tasks.filter(q=>q.stage==='final26'&&q.cat==='bin').length);
    await page.locator('[data-cat="all"]').click();
    await page.locator('[data-stage="all"]').click();
    // Dla każdego nowego zadania: błąd daje wskazówkę; odkrycie nie daje punktów;
    // poprawna odpowiedź zalicza raz, także po ponownym kliknięciu.
    const check = await page.evaluate(({tasks,key})=>{
      const before=JSON.parse(localStorage.getItem(key));
      for(const q of tasks) {
        const card=document.querySelector(`[data-qid="${q.id}"]`);
        const fb=card.querySelector('.feedback-box');
        const fail=message=>{throw new Error(q.id+': '+message)};
        const beforePoints=JSON.parse(localStorage.getItem(key)).points;
        if(q.options) card.querySelector(`[data-opt="${(q.correct+1)%q.options.length}"]`).click();
        else {card.querySelector('input').value='błędna odpowiedź';card.querySelector('.btn-check-text').click();}
        if(!fb.innerHTML.includes(q.hint)) fail('brak właściwej wskazówki');
        if(card.classList.contains('solved-ok')) fail('zaliczono błędną odpowiedź');
        card.querySelector('.btn-show-explain').click();
        if(!fb.innerHTML.includes(q.explain)) fail('brak rozwiązania');
        if(JSON.parse(localStorage.getItem(key)).points!==beforePoints) fail('punkty za podgląd');
        for(let n=0;n<2;n++) {
          if(q.options) card.querySelector(`[data-opt="${q.correct}"]`).click();
          else {card.querySelector('input').value=q.accepted[0];card.querySelector('.btn-check-text').click();}
        }
        if(!card.classList.contains('solved-ok')) fail('niezaliczone');
        if(card.querySelectorAll('.solved-label').length!==1) fail('brak/duplikacja odznaki');
        if(JSON.parse(localStorage.getItem(key)).points!==beforePoints+q.pts) fail('duplikacja punktów');
      }
      return {before,after:JSON.parse(localStorage.getItem(key))};
    },{tasks,key});
    assert.equal(check.after.solvedIds.length,153);
    assert.equal(check.after.points,159);
    await page.reload();
    assert.equal(await page.locator('#stat-solved').textContent(),'153');
    assert.equal(await page.locator('.solved-ok').count(),153);
    // Wąski ekran i długi wzór Excela nie mogą poszerzać całej strony.
    await page.locator('[data-stage="final26"]').click();
    await page.setViewportSize({width:390,height:844});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Brak poziomego przewijania');
    await page.locator('[data-mode="generator"]').click();
    assert.equal(await page.locator('[data-gtype]').count(),8);
    await page.locator('#btn-gen-check').isVisible();
    await page.locator('[data-mode="exam"]').click();
    await page.locator('#exam-start-20').click();
    assert.equal(await page.locator('#exam-questions-slot .question-card').count(),10);
    const sampledIds = await page.locator('#exam-questions-slot .question-card').evaluateAll(cards=>cards.map(c=>c.dataset.qid));
    assert.equal(new Set(sampledIds).size,10);
    assert.ok(sampledIds.every(id=>all.some(q=>q.id===id)));
    await page.locator('[data-mode="bank"]').click();
    await page.setViewportSize({width:1366,height:900});
    await page.locator('[data-stage="rejonowy26"]').click();
    await page.screenshot({path:path.join(root,'../contest-sources/trainer-desktop.png')});
    await page.locator('[data-qid="ark_rejonowy26_10_b"]').screenshot({path:path.join(root,'../contest-sources/trainer-question.png')});
    await page.goto(base+'/#contest');
    const portalCard = page.locator('a.material-card[href*="kuratoryjny-trener.html"]');
    await portalCard.waitFor();
    assert.match(await portalCard.textContent(),/214 ćwiczeń/);
    await portalCard.click();
    await page.waitForFunction(()=>document.getElementById('bank-description')?.textContent.includes('214 ćwiczeń'));
    assert.match(await page.locator('#bank-description').textContent(),/214 ćwiczeń/);
    await page.locator('.back-link').click();
    await portalCard.waitFor();
    assert.deepEqual(errors,[]);
    console.log('Przeglądarka: filtry, PDF-y, 152 odpowiedzi i wskazówki, punkty, F5, stary postęp, generator, trening i widok 390 px — OK.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
