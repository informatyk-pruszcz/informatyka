const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXE});
 try{
  const p=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  const fixtures={};for(const g of 'ABC'){
   const buffer=fs.readFileSync(path.resolve(__dirname,`../../../outputs/excel8-teachers-20261116/Sprawdzian_Excel_Klasa8_Grupa_${g}_Nauczyciel.xlsx`));
   fixtures[g]={version:1,content:buffer.toString('base64'),sha256:crypto.createHash('sha256').update(buffer).digest('hex')};
  }
  // Mock tylko na potrzeby testu UI; prawdziwe reguły sprawdzamy osobno na serwerze.
  await p.route('**/cloud.js?*',r=>r.fulfill({contentType:'text/javascript',body:`export async function connectCloud(data,status,change){let teacher=false;const fixtures=${JSON.stringify(fixtures)};window.setTeacher=v=>{teacher=v;change(v)};window.teacherMode='ok';data({version:1,revision:1,items:[]});return {isTeacher:()=>teacher,teacherExamFile:async(set,g)=>{if(!teacher)throw Error('Brak dostępu');if(window.teacherMode==='denied')throw Object.assign(Error('Denied'),{code:'permission-denied'});if(window.teacherMode==='tampered')return {...fixtures[g],sha256:'bad'};if(window.teacherMode==='logout'){teacher=false;change(false)}return fixtures[g]}}}` }));
  await p.goto('http://127.0.0.1:4182/#admin');
  await p.waitForFunction(()=>typeof window.setTeacher==='function');
  assert.equal(await p.locator('[data-teacher-exam]').count(),0);
  await p.evaluate(()=>window.setTeacher(true));
  await p.locator('[data-teacher-exam="A"]').waitFor();
  for(const g of 'ABC'){
   const pending=p.waitForEvent('download');await p.locator(`[data-teacher-exam="${g}"]`).click();const d=await pending;
   assert.equal(d.suggestedFilename(),`Sprawdzian_Excel_Klasa8_Grupa_${g}_Nauczyciel.xlsx`);
   assert.equal(crypto.createHash('sha256').update(fs.readFileSync(await d.path())).digest('hex'),fixtures[g].sha256);
  }
  await p.evaluate(()=>window.teacherMode='denied');await p.locator('[data-teacher-exam="A"]').click();
  await p.waitForFunction(()=>document.querySelector('#teacher-exam-status').textContent.includes('Brak dostępu'));
  await p.evaluate(()=>window.teacherMode='tampered');await p.locator('[data-teacher-exam="A"]').click();
  await p.waitForFunction(()=>document.querySelector('#teacher-exam-status').textContent.includes('uszkodzony'));
  await p.evaluate(()=>window.teacherMode='ok');
  for(const width of [390,800,1366]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
  await p.locator('#teacher-exam-files').screenshot({path:path.resolve(__dirname,'../../exam-revision/teacher-panel.png')});
  let downloaded=false;p.on('download',()=>downloaded=true);
  await p.evaluate(()=>window.teacherMode='logout');await p.locator('[data-teacher-exam="A"]').click();
  await p.waitForFunction(()=>!document.querySelector('[data-teacher-exam]'));
  assert.equal(downloaded,false);assert.deepEqual(errors,[]);
  console.log('PASS: teacher-only controls, A/B/C exact download, denied access, integrity, logout, responsive layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
