const $=s=>document.querySelector(s), KEY=labSession.key;
let store={version:1,drafts:{},passed:{}},current,hintIndex=0,timer,toastTimer;
const free={id:'swobodna',group:4,title:'Twój pomysł. Twoja strona.',tag:'swobodna pracownia',time:'Bez pośpiechu',intro:'Tu decydujesz, co powstanie. Użyj poznanych znaczników, podejrzyj efekt i pobierz stronę. Nie ma punktów ani obowiązkowej treści.',example:'<h1>Mój pomysł</h1>\n<p>Wszystko zaczyna się od pierwszego zdania.</p>',task:'Zaplanuj stronę na wybrany temat. Potem dodawaj kolejne elementy. Dołączony obraz ma nazwę park.svg.',starter:full('<h1>Mój pomysł</h1>\n<p>Tu zaczyna się moja strona.</p>'),rules:[],hints:['Zacznij od tytułu, opisu i listy.','Skorzystaj ze ściągi HTML w prawym górnym rogu.'],try:'Pokaż projekt koledze. Poproś, żeby wskazał jedną rzecz, którą można jeszcze poprawić.'};
function validStore(s){if(!s||s.version!==1||!s.drafts||typeof s.drafts!=='object'||Array.isArray(s.drafts)||!s.passed||typeof s.passed!=='object')throw Error('Nieprawidłowy plik prac.');for(const [id,v]of Object.entries(s.drafts)){if(![...LESSONS.map(l=>l.id),'swobodna'].includes(id)||typeof v!=='string'||v.length>30000)throw Error('Nieprawidłowy kod lub identyfikator ćwiczenia.');}return {version:1,drafts:{...s.drafts},passed:{...s.passed}};}
try{const s=localStorage.getItem(KEY);if(s)store=validStore(JSON.parse(s));if(localStorage.getItem('html-theme')==='dark')document.body.classList.add('dark');}catch{setTimeout(()=>toast('Nie odczytano zapisanych prac. Możesz wczytać kopię JSON.'),400);}
function toast(text){$('#toast').textContent=text;$('#toast').style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').style.display='none',4500);}
function save(){if(!labSession.check())return;store.drafts[current.id]=$('#code').value;try{localStorage.setItem(KEY,JSON.stringify(store));$('#save-state').textContent='Zapisano na tym urządzeniu.';}catch{$('#save-state').textContent='Nie zapisano w przeglądarce — wyeksportuj prace.';}}
function passed(id){return store.passed[id]===store.drafts[id]&&typeof store.drafts[id]==='string';}
function sidebar(){const count=LESSONS.filter(l=>passed(l.id)).length;$('#progress').value=count;$('#progress-text').textContent=`${count} / ${LESSONS.length} ukończonych`;$('#lesson-nav').innerHTML=GROUPS.map((g,idx)=>`<div class="nav-group">${g}</div>`+LESSONS.filter(l=>l.group===idx).map(l=>`<a href="#${l.id}" class="lesson-link ${l.id===current.id?'active':''} ${passed(l.id)?'done':''}" ${l.id===current.id?'aria-current="step"':''}><span class="lesson-num">${passed(l.id)?'✓':String(LESSONS.indexOf(l)+1).padStart(2,'0')}</span><span>${escapeHTML(l.title)}</span></a>`).join('')).join('');}
function goals(results){const rows=results||[...current.rules.map(r=>({label:r.label})),...(current.full?[{label:'Dokument ma DOCTYPE HTML5, html lang="pl", head, body i UTF-8.'}]:[])];$('#requirements').innerHTML='<ul class="requirements">'+rows.map(r=>`<li class="${r.ok===true?'good':r.ok===false?'bad':''}"><span>${r.ok===true?'✓':r.ok===false?'○':'□'}</span>${escapeHTML(r.label)}</li>`).join('')+'</ul>';}
function preview(){const code=$('#code').value;const p=cleanDocument(code);$('#preview').srcdoc=p.html;$('#preview-title').textContent=p.title;$('#char-count').textContent=' · '+code.length+' znaków';paintNumbers();}
function openLesson(){markedLines.clear();clearTimeout(timer);const id=location.hash.slice(1);current=LESSONS.find(l=>l.id===id)||(id==='swobodna'?free:LESSONS[0]);hintIndex=0;showDiscovery(current.id);$('#lesson-title').textContent=current.title;$('#lesson-summary').textContent=current.id==='swobodna'?'Eksperymentuj z HTML i CSS we własnym tempie.':'Jedna nowa umiejętność. Jeden widoczny efekt. Spróbuj samodzielnie.';$('#lesson-time').textContent='◷ '+current.time;$('#lesson-kind').textContent=current.tag;$('#group-name').textContent=GROUPS[current.group]||'Swobodna pracownia';$('#lesson-position').textContent=current.id==='swobodna'?'Bez oceniania':`Ćwiczenie ${LESSONS.indexOf(current)+1} z ${LESSONS.length}`;$('#intro').textContent=current.intro;$('#example').textContent=current.example;$('#task').textContent=current.task;$('#experiment').textContent=current.try;$('#code').value=store.drafts[current.id]??current.starter;$('#feedback').innerHTML='';$('#hint-text').hidden=true;$('#hint-count').textContent='';$('#solution').hidden=!current.solution;$('#check').innerHTML=current.id==='swobodna'?'Sprawdź znaczniki ✓':'Sprawdź zadanie ✓';$('#next').textContent=current===LESSONS.at(-1)?'Przejdź do swobodnej pracowni →':'Następne ćwiczenie →';$('#next').hidden=current.id==='swobodna';goals();preview();sidebar();document.body.classList.remove('menu-open');$('#toggle-menu').setAttribute('aria-expanded','false');document.title=current.title+' · Pracownia HTML';}
$('#code').addEventListener('input',()=>{markedLines.clear();paintNumbers();delete store.passed[current.id];save();sidebar();$('#feedback').innerHTML='';goals();clearTimeout(timer);timer=setTimeout(preview,180);});
$('#code').addEventListener('scroll',()=>$('#line-numbers').scrollTop=$('#code').scrollTop);
$('#code').addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const el=e.target;el.setRangeText('  ',el.selectionStart,el.selectionEnd,'end');el.dispatchEvent(new Event('input'));}if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();$('#check').click();}});
$('#check').onclick=()=>{clearTimeout(timer);preview();const result=inspect($('#code').value,current);goals(result.results);if(result.ok&&current.id!=='swobodna'){store.passed[current.id]=$('#code').value;save();sidebar();}drawConsole($('#code').value,current,result);};
$('#hint').onclick=()=>{$('#hint-text').hidden=false;$('#hint-text').textContent=current.hints[Math.min(hintIndex,current.hints.length-1)];hintIndex=Math.min(hintIndex+1,current.hints.length);$('#hint-count').textContent=`${hintIndex}/${current.hints.length}`;};
function modal(title,body){$('#modal-title').textContent=title;$('#modal-body').innerHTML=body;$('#modal').showModal();}
$('#close-modal').onclick=()=>$('#modal').close();
$('#solution').onclick=()=>modal('Przykład rozwiązania',`<p>To jeden z możliwych sposobów. Porównaj go ze swoim kodem i spróbuj wyjaśnić różnice.</p><pre>${escapeHTML(current.solution)}</pre><p>Twoja praca pozostaje w edytorze. Zamknij to okno i popraw ją samodzielnie.</p>`);
$('#reset').onclick=()=>{modal('Zacząć to ćwiczenie od nowa?',`<p>Wrócisz do kodu początkowego tego ćwiczenia. Przed zmianą możesz pobrać swoją stronę.</p><button id="save-before-reset">Pobierz moją stronę</button> <button id="confirm-reset" class="primary">Przywróć kod początkowy</button>`);$('#save-before-reset').onclick=downloadHTML;$('#confirm-reset').onclick=()=>{$('#code').value=current.starter;delete store.passed[current.id];save();$('#modal').close();openLesson();};};
$('#next').onclick=()=>{save();const index=LESSONS.indexOf(current);location.hash=LESSONS[index+1]?.id||'swobodna';};
$('#playground').onclick=()=>location.hash='swobodna';$('#refresh').onclick=preview;
function download(name,content,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function downloadHTML(){save();download(current.id+'.html',exportPage($('#code').value),'text/html;charset=utf-8');toast('Pobrano stronę HTML. Otwórz plik w przeglądarce.');}
$('#download').onclick=downloadHTML;
$('#backup').onclick=()=>{save();download('moje-prace-html.json',JSON.stringify(store,null,2),'application/json');};
$('#restore').onclick=()=>$('#restore-file').click();
$('#import-now').onclick = () => $('#restore-file').click();
$('#restore-file').onchange = async event => {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  try {
    if (file.size > 8 * 1024 * 1024) throw Error('Plik jest za duży.');
    const incoming = validStore(JSON.parse(await file.text()));
    if (!labSession.check()) return;
    const ids = Object.keys(incoming.drafts);
    modal('Wczytać postęp z pliku JSON?', '<p>Liczba ćwiczeń w pliku: '+ids.length+'. Ich kod i zaliczenia zastąpią obecny zapis tych ćwiczeń.</p><button id="cancel-progress">Anuluj</button> <button id="import-confirm" class="primary">Wczytaj postęp</button>');
    $('#cancel-progress').onclick = () => $('#modal').close();
    $('#import-confirm').onclick = () => {
      if (!labSession.check()) return;
      const passed = {...store.passed};
      for (const id of ids) {
        delete passed[id];
        const lesson = LESSONS.find(item => item.id === id);
        const draft = incoming.drafts[id];
        if (lesson && incoming.passed[id] === draft && inspect(draft,lesson).ok) passed[id] = draft;
      }
      store = {version:1, drafts:{...store.drafts,...incoming.drafts}, passed};
      let message = 'Wczytano kod i postęp z pliku JSON.';
      try { localStorage.setItem(KEY,JSON.stringify(store)); }
      catch { message = 'Wczytano postęp na tę chwilę. Brakuje miejsca na zapis po odświeżeniu.'; }
      $('#modal').close();
      openLesson();
      toast(message);
    };
  } catch { toast('Nie wczytano postępu. Wybierz plik .json zapisany przez Pracownię HTML (do 8 MB).'); }
};
$('#theme').onclick=()=>{document.body.classList.toggle('dark');try{localStorage.setItem('html-theme',document.body.classList.contains('dark')?'dark':'light');}catch{}};
$('#toggle-menu').onclick=()=>{$('#toggle-menu').setAttribute('aria-expanded',String(document.body.classList.toggle('menu-open')));};
$('#cheatsheet').onclick=()=>modal('Mała ściąga HTML',`<p>Znacznik otwierający → treść → znacznik zamykający. Przykład: <code>&lt;p&gt;Cześć!&lt;/p&gt;</code></p><table><tr><th>Element</th><th>Do czego służy?</th></tr>${[['h1 / h2','Główny nagłówek / śródtytuł'],['p','Akapit'],['strong / em','Ważna treść / nacisk'],['ul / ol / li','Lista punktowana / numerowana / punkt'],['img src="park.svg" alt="Opis"','Obraz i jego opis; img nie ma zamknięcia'],['a href="https://zpe.gov.pl/"','Odsyłacz; opis wpisujesz przed </a>'],['table / tr / th / td','Tabela / wiersz / nagłówek / komórka'],['header / main / footer','Wprowadzenie / główna treść / stopka'],['title','Tytuł karty przeglądarki, wewnątrz head'],['style="color: teal;"','Kolor tekstu za pomocą CSS']].map(r=>`<tr><td><code>${escapeHTML(r[0])}</code></td><td>${escapeHTML(r[1])}</td></tr>`).join('')}</table><p>Nie wszystkie elementy są widoczne: title widzisz nad podglądem. Sam Enter nie tworzy akapitu. Wielkość liter w nazwach znaczników HTML nie ma znaczenia; dla czytelności pisz małymi.</p>`);
$('#teacher').onclick=()=>modal('Jak pracować z klasą od zera',`<p><strong>18 krótkich ćwiczeń i projektów.</strong> Najpierw pokaż zmianę jednego znacznika na projektorze, potem pozwól uczniom samodzielnie wpisać kod. Podgląd aktualizuje się podczas pisania; „Sprawdź” porównuje strukturę z celami.</p><h3>Propozycja trzech lekcji</h3><ol><li><strong>Lekcja 1:</strong> ćwiczenia 1–6. Główny nacisk: znaczniki, akapity, zagnieżdżanie, title i body. Zakończ pobraniem HTML i otwarciem pliku.</li><li><strong>Lekcja 2:</strong> ćwiczenia 7–10 i 12. Listy, obraz z alt, odsyłacz i tabela. Dla szybszych: ćwiczenie 11.</li><li><strong>Lekcja 3:</strong> wybierz jeden projekt 16 lub 17. Praca w parach, test i omówienie. Ćwiczenia 13–15 oraz projekt 18 stanowią rozszerzenie.</li></ol><p>Cały zestaw jest bankiem zadań, nie obowiązkową listą do ukończenia w 135 minut. Dostosuj tempo do klasy. Czasy przy zadaniach są orientacyjne.</p><h3>Informacja zwrotna</h3><p>Sprawdzarka ocenia obecność elementów, wybrane atrybuty i kolejność znaczników. Nie ocenia sensu tekstu, jakości opisów alt, wyglądu ani oryginalności. To nie jest pełny walidator standardu HTML ani system ocen. Jawne zamknięcia są tutaj wymaganiem dydaktycznym, choć standard HTML dopuszcza pominięcie niektórych.</p><h3>Prace uczniów</h3><p>Kod i postęp zapisują się tylko w tej przeglądarce. Nie zbieramy nazwisk ani nie wysyłamy kodu do Firebase. Sesja trwa 45 minut od rozpoczęcia. Odświeżenie nie wydłuża czasu. Przycisk „Nowy uczeń” pozwala wcześniej zwolnić stanowisko. Uczeń może wyeksportować JSON i pobrać HTML do przekazania nauczycielowi.</p><h3>Podgląd i eksport</h3><p>Ramka blokuje skrypty, formularze i połączenia zewnętrzne. Korzystamy z dołączonej ilustracji park.svg. Linki HTTPS są aktywne dopiero w pobranym HTML; kotwice działają w podglądzie. Eksport zawiera obraz oraz pomocniczy styl pracowni, więc działa samodzielnie. Zewnętrzne obrazy i osadzenia są pomijane.</p><h3>Podstawa opracowania</h3><p>Autorskie ćwiczenia opracowano na podstawie zakresu dostarczonych scenariuszy 2.1 i 2.2, karty pracy, rozkładu, wymagań edukacyjnych klasy 7 i programu „Lubię to!” (2024). Nie są kopiami ćwiczeń wydawcy. HTML5 i semantyczne znaczniki uzupełniono o aktualne dobre praktyki; kolorowanie przez przestarzały bgcolor zastąpiono CSS.</p><p><a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax" target="_blank" rel="noopener noreferrer">Dokumentacja podstaw HTML — MDN</a> · <a href="https://pl.khanacademy.org/computing/computer-programming/html-css/intro-to-html/pt/html-basics" target="_blank" rel="noopener noreferrer">Podstawy HTML — Khan Academy</a></p>`);
document.querySelector('.skip').onclick=e=>{e.preventDefault();$('#code').focus();};
window.addEventListener('hashchange',openLesson);openLesson();labSession.check();
$('#export-now').onclick=()=>$('#backup').click();
$('#new-student').onclick=()=>{
  modal('Przekazać stanowisko?', '<p>Kod i postęp tej sesji znikną ze wszystkich kart pracowni. Jeśli chcesz wrócić do zadań, najpierw wybierz „Eksportuj prace”.</p><button id="cancel-session">Wróć do pracy</button> <button class="primary" id="confirm-session">Zacznij nową sesję</button>');
  $('#cancel-session').onclick=()=>$('#modal').close();
  $('#confirm-session').onclick=labSession.restart;
};
// W przeglądarce otwiera się gotowa strona; pracownia odzyskuje dokładny kod ucznia.
function exportPage(source) {
  const bytes = new TextEncoder().encode(source);
  const payload = btoa(Array.from(bytes, b => String.fromCharCode(b)).join(''));
  return cleanDocument(source,false).html + '\n<!--pracownia-html:source:v1:' + payload + '-->';
}
$('#upload-html').onclick = () => $('#html-file').click();
$('#html-file').onchange = async e => {
  const file = e.target.files[0], lesson = current, editor = $('#code');
  e.target.value = '';
  if (!file) return;
  try {
    if (!/\.html?$/i.test(file.name)) throw Error('Wybierz plik z końcówką .html lub .htm.');
    // Obraz w gotowej stronie może być duży. Do odzyskania kodu wystarczy końcówka pliku.
    const tail = await file.slice(-180000).text();
    const match = /\n<!--pracownia-html:source:v1:([A-Za-z0-9+/=]*)-->\s*$/.exec(tail);
    if (!match && file.size > 120000) throw Error('Ten plik jest za duży. Edytor mieści 30 000 znaków.');
    const source = match ? new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(atob(match[1]), c => c.charCodeAt(0))) : await file.text();
    if (source.length > editor.maxLength) throw Error('Edytor mieści 30 000 znaków. Wybierz krótszy plik.');
    if (!labSession.check() || current !== lesson) return;
    modal('Wczytać kod do tego ćwiczenia?', '<p>Plik <strong id="incoming-file"></strong> zastąpi kod w ćwiczeniu „<span id="incoming-lesson"></span>”. Inne zadania pozostaną bez zmian.</p><button id="cancel-html">Anuluj</button> <button id="accept-html" class="primary">Wczytaj kod</button>');
    $('#incoming-file').textContent = file.name;
    $('#incoming-lesson').textContent = lesson.title;
    $('#cancel-html').onclick = () => $('#modal').close();
    $('#accept-html').onclick = () => {
      $('#modal').close();
      if (!labSession.check() || current !== lesson) return;
      editor.value = source;
      editor.dispatchEvent(new Event('input'));
      editor.focus();
      toast('Wczytano kod. Możesz go zmieniać i sprawdzić zadanie.');
    };
  } catch (err) { toast('Nie wczytano kodu. ' + err.message); }
};