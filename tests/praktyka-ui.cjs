const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const {chromium} = require('playwright');
const XLSX = require('../praktyka/vendor/xlsx-0.20.3.min.js');
const base = (process.env.BASE_URL || 'http://127.0.0.1:4218/').replace(/\/?$/, '/');
(async () => {
  const browser = await chromium.launch(process.env.BROWSER_EXE ? {executablePath:process.env.BROWSER_EXE} : {});
  try {
    const page = await browser.newPage({viewport:{width:1280,height:800}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route(/^https?:\/\//, route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const visit = async id => {
      await page.goto(base + '#' + id);
      await page.waitForFunction(() => document.querySelector('#main h1'));
    };
    async function scan(selectors) {
      await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
      const violations = await page.evaluate(async include => {
        const r = await axe.run({include},{runOnly:{type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
        return r.violations.map(v => [v.id, v.nodes.map(n=>n.target)]);
      },selectors);
      assert.deepEqual(violations,[]);
    }
    for (const grade of [4,5,6,7,8]) {
      await visit('class/' + grade);
      await page.locator('.skill-choices').waitFor();
      assert.equal(await page.locator('.skill-choices a').count(),3);
    }
    await page.selectOption('#filter-tag',{label:'Excel'});
    await page.locator('#results a[href="#item/praktyka-vat"]').waitFor();
    assert.equal(await page.locator('#filter-tag option').filter({hasText:/^EXCEL$/}).count(),0);
    await scan(['.skill-choices']);
    await visit('class/6');
    await page.locator('.skill-choices a[href="#item/praktyka-budzet"]').click();
    await page.getByRole('button',{name:'Jeden krok na ekranie'}).press('Enter');
    assert.equal(await page.locator('article > ol > li:visible').count(),1);
    await page.getByRole('button',{name:'Dalej',exact:true}).press('Enter');
    assert.match(await page.locator('[data-count]').innerText(),/2 z 4/);
    const [download] = await Promise.all([page.waitForEvent('download'),page.locator('a[download]').click()]);
    const bytes = fs.readFileSync(await download.path());
    const file = page.locator('#budget-file');
    const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    async function choose(buffer, message) {
      await file.setInputFiles({name:'moj-budzet.xlsx',mimeType:type,buffer});
      await page.locator('[data-result]').filter({hasText:message}).waitFor();
    }
    await choose(bytes,'W B11 brakuje formuły');
    const book = XLSX.read(bytes,{type:'buffer'}), sheet = book.Sheets[book.SheetNames[0]];
    sheet.B11.f = 'SUM(B7:B10)'; sheet.B7.v = 30; sheet.B8.v = 8;
    await choose(Buffer.from(XLSX.write(book,{bookType:'xlsx',type:'array'})),'12 zł');
    await choose(Buffer.from([255,0,9]),/budżetu|kopię/);
    await scan(['.practice-steps','#practice-activity']);
    await page.setViewportSize({width:390,height:844});
    await page.locator('#theme').click();
    await scan(['.practice-steps','#practice-activity']);
    await visit('class/4');
    await page.locator('.skill-choices a[href="#item/praktyka-petla-4"]').press('Enter');
    const run = page.locator('[data-run]');
    await run.press('Enter');
    assert(!/Kwadrat gotowy/.test(await page.locator('[data-status]').innerText()));
    await page.selectOption('#repeat-count','4'); await page.selectOption('[data-at="0"]','3');
    await run.press('Enter'); await page.getByText(/Kwadrat gotowy/).waitFor();
    await scan(['.practice-steps','#practice-activity']);
    await page.locator('[data-block-mode]').click();
    await page.getByText('Bloczki gotowe.',{exact:true}).waitFor();
    const blockState = await page.evaluate(() => {
      const root = Blockly.getMainWorkspace().getTopBlocks(false).find(b=>b.type==='trasa_petla');
      const count = root.getFieldValue('COUNT'); root.setFieldValue('2','COUNT'); return count;
    });
    assert.equal(blockState,'4');
    await page.locator('[data-list-mode]').click();
    assert.equal(await page.locator('#repeat-count').inputValue(),'2');
    await page.selectOption('#loop-goal','rectangle'); await page.selectOption('[data-at="0"]','5');
    await page.locator('[data-add="move"]').press('Enter'); await page.selectOption('[data-at="2"]','3');
    await page.locator('[data-add="turn"]').press('Enter'); await run.press('Enter');
    await page.getByText(/Prostokąt gotowy/).waitFor();
    await page.reload(); await run.press('Enter'); await page.getByText(/Prostokąt gotowy/).waitFor();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth + 1));
    await page.locator('[data-reset]').press('Enter');
    assert.equal(await page.locator('#loop-goal').inputValue(),'square');
    assert.equal(await page.locator('#repeat-count').inputValue(),'2');
    assert.deepEqual(errors,[]);
    console.log('OK: klasy IV–VIII, nawigacja, dwa XLSX, klawiatura, Blockly, dwa motywy, axe, F5 i nowa próba.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
