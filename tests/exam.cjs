
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const base=process.env.BASE_URL||'http://127.0.0.1:4182';
const sources=process.env.EXAM_SOURCE_DIR||require('node:path').resolve(__dirname,'../../../outputs/excel8-20261116');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXE});
 try{
 const p=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 // Zastępujemy tylko chmurę: test nie modyfikuje danych szkoły.
 await p.route('**/cloud.js?*',route=>route.fulfill({contentType:'text/javascript',body:
 'export async function connectCloud(onData,onStatus,onTeacher){let teacher=false;let doc={version:1,revision:4,items:[{id:"test-note",type:"note",grades:[8],tags:[],title:"Zachowaj notatkę",body:"<p>Treść</p>"}]};window.examTestTeacher=()=>{teacher=true;onTeacher(true)};window.examTestDoc=()=>doc;setTimeout(()=>onData(doc),50);return {isTeacher:()=>teacher,changeExam:async(c,revision)=>{if(!teacher||revision!==doc.revision)throw Error("Conflict");doc={...doc,revision:revision+1,items:[...doc.items.filter(i=>i.id!=="system-excel8-access"),{id:"system-excel8-access",type:"task",grades:[8],tags:[],title:"Ustawienia",body:JSON.stringify(c)}]};onData(doc);}};}'}));
 await p.goto(base+'/#class/8');
 await p.getByRole('link',{name:'Sprawdzian wiadomości',exact:true}).click();
 await p.locator('#exam-password').waitFor();
 await p.locator('#exam-password').fill('bledne');await p.locator('#exam-login button').click();
 await p.waitForFunction(()=>document.querySelector('#exam-status').textContent.includes('nie pasuje'));
 assert.equal(await p.locator('#exam-draw').count(),0);
 await p.locator('#exam-password').fill('excel2026start');await p.locator('#exam-login button').click();
 await p.locator('#exam-draw').click();
 const group=(await p.locator('#exam-result h2').textContent()).slice(-1);
 assert.ok(['A','B','C'].includes(group));
 const dp=p.waitForEvent('download');await p.locator('#exam-download').click();const d=await dp;
 assert.equal(d.suggestedFilename(),'Sprawdzian_Excel_Klasa8_Grupa_'+group+'_Uczen.xlsx');
 const original=sources+'/'+d.suggestedFilename();
 assert.deepEqual(fs.readFileSync(await d.path()),fs.readFileSync(original));
 await p.reload();await p.locator('#exam-password').fill('excel2026start');await p.locator('#exam-login button').click();
 await p.locator('#exam-download').waitFor();assert.ok((await p.locator('#exam-result h2').textContent()).endsWith(group));
 // Wszystkie trzy pliki oraz zmiana opakowania klucza.
 const decoded=await p.evaluate(async()=>{
 const m=await import('./exam.js?v=2'),c=await m.configFrom([]),raw=await m.unlock('excel2026start',c);
 let rejected=false;try{await m.unlock('testexcel123',c);}catch{rejected=true;}if(!rejected)throw Error('Stare hasło otwiera nowy zestaw');
 const legacy=await m.configFrom([{id:m.EXAM_ID,body:JSON.stringify({...c,dataset:'old-set',data:'invalid'})}]);if(legacy.dataset!==m.EXAM_SET)throw Error('Stara konfiguracja nie została pominięta');
 const key=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']),out={};
 for(const g of ['A','B','C']){const f=await fetch('./sprawdziany/'+m.EXAM_SET+'/grupa-'+g+'.json').then(r=>r.json()),b=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
 const data=await crypto.subtle.decrypt({name:'AES-GCM',iv:b(f.iv)},key,b(f.data));out[g]=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',data)));}
 return out;
 });
 for(const g of ['A','B','C'])assert.deepEqual(decoded[g],Array.from(crypto.createHash('sha256').update(fs.readFileSync(sources+'/Sprawdzian_Excel_Klasa8_Grupa_'+g+'_Uczen.xlsx')).digest()));
 await p.evaluate(()=>examTestTeacher());await p.goto(base+'/#admin');await p.evaluate(()=>examTestTeacher());
 await p.locator('#exam-settings [name=old]').fill('excel2026start');
 await p.locator('#exam-settings [name=next]').fill('kolejnaLekcja456');
 await p.locator('#exam-settings [name=repeat]').fill('kolejnaLekcja456');
 await p.locator('#exam-settings button').click();
 await p.waitForFunction(()=>window.examTestDoc().revision===5);
 assert.equal(await p.evaluate(()=>examTestDoc().items[0].id),'test-note');
 await p.getByRole('link',{name:'Otwórz stronę ucznia →'}).click();
 await p.locator('#exam-password').fill('excel2026start');await p.locator('#exam-login button').click();
 await p.waitForFunction(()=>document.querySelector('#exam-status').textContent.includes('nie pasuje'));
 await p.locator('#exam-password').fill('kolejnaLekcja456');await p.locator('#exam-login button').click();
 await p.locator('#exam-draw').click();await p.locator('#exam-download').waitFor();
 for(const width of [390,800,1366]){
 await p.setViewportSize({width,height:900});
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+width);
 }
 await p.screenshot({path:require('node:path').join(__dirname,'../../exam-mobile.png'),fullPage:true});
 assert.deepEqual(errors,[]);console.log('OK: password gate, random group, F5, original bytes of 3 XLSX files, teacher password rotation, retained material, responsive layout.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
