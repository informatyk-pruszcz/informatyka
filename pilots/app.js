'use strict';
function show(focus=true) {
  const match = /^#(algorytmy|siec|dane|model|pliki)\/([1-5])$/.exec(location.hash);
  if (!match) {const last=stored('last','algorytmy/1'); location.replace('#'+(/^(algorytmy|siec|dane|model|pliki)\/[1-5]$/.test(last)?last:'algorytmy/1'));return;}
  active = {id:match[1],index:Number(match[2])-1};
  const lab=pilots[active.id], n=active.index, task=lab.tasks[n];
  currentDraft=stored(routeKey(),{});
  remember('last',routeKey());
  $('#module').innerHTML=options(Object.entries(pilots).map(([id,m])=>[id,m.name]),active.id);
  $('#task').innerHTML=options(lab.tasks.map((v,i)=>[i+1,v.title]),n+1);
  $('#title').textContent=lab.name;$('#heading').textContent=task.title;
  $('#position').textContent='Ćwiczenie '+(n+1)+' z '+lab.tasks.length;
  $('#goal').textContent=task.goal;$('#transfer').textContent=task.transfer;$('#extra').open=!!state().extra;
  $('#reflection').value=state().reflection||'';message('');
  $('#prev').disabled=n===0;$('#next').disabled=n===lab.tasks.length-1;
  const from=new URLSearchParams(location.search).get('z');
  $('#back').href='../#item/'+(from && /^[-a-z0-9]+$/.test(from)?from:task.lesson);
  lab.render(n,task); if(focus)$('#heading').focus();
  document.title=task.title+' · '+lab.name;
}
$('#extra').ontoggle=()=>{if(currentDraft){state().extra=$('#extra').open;saveDraft()}};
$('#reflection').oninput=e=>{state().reflection=e.target.value;saveDraft()};
$('#module').onchange=e=>location.hash=e.target.value+'/1';
$('#task').onchange=e=>location.hash=active.id+'/'+e.target.value;
$('#prev').onclick=()=>location.hash=keyOf(active.id,active.index-1);
$('#next').onclick=()=>location.hash=keyOf(active.id,active.index+1);
function projector(on){document.body.classList.toggle('projector',on);$('#projector').setAttribute('aria-pressed',String(on));remember('projector',on)}
$('#projector').onclick=()=>projector(!document.body.classList.contains('projector'));
$('#report').onclick=()=>{const module=pilots[active.id];const records=module.tasks.flatMap((task,i)=>{const data=stored(keyOf(active.id,i),{});if(!data.result&&!data.reflection)return [];return [(i+1)+'. '+task.title,data.result||'Próba w toku','Wniosek: '+(data.reflection||'do omówienia'),'']});if(!records.length){message('Wykonaj próbę lub zapisz swój wniosek przed pobraniem.');return}downloadable('moja-praca-'+active.id+'.txt','\ufeff'+[module.name,'',...records].join('\r\n'),'text/plain;charset=utf-8')};
function outcome(text){state().result=text;saveDraft();message(text)}
window.addEventListener('hashchange',()=>show());projector(stored('projector',false));show(false);
