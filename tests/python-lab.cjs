// BASE_URL wskazuje serwer repozytorium. PYODIDE_CACHE jest opcjonalnym cache testowym.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const base=(process.env.BASE_URL||'http://127.0.0.1:4182').replace(/\/$/,'');
const key='python-pracownia-session-v1';
const normalize=s=>s.replace(/\r/g,'').split('\n').map(l=>l.trimEnd()).join('\n').trim();
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXE?{executablePath:process.env.BROWSER_EXE}:{})});
 try {
  const context=await browser.newContext({viewport:{width:1366,height:900}});
  if(process.env.PYODIDE_CACHE)await context.route('https://unpkg.com/pyodide@314.0.7/**',async route=>{
    const name=new URL(route.request().url()).pathname.split('/').at(-1);
    const file=path.join(process.env.PYODIDE_CACHE,name);
    if(!fs.existsSync(file))throw new Error('Missing runtime fixture: '+name);
    await route.fulfill({body:fs.readFileSync(file),headers:{'access-control-allow-origin':'*','content-type':name.endsWith('.mjs')?'text/javascript':name.endsWith('.wasm')?'application/wasm':'application/octet-stream'}});
  });
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const hash of ['code','class/7','class/8']){
    await page.goto(base+'/#'+hash);await page.locator('a.material-card[href="./python-lab/index.html"]').waitFor();
    if(hash!=='code'){await page.locator('[data-type="task"]').click();assert.equal(await page.locator('a.material-card[href="./python-lab/index.html"]').count(),1);}
  }
  await page.goto(base+'/python-lab/index.html#pierwszy-program');
  await page.locator('.lesson-link').first().waitFor();assert.equal(await page.locator('.lesson-link').count(),24);
  console.log('Catalog + 24 lesson links OK');
  // Pełny silnik Python, wszystkie rozwiązania wzorcowe i ich dane testowe.
  const modelResults=await page.evaluate(async()=>{
    const {PythonRuntime}=await import('./runtime.js');const {lessons}=await import('./lessons.js');window.testRuntime=new PythonRuntime(()=>{});
    const out=[];for(const lesson of lessons){const results=await testRuntime.run({code:lesson.solution,cases:lesson.tests});out.push({id:lesson.id,tests:lesson.tests,requirements:lesson.requirements,results});}return out;
  });
  let cases=0;for(const l of modelResults){for(let i=0;i<l.results.length;i++){const r=l.results[i];assert.equal(r.error,null,l.id+': '+JSON.stringify(r.error));assert.equal(normalize(r.output),normalize(l.tests[i].output),l.id);cases++;}for(const r of l.requirements)assert.ok(l.results[0].features.includes(r.feature),l.id+': '+r.feature);}
  console.log('Python model solutions: '+modelResults.length+' lessons / '+cases+' cases OK');
  const run=payload=>page.evaluate(p=>window.testRuntime.run(p),payload);
  let result=(await run({code:'print(nie_ma)',cases:[{input:[]}]}))[0];assert.equal(result.error.type,'NameError');assert.equal(result.error.line,1);
  result=(await run({code:'if True\n    print("x")',cases:[{input:[]}]}))[0];assert.equal(result.error.type,'SyntaxError');assert.equal(result.error.line,1);
  result=(await run({code:'print(input())',cases:[{input:[]}]}))[0];assert.equal(result.error.type,'EOFError');
  await run({code:'sekret = 123',cases:[{input:[]}]});result=(await run({code:'print(sekret)',cases:[{input:[]}]}))[0];assert.equal(result.error.type,'NameError');
  result=(await run({code:'print("x" * 30000)',cases:[{input:[]}]}))[0];assert.equal(result.error.message,'LIMIT_OUTPUT');
  result=(await run({code:'import js\nprint(hasattr(js, "document"))\nprint(hasattr(js, "localStorage"))',cases:[{input:[]}]}))[0];assert.equal(normalize(result.output),'False\nFalse');
  const timed=await page.evaluate(async()=>{try{await testRuntime.run({code:'while True:\n    pass',cases:[{input:[]}]});return 'bad'}catch(e){return e.message}});assert.equal(timed,'TIMEOUT');
  console.log('Errors, fresh namespace, output cap, isolation, infinite loop timeout OK');
  // Spóźnione pobranie workera po Stop nie może zastąpić nowego uruchomienia.
  let workerRequests=0;
  await page.route('**/python-lab/worker.js',async route=>{if(++workerRequests===1)await new Promise(r=>setTimeout(r,900));await route.continue();});
  const restarted=await page.evaluate(async()=>{
    const first=testRuntime.run({code:'print("stary")',cases:[{input:[]}]}).catch(e=>e.message);
    await new Promise(r=>setTimeout(r,50));testRuntime.stop();
    const second=await testRuntime.run({code:'print("nowy")',cases:[{input:[]}]});
    return {first:await first,second};
  });
  assert.equal(restarted.first,'STOP');assert.equal(normalize(restarted.second[0].output),'nowy');await page.unroute('**/python-lab/worker.js');
  // Ukończenie następuje po sprawdzeniu. Edycja usuwa zaliczenie starego kodu.
  await page.locator('#code').fill('print("Cześć, Python!")');await page.locator('#check').click();
  await page.waitForFunction(()=>document.querySelector('#feedback').textContent.includes('Ukończone!'),{},{timeout:130000});
  assert.match(await page.locator('#progress-text').textContent(),/^1 \/ 24/);assert.equal(await page.locator('.lesson-link.done').count(),1);
  await page.reload();await page.locator('.lesson-link.done').waitFor();assert.equal(await page.locator('#code').inputValue(),'print("Cześć, Python!")');
  const exported=page.waitForEvent('download');await page.locator('#backup').click();const file=await exported;const exportedPath=await file.path();const backup=JSON.parse(fs.readFileSync(exportedPath,'utf8'));assert.equal(backup.app,'informatyka-python-lab');
  await page.locator('#code').fill('print("zmieniono")');assert.equal(await page.locator('.lesson-link.done').count(),0);
  await page.locator('#restore-file').setInputFiles({name:'postep.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.getByRole('button',{name:'Potwierdź',exact:true}).click();assert.equal(await page.locator('.lesson-link.done').count(),1);
  await page.locator('#restore-file').setInputFiles({name:'bledny.json',mimeType:'application/json',buffer:Buffer.from('{"app":"html"}')});assert.equal(await page.locator('.lesson-link.done').count(),1);
  await page.locator('#upload-file').setInputFiles({name:'moj.py',mimeType:'text/x-python',buffer:Buffer.from('print("Import działa")')});await page.getByRole('button',{name:'Potwierdź',exact:true}).click();assert.equal(await page.locator('#code').inputValue(),'print("Import działa")');
  await page.locator('#run').click();await page.waitForFunction(()=>!document.querySelector('#run').disabled,{},{timeout:130000});assert.equal(normalize(await page.locator('#output').textContent()),'Import działa');
  assert.equal(await page.locator('.lesson-link.done').count(),0);
  const pyDownloaded=page.waitForEvent('download');await page.locator('#download').click();assert.match((await pyDownloaded).suggestedFilename(),/\.py$/);
  await page.locator('#code').fill('print("Błąd")\nprint(brak)');await page.locator('#run').click();await page.locator('#jump-error').waitFor();assert.match(await page.locator('#jump-error').textContent(),/wiersza 2/);await page.locator('#jump-error').click();assert.equal(await page.evaluate(()=>document.querySelector('#code').value.slice(document.querySelector('#code').selectionStart,document.querySelector('#code').selectionEnd)),'print(brak)');
  console.log('UI completion, F5, JSON and PY roundtrip, error line OK');
  // Wiele zestawów danych uniemożliwia zaliczenie samego wpisanego wyniku.
  await page.goto(base+'/python-lab/index.html#liczba-z-input');await page.locator('#code').fill('zeszyty = int(input())\nprint(12)');await page.locator('#check').click();await page.waitForFunction(()=>!document.querySelector('#check').disabled,{},{timeout:130000});assert.match(await page.locator('#feedback').textContent(),/test 2/);
  await page.locator('#code').fill('while True:\n    pass');await page.locator('#run').click();await page.locator('#stop').click();assert.equal(await page.locator('#run').isEnabled(),true);
  // Automatyczne czyszczenie po 45 min i stara karta po zmianie ucznia.
  const other=await context.newPage();await other.goto(base+'/python-lab/index.html');await other.locator('#code').fill('print("stara praca")');
  await page.locator('#new-student').click();await page.getByRole('button',{name:'Potwierdź',exact:true}).click();await other.waitForFunction(()=>document.querySelector('#code').value!=='print("stara praca")');
  await page.evaluate(k=>{const s=JSON.parse(localStorage.getItem(k));s.end=Date.now()-1000;localStorage.setItem(k,JSON.stringify(s));},key);
  await page.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).end>Date.now(),key);assert.match(await page.locator('#progress-text').textContent(),/^0 \/ 24/);
  await other.close();
  // Gdy CDN nie odpowiada, kod zostaje i można ponowić próbę.
  const offline=await browser.newContext();await offline.route('https://unpkg.com/**',r=>r.abort());const op=await offline.newPage();await op.goto(base+'/python-lab/index.html');await op.locator('#code').fill('print("Zachowaj mnie")');await op.locator('#run').click();await op.waitForFunction(()=>!document.querySelector('#run').disabled,{},{timeout:130000});assert.match(await op.locator('#feedback').textContent(),/Nie udało się pobrać/);assert.equal(await op.locator('#code').inputValue(),'print("Zachowaj mnie")');await offline.close();
  console.log('Multi-case checks, Stop, TTL, cross-tab reset, blocked CDN recovery OK');
  for(const width of [390,800,1366,1920]){
    await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width);
    for(const dark of [false,true]){await page.evaluate(d=>document.body.classList.toggle('dark',d),dark);assert.ok(await page.locator('#code').isVisible());}
  }
  await page.setViewportSize({width:1366,height:900});await page.evaluate(()=>{document.body.classList.remove('dark');document.querySelector('#sidebar').scrollTop=0;document.querySelector('#toast').style.display='none';});await page.screenshot({path:path.join(__dirname,'../../python-lab-light.png'),fullPage:true});
  await page.locator('#theme').click();await page.screenshot({path:path.join(__dirname,'../../python-lab-dark.png'),fullPage:true});
  await page.locator('#focus').click();assert.equal(await page.locator('#sidebar').isVisible(),false);
  assert.deepEqual(errors,[]);console.log('Responsive / dark / focus modes OK. All tests passed.');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
