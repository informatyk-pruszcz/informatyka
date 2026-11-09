// Formularze używają zwykłego UI. Podmieniamy jedynie połączenie do chmury.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://127.0.0.1:4218/';
(async()=>{
 const b=await chromium.launch(process.env.BROWSER_EXE?{executablePath:process.env.BROWSER_EXE}:{});
 try {
  const p=await b.newPage();
  await p.route('**/cloud.js*',route=>route.fulfill({contentType:'text/javascript',body:`
    export async function connectCloud(onData,onStatus,onUser) {
      const published=()=>JSON.parse(localStorage.getItem('mock-published')||'{"version":1,"revision":0,"items":null}');
      onData(published());
      let teacher=true;onUser(teacher);
      return {isTeacher:()=>teacher,logout:async()=>{teacher=false;onUser(false)},publish:async(data,revision)=>{
        if(revision!==published().revision)throw Error('Konflikt');
        const next={...data,revision:revision+1};localStorage.setItem('mock-published',JSON.stringify(next));onData(next);return next.revision;
      }};
    }`}));
  await p.goto(base+'#admin');
  const item={id:'proba-starej-kopii',type:'note',grades:[5],section:'Test',tags:[],title:'Kopia archiwalna',summary:'',body:'<p>Treść kopii.</p>'};
  await p.setInputFiles('#import-file',{name:'kopia.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,items:[item]}))});
  await p.click('#confirm-import');
  await p.click('[data-edit="proba-starej-kopii"]');
  await p.check('input[name=draft]');await p.locator('#edit-form details summary').click();await p.fill('input[name="study-product"]','Plakat');await p.click('#edit-form [type=submit]');
  await p.click('#publish');
  await p.waitForFunction(()=>localStorage.getItem('mock-published'));
  assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('mock-published')).items),[]);
  await p.reload();await p.click('[data-edit="proba-starej-kopii"]');
  assert.equal(await p.locator('[name=study-product]').inputValue(),'Plakat');
  await p.uncheck('[name=draft]');await p.click('#edit-form [type=submit]');await p.click('#publish');
  await p.click('#logout');await p.goto(base+'#item/proba-starej-kopii');await p.getByRole('heading',{name:'Kopia archiwalna'}).waitFor();
  console.log('OK: import starej bazy, metryka, szkic lokalny, publikacja i dostęp ucznia.');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
