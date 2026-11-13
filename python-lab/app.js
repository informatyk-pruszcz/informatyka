import {lessons} from './lessons.js';
import {PythonRuntime} from './runtime.js';

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='python-pracownia-session-v1', TTL=45*60000;
const free={id:'swobodna-pracownia',title:'Twój pomysł. Twój program.',group:'SWOBODNA PRACOWNIA',intro:'Tutaj eksperymentujesz bez listy wymagań. Możesz wczytać własny plik .py. Kod uruchomisz przyciskiem poniżej.',example:'print("Co dziś zbudujesz?")',task:'Zmień przykład, rozbuduj projekt lub napisz własny program. Korzystaj z input(), pętli i funkcji. Zapisz kod, aby zabrać go ze sobą.',starter:'print("Mój własny program!")',tests:[{input:[]}],requirements:[],hints:['Zacznij od małego fragmentu. Uruchom go, zanim dodasz następny.'],experiment:'Zbuduj własny kalkulator, quiz albo grę tekstową.'};
const known=new Set([...lessons.map(l=>l.id),free.id]);
let current, hintIndex=0, busy=false, runToken=0, issueLine=0, toastTimer, storageOK=true;
const runtime=new PythonRuntime(message=>$('#runtime-status').textContent=message);

// Z pliku odczytujemy tylko znane pola. Nie uruchamiamy importowanego kodu.
export function validateWork(value) {
  if (!value || typeof value!=='object' || Array.isArray(value)) throw new Error('Nieprawidłowy zapis postępu.');
  const work={drafts:{},inputs:{},passed:{}};
  for(const key of ['drafts','inputs','passed']) {
    const source=value[key];
    if(!source || typeof source!=='object' || Array.isArray(source)) throw new Error('Brakuje pola: '+key);
    for(const [id,text] of Object.entries(source)) {
      if(!known.has(id)) continue;
      if(typeof text!=='string' || text.length>(key==='inputs'?10000:30000)) throw new Error('Plik zawiera zbyt długi lub nieprawidłowy kod.');
      work[key][id]=text;
    }
  }
  for(const id of Object.keys(work.passed)) if(id===free.id || work.passed[id]!==work.drafts[id]) delete work.passed[id];
  return work;
}
function fresh(){return {id:crypto.randomUUID(),end:Date.now()+TTL,work:{drafts:{},inputs:{},passed:{}}};}
function readSession(){try{return JSON.parse(localStorage.getItem(KEY));}catch{return null;}}
let session=readSession();
try{if(!session || typeof session.id!=='string' || !Number.isFinite(session.end) || session.end<=Date.now()) throw 0;session.work=validateWork(session.work);}catch{session=fresh();}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(session));storageOK=true;}catch{storageOK=false;}$('#save-state').textContent=storageOK?'Zapisano na tym urządzeniu.':'Zapis przeglądarki niedostępny. Pobierz postęp jako JSON.';}
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').style.display='block';toastTimer=setTimeout(()=>$('#toast').style.display='none',5000);}
function stop(){runToken++;runtime.stop();busy=false;setBusy(false);}
function resetSession(message){stop();$('#modal').close();session=fresh();persist();location.hash=lessons[0].id;render();$('#sidebar').scrollTop=0;toast(message);}
function checkSession(){
  const shared=storageOK?readSession():session;
  if(shared && shared.id!==session.id){stop();$('#modal').close();try{shared.work=validateWork(shared.work);session=shared;}catch{session=fresh();persist();}render();toast('Wczytano nową sesję z drugiej karty.');return false;}
  if(shared?.id===session.id && Number.isFinite(shared.end))session.end=shared.end;
  if(Date.now()>=session.end || (storageOK&&!shared)){resetSession('Rozpoczęto nową sesję. Poprzedni postęp został wyczyszczony.');return false;}
  const mins=Math.ceil((session.end-Date.now())/60000);$('#session-time').textContent='Sesja: '+mins+' min';
  $('#expiry').textContent=mins<=5?'Za chwilę koniec sesji. Zapisz postęp w menu ćwiczeń lub dodaj 15 minut.':'';
  return true;
}
persist();
for(const name of ['focus','pageshow','storage','visibilitychange'])window.addEventListener(name,checkSession);
setInterval(checkSession,1000);
function saveDraft(){session.work.drafts[current.id]=$('#code').value;session.work.inputs[current.id]=$('#stdin').value;delete session.work.passed[current.id];persist();renderNav();}
function renderNav(){
  let group='';$('#lesson-nav').innerHTML=lessons.map((l,i)=>{
    const heading=l.group!==group?'<div class="nav-group">'+esc(l.group)+'</div>':'';group=l.group;
    const done=session.work.passed[l.id]!==undefined && session.work.passed[l.id]===session.work.drafts[l.id];
    return heading+`<a class="lesson-link ${l.id===current?.id?'active':''} ${done?'done':''}" href="#${l.id}" ${l.id===current?.id?'aria-current="step"':''}><span class="lesson-num">${done?'✓':String(i+1).padStart(2,'0')}</span><span>${esc(l.title)}${done?'<span class="small"> · ukończone</span>':''}</span></a>`;
  }).join('');
  const count=Object.keys(session.work.passed).filter(id=>known.has(id)&&id!==free.id&&session.work.passed[id]===session.work.drafts[id]).length;
  $('#progress').value=count;$('#progress-text').textContent=`${count} / ${lessons.length} ukończonych`;
}
function lineNumbers(){const count=$('#code').value.split('\n').length;$('#lines').innerHTML=Array.from({length:count},(_,i)=>`<span class="${i+1===issueLine?'issue':''}">${i+1}</span>`).join('');$('#char-count').textContent=$('#code').value.length+' znaków';$('#lines').scrollTop=$('#code').scrollTop;}
function render(){
  if(busy)stop();
  const id=location.hash.slice(1);current=lessons.find(l=>l.id===id)||(id===free.id?free:lessons[0]);
  $('#lesson-group').textContent=current.group;$('#lesson-title').textContent=current.title;$('#step').textContent=current===free?'Twój projekt':`${lessons.indexOf(current)+1} / ${lessons.length}`;
  for(const id of ['intro','example','task','experiment'])$('#'+id).textContent=current[id];
  $('#requirements').innerHTML=current.requirements.map(r=>'<li>'+esc(r.label)+'</li>').join('');
  $('#code').value=session.work.drafts[current.id]??current.starter;$('#stdin').value=session.work.inputs[current.id]??current.tests[0].input.join('\n');
  $('#input-help').textContent=current.tests[0].input.length?'Przykładowe dane są już wpisane. Możesz je zmieniać.':'To ćwiczenie nie wymaga danych wejściowych.';
  if(current===free)$('#input-help').textContent='Każde input() odczyta kolejny wiersz.';
  $('#output').textContent='Kliknij „Uruchom”, aby zobaczyć wynik. „Sprawdź zadanie” sprawdza też inne dane.';
  $('#variables').replaceChildren();$('#variables-box').open=false;
  $('#error').hidden=$('#feedback').hidden=$('#hint-text').hidden=true;
  $('#check').hidden=$('#solution').hidden=current===free;$('#experiment-box').open=false;
  $('#previous').disabled=lessons.indexOf(current)<=0;$('#next').textContent=current===lessons.at(-1)?'Swobodna pracownia →':'Następne ćwiczenie →';
  issueLine=0;hintIndex=0;lineNumbers();renderNav();document.body.classList.remove('menu-open');$('#menu').setAttribute('aria-expanded','false');
  document.title=current.title+' · Pracownia Python';
}
function setBusy(value){busy=value;$('#run').disabled=$('#check').disabled=value;$('#stop').disabled=!value;$('#code').readOnly=value;$('#stdin').readOnly=value;for(const id of ['reset-code','upload','solution','restore'])$('#'+id).disabled=value;}
const normalize=s=>s.replace(/\r/g,'').split('\n').map(l=>l.trimEnd()).join('\n').trim();
function feedback(message,warn=false){$('#feedback').hidden=false;$('#feedback').classList.toggle('warn',warn);$('#feedback').innerHTML=message;}
function showError(error){
  issueLine=error.line||0;lineNumbers();
  const hints={SyntaxError:'Sprawdź cudzysłowy, nawiasy i dwukropek po if, for, while lub def.',IndentationError:'Sprawdź wcięcia. Wewnątrz if, pętli lub funkcji dodaj 4 spacje.',TabError:'Nie mieszaj tabulatorów ze spacjami. Wyrównaj wcięcia do 4 spacji.',NameError:'Sprawdź nazwę zmiennej. Czy została utworzona wcześniej? Wielkość liter ma znaczenie.',TypeError:'Sprawdź typy danych. input() daje tekst; do obliczeń użyj int() lub float().',ValueError:'Sprawdź dane wejściowe. int() potrzebuje liczby całkowitej, np. 12.',ZeroDivisionError:'Nie można dzielić przez zero. Sprawdź wartość pod kreską ułamkową.',IndexError:'Sprawdź indeks listy. Pierwszy to 0, ostatni jest o 1 mniejszy od długości listy.',EOFError:'Brakuje odpowiedzi. Wpisz dane do input() — po jednej odpowiedzi w każdym wierszu.',AttributeError:'Sprawdź nazwę metody i typ zmiennej, na której jej używasz.',ModuleNotFoundError:'Ta biblioteka nie jest dostępna. Pracownia obsługuje podstawowy Python, bez instalowania pakietów.'};
  const tip=error.message==='LIMIT_OUTPUT'?'Program wypisał bardzo dużo tekstu. Sprawdź warunek zakończenia pętli.':hints[error.type]||'Sprawdź wskazany fragment i uruchom mniejszą część programu.';
  $('#error').hidden=false;$('#error').innerHTML=`<p><strong>Spokojnie, to wskazówka do poprawki.</strong></p><p>${esc(tip)}</p>${issueLine?`<button id="jump-error">Przejdź do wiersza ${issueLine} →</button>`:''}<details><summary>Oryginalny komunikat Pythona</summary><pre>${esc(error.type+': '+error.message)}</pre></details>`;
  $('#jump-error')?.addEventListener('click',()=>{const rows=$('#code').value.split('\n');const start=rows.slice(0,issueLine-1).reduce((a,b)=>a+b.length+1,0);$('#code').focus();$('#code').setSelectionRange(start,start+(rows[issueLine-1]?.length||0));$('#code').scrollTop=Math.max(0,(issueLine-3)*parseFloat(getComputedStyle($('#code')).lineHeight));$('#lines').scrollTop=$('#code').scrollTop;});
}
async function execute(check=false){
  if(busy||!checkSession())return;
  const lesson=current,code=$('#code').value,token=++runToken;
  session.work.drafts[lesson.id]=code;session.work.inputs[lesson.id]=$('#stdin').value;persist();
  if(!code.trim()){feedback('Wpisz najpierw choć jedną instrukcję, np. <code>print("Cześć!")</code>.',true);return;}
  setBusy(true);issueLine=0;lineNumbers();$('#error').hidden=$('#feedback').hidden=true;$('#output').textContent='Uruchamianie…';
  try{
    const cases=check?lesson.tests:[{input:$('#stdin').value===''?[]:$('#stdin').value.replace(/\r/g,'').split('\n')}];
    const results=await runtime.run({code,cases});
    if(token!==runToken||!checkSession())return;
    const result=results[0];$('#output').textContent=result.transcript||'(Program niczego nie wypisał.)';
    $('#variables').innerHTML=Object.entries(result.variables).map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')||'<dt>—</dt><dd>Brak prostych zmiennych do pokazania.</dd>';
    const failure=results.findIndex(r=>r.error);
    if(failure>=0){showError(results[failure].error);if(check){delete session.work.passed[lesson.id];feedback(`Test ${failure+1}: program wymaga poprawki. Dane: <code>${esc(cases[failure].input.join(' | ')||'brak')}</code>.`,true);}}
    else if(check){
      const wrong=results.findIndex((r,i)=>normalize(r.output)!==normalize(cases[i].output));
      const missing=lesson.requirements.filter(r=>!result.features.includes(r.feature));
      if(wrong>=0){delete session.work.passed[lesson.id];feedback(`<strong>Jeszcze mała poprawka — test ${wrong+1} z ${cases.length}.</strong><p>Dane wejściowe: <code>${esc(cases[wrong].input.join(' | ')||'brak')}</code>. Porównaj wynik z poleceniem. Sprawdź kolejność, granice warunków i pisownię.</p><p>Oczekiwany wynik:</p><pre>${esc(cases[wrong].output||'(brak tekstu)')}</pre><p>Twój wynik:</p><pre>${esc(results[wrong].output||'(brak tekstu)')}</pre>`,true);}
      else if(missing.length){delete session.work.passed[lesson.id];feedback('<strong>Wynik pasuje! Teraz przećwicz mechanizm z tej lekcji.</strong><ul>'+missing.map(r=>'<li>'+esc(r.label)+'</li>').join('')+'</ul>',true);}
      else{session.work.passed[lesson.id]=code;feedback(`<strong>✓ Ukończone! Twój program działa.</strong><p>Przeszedł ${cases.length} ${cases.length===1?'test':'testy'}. Ćwiczenie zostało odhaczone w ścieżce. Możesz przejść dalej albo poeksperymentować.</p>`);}
      persist();renderNav();
    }else if(!result.error){feedback('Program zakończył działanie. Aby odhaczyć ćwiczenie, kliknij <strong>„Sprawdź zadanie”</strong>.');if(lesson===free)feedback('Program zakończył działanie. Możesz go rozbudować lub pobrać jako plik .py.');}
    if(failure>=0&&check){persist();renderNav();}
    $('#runtime-status').textContent='Python gotowy';
  }catch(error){if(token!==runToken)return;$('#output').textContent='';const messages={STOP:'Program zatrzymany. Możesz poprawić kod i uruchomić ponownie.',TIMEOUT:'Program trwał ponad 6 sekund i został zatrzymany. Sprawdź, czy pętla zmienia licznik lub warunek.',LOAD:'Nie udało się pobrać Pythona. Sprawdź internet i dostęp do unpkg.com w sieci szkolnej. Kod pozostaje w edytorze. Kliknij „Uruchom”, aby spróbować ponownie.'};feedback(esc(messages[error.message]||'Nie udało się wykonać programu. Spróbuj ponownie.'),true);}
  finally{if(token===runToken)setBusy(false);}
}
function modal(title,html,actions=[]){$('#modal-title').textContent=title;$('#modal-body').innerHTML=html;$('#modal-actions').replaceChildren();for(const [label,fn] of actions){const b=document.createElement('button');b.textContent=label;b.onclick=()=>{$('#modal').close();fn();};$('#modal-actions').append(b);}if(!$('#modal').open)$('#modal').showModal();}
function confirmAction(title,body,fn){modal(title,'<p>'+esc(body)+'</p>',[['Anuluj',()=>{}],['Potwierdź',fn]]);}
function download(name,text,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#run').onclick=()=>execute();$('#check').onclick=()=>execute(true);$('#stop').onclick=()=>{stop();$('#runtime-status').textContent='Zatrzymano';feedback('Program zatrzymany. Popraw kod i spróbuj ponownie.',true);};
$('#code').addEventListener('input',()=>{if(!checkSession())return;issueLine=0;$('#error').hidden=true;$('#feedback').hidden=true;saveDraft();lineNumbers();});
$('#code').addEventListener('scroll',()=>$('#lines').scrollTop=$('#code').scrollTop);
$('#stdin').oninput=()=>{if(checkSession()){session.work.inputs[current.id]=$('#stdin').value;persist();}};
$('#code').addEventListener('keydown',e=>{
  if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();execute();return;}
  if(e.key==='Tab'&&!e.shiftKey&&!busy){e.preventDefault();if(!checkSession())return;const el=e.target;el.setRangeText('    ',el.selectionStart,el.selectionEnd,'end');el.dispatchEvent(new Event('input'));}
  if(e.key==='Enter'&&!e.ctrlKey&&!e.metaKey&&!busy){const el=e.target,before=el.value.slice(0,el.selectionStart).split('\n').at(-1);const spaces=before.match(/^ */)[0]+(before.trimEnd().endsWith(':')?'    ':'');e.preventDefault();el.setRangeText('\n'+spaces,el.selectionStart,el.selectionEnd,'end');el.dispatchEvent(new Event('input'));}
});
$('#hint').onclick=()=>{if(!checkSession())return;$('#hint-text').hidden=false;$('#hint-text').textContent=current.hints[Math.min(hintIndex++,current.hints.length-1)];};
$('#reset-code').onclick=()=>confirmAction('Wrócić do kodu startowego?','Obecny kod tego ćwiczenia zostanie zastąpiony. Najpierw możesz pobrać plik .py.',()=>{if(!checkSession())return;$('#code').value=current.starter;saveDraft();issueLine=0;lineNumbers();$('#feedback').hidden=$('#error').hidden=true;});
$('#solution').onclick=()=>modal('Jedno z możliwych rozwiązań','<p>Najpierw porównaj je ze swoją próbą. Zwróć uwagę na wcięcia i kolejność poleceń.</p><pre>'+esc(current.solution)+'</pre>');
$('#previous').onclick=()=>location.hash=lessons[Math.max(0,lessons.indexOf(current)-1)].id;
$('#next').onclick=()=>location.hash=lessons[lessons.indexOf(current)+1]?.id||free.id;
window.addEventListener('hashchange',()=>{checkSession();render();window.scrollTo({top:0,behavior:'instant'});});
$('#menu').onclick=()=>{$('#menu').setAttribute('aria-expanded',String(document.body.classList.toggle('menu-open')));};
$('#focus').onclick=()=>$('#focus').setAttribute('aria-pressed',String(document.body.classList.toggle('focus-mode')));
$('#extend').onclick=()=>{if(checkSession()){session.end+=15*60000;persist();checkSession();}};
$('#new-student').onclick=()=>confirmAction('Nowy uczeń na stanowisku?','To rozpocznie nową sesję i usunie bieżący postęp w tej przeglądarce. Pobierz JSON, jeśli chcesz do niego wrócić.',()=>resetSession('Nowa sesja — powodzenia!'));
$('#close-modal').onclick=()=>$('#modal').close();
$('#download').onclick=()=>download(current.id+'.py',$('#code').value,'text/x-python;charset=utf-8');
$('#backup').onclick=()=>{if(!checkSession())return;session.work.drafts[current.id]=$('#code').value;session.work.inputs[current.id]=$('#stdin').value;persist();download('python-postep.json',JSON.stringify({app:'informatyka-python-lab',version:1,savedAt:new Date().toISOString(),...session.work},null,2),'application/json');};
$('#upload').onclick=()=>$('#upload-file').click();$('#restore').onclick=()=>$('#restore-file').click();
$('#upload-file').onchange=async e=>{
  const file=e.target.files[0];e.target.value='';if(!file)return;
  if(!file.name.toLowerCase().endsWith('.py')||file.size>120000){toast('Wybierz plik .py, maksymalnie 120 kB.');return;}
  const text=(await file.text()).replace(/^\uFEFF/,'');if(text.length>30000||text.includes('\0')){toast('Kod jest zbyt długi lub nie jest plikiem tekstowym.');return;}
  const id=current.id;
  confirmAction('Wczytać kod z pliku?',`Plik ${file.name} zastąpi kod bieżącego ćwiczenia. Nie uruchomi się automatycznie.`,()=>{if(!checkSession()||id!==current.id)return;$('#code').value=text;saveDraft();lineNumbers();$('#feedback').hidden=$('#error').hidden=true;toast('Wczytano kod. Kliknij „Uruchom” lub „Sprawdź zadanie”.');});
};
$('#restore-file').onchange=async e=>{
  const file=e.target.files[0];e.target.value='';if(!file)return;
  try{if(file.size>2000000)throw new Error('Plik jest zbyt duży. Limit: 2 MB.');const parsed=JSON.parse(await file.text());if(parsed.app!=='informatyka-python-lab'||parsed.version!==1)throw new Error('To nie jest plik postępu tej pracowni Python.');const work=validateWork(parsed);
    confirmAction('Wczytać zapisany postęp?',`Kopia zawiera ${Object.keys(work.drafts).length} prac i ${Object.keys(work.passed).length} ukończonych ćwiczeń. Zastąpi obecny postęp.`,()=>{if(!checkSession())return;stop();session.work=work;persist();render();toast('Wczytano postęp z pliku JSON.');});
  }catch(error){toast(error instanceof SyntaxError?'Nie udało się odczytać JSON. Wybierz poprawny plik postępu.':error.message);}
};
$('#cheatsheet').onclick=()=>modal('Python pod ręką',`<table><thead><tr><th>Chcesz…</th><th>Napisz</th></tr></thead><tbody>${[
  ['Pokazać tekst','print("Cześć!")'],['Zapamiętać liczbę','punkty = 5'],['Wstawić zmienną do tekstu','print(f"Masz {punkty} punktów")'],['Odczytać odpowiedź','imie = input("Imię: ")'],['Odczytać liczbę','n = int(input())'],['Podjąć decyzję','if n >= 10:\n    print("Bonus")\nelse:\n    print("Ćwicz dalej")'],['Powtórzyć 3 razy','for i in range(3):\n    print(i)'],['Zmniejszać licznik','while n > 0:\n    n = n - 1'],['Użyć listy','rzeczy = ["mapa", "woda"]\nprint(rzeczy[0])'],['Zwrócić wynik funkcji','def podwoj(n):\n    return n * 2'],['Posortować liczby','liczby.sort()']
].map(([a,b])=>'<tr><td>'+a+'</td><td><code>'+esc(b).replace(/\n/g,'<br>').replace(/    /g,'&nbsp;&nbsp;&nbsp;&nbsp;')+'</code></td></tr>').join('')}</tbody></table><p><strong>Pamiętaj:</strong> <code>=</code> przypisuje wartość, <code>==</code> porównuje. Wielkość liter i wcięcia mają znaczenie.</p><p><kbd>Tab</kbd> w edytorze dodaje 4 spacje. <kbd>Shift</kbd> + <kbd>Tab</kbd> pozwala opuścić edytor. <kbd>Ctrl</kbd> + <kbd>Enter</kbd> uruchamia program.</p>`);
$('#teacher').onclick=()=>modal('Pracownia dla klas 7–8',`<p><strong>24 ćwiczenia:</strong> pierwsze programy (1–6), dane i decyzje (7–12), pętle, listy i funkcje (13–18), algorytmy i projekty (19–24). To ścieżka od podstaw, a nie pełny kurs wszystkich zagadnień programowania.</p><p><strong>Proponowany rytm:</strong> przewidź wynik → uruchom przykład we własnym kodzie → wykonaj misję → sprawdź → zmień jeden element. Ćwiczenia nie są sprawdzianem na ocenę. Testy pomagają w nauce; nie dowodzą poprawności każdego możliwego programu.</p><p><strong>Sesja trwa 45 minut</strong> i działa po F5. Po upływie czasu resetuje się automatycznie. „Nowy uczeń” usuwa postęp, „+15 min” przedłuża sesję. Uczeń może pobrać kod .py oraz pełny postęp .json i później je wczytać. Dane i wyniki nie są wysyłane nauczycielowi.</p><p><strong>Uruchamianie:</strong> prawdziwy Python przez Pyodide. Przy pierwszym starcie potrzebny jest dostęp do <code>unpkg.com</code>. Program ma limit 6 sekund i 20 000 znaków wyniku. Obsługujemy tekstową konsolę i podstawowe biblioteki Pythona; nie instalujemy pakietów, nie obsługujemy okien pulpitu ani turtle. Odpowiedzi do input() wpisuje się przed uruchomieniem.</p><h3>Inspiracje metodyczne i dokumentacja</h3><p>Ćwiczenia i polskie objaśnienia opracowano dla tej strony. Inspiracją są małe kroki, działające przykłady, informacja zwrotna i własne projekty:</p><ul><li><a href="https://code.org/en-US/tools/python-lab" target="_blank" rel="noopener noreferrer">Code.org / CodeAI — Python Lab</a></li><li><a href="https://blog.khanacademy.org/introducing-khan-academys-new-intro-to-computer-science-course-with-python/" target="_blank" rel="noopener noreferrer">Khan Academy — kurs Python i nauka przez projekty</a></li><li><a href="https://projects.raspberrypi.org/en/pathways/python-intro" target="_blank" rel="noopener noreferrer">Raspberry Pi Foundation — Introduction to Python</a></li><li><a href="https://pyodide.org/en/stable/" target="_blank" rel="noopener noreferrer">Pyodide — środowisko wykonawcze Python</a></li></ul>`);
render();checkSession();setBusy(false);
