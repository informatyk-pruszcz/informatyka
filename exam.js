// Wspólne hasło organizuje dostęp na lekcji. To nie jest system egzaminacyjny.
export const EXAM_ID='system-excel8-access';
const bytes=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const b64=a=>btoa(String.fromCharCode(...new Uint8Array(a)));
async function passwordKey(password,salt){
 const base=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveKey']);
 return crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes(salt),iterations:210000,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
export async function unlock(password,config){return crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(config.iv)},await passwordKey(password,config.salt),bytes(config.data));}
export async function changePassword(oldPassword,newPassword,config){
 const raw=await unlock(oldPassword,config),salt=b64(crypto.getRandomValues(new Uint8Array(16))),iv=crypto.getRandomValues(new Uint8Array(12));
 const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv},await passwordKey(newPassword,salt),raw);
 return {version:1,round:crypto.randomUUID(),salt,iv:b64(iv),data:b64(encrypted)};
}
export async function configFrom(items){
 const saved=items?.find(i=>i.id===EXAM_ID);
 const c=saved?JSON.parse(saved.body):await fetch('./sprawdziany/default.json').then(r=>{if(!r.ok)throw Error();return r.json();});
 if(c.version!==1||!['round','salt','iv','data'].every(k=>typeof c[k]==='string'))throw Error('Nieprawidłowa konfiguracja sprawdzianu.');
 return c;
}
export function examPage(){return `<a class="text-link" href="#class/8">← Klasa 8</a><section class="exam-card"><span class="eyebrow">KLASA 8 · MICROSOFT EXCEL</span><h1>Sprawdzian wiadomości</h1><p>Wpisz hasło od nauczyciela. Następnie wylosuj swoją grupę i pobierz arkusz.</p><ol class="exam-steps"><li>Wpisz hasło</li><li>Wylosuj grupę</li><li>Pobierz plik</li></ol><div id="exam-content"><p role="status">Sprawdzam aktualne ustawienia…</p><button class="btn" onclick="location.reload()">Odśwież połączenie</button></div><p class="muted">Pracuj samodzielnie. Przeczytaj polecenia w pobranym arkuszu.</p></section>`;}
export async function mountExam(host,items){
 try{
 const config=await configFrom(items);if(!host.isConnected)return;
 host.innerHTML='<form id="exam-login"><label for="exam-password">Hasło do sprawdzianu</label><div class="actions"><input id="exam-password" type="password" required autocomplete="off" maxlength="128"><button class="btn primary">Przejdź do losowania →</button></div></form><p id="exam-status" role="status"></p><div id="exam-result"></div>';
 const form=host.querySelector('form'),status=host.querySelector('#exam-status'),result=host.querySelector('#exam-result');
 form.onsubmit=async e=>{
 e.preventDefault();const button=form.querySelector('button');button.disabled=true;status.textContent='Sprawdzam hasło…';
 try{
 const raw=await unlock(form.querySelector('input').value,config),key=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']);
 if(!host.isConnected)return;form.reset();form.hidden=true;status.textContent='Hasło poprawne. Możesz wylosować grupę.';
 const storageKey='excel8-group-'+config.round;let group;
 try{group=sessionStorage.getItem(storageKey);}catch{}
 async function show(){
 result.innerHTML='<h2>Twoja grupa: '+group+'</h2><p>Grupa pozostaje taka sama po odświeżeniu tej karty.</p><button class="btn primary" id="exam-download">↓ Pobierz arkusz — grupa '+group+'</button><p class="exam-luck">Powodzenia na sprawdzianie! 🍀</p><button class="btn" id="exam-new">Nowy uczeń na stanowisku</button>';
 result.querySelector('#exam-new').onclick=()=>{if(confirm('Rozpocząć pracę nowego ucznia? Zostanie usunięty przydział grupy w tej karcie.')){try{sessionStorage.removeItem(storageKey);}catch{}mountExam(host,items);}};
 result.querySelector('#exam-download').onclick=async event=>{
 const b=event.currentTarget;b.disabled=true;status.textContent='Przygotowuję plik…';
 try{const response=await fetch('./sprawdziany/grupa-'+group+'.json');if(!response.ok)throw Error();const encrypted=await response.json();
 const content=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(encrypted.iv)},key,bytes(encrypted.data));
 const url=URL.createObjectURL(new Blob([content],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})),a=document.createElement('a');a.href=url;a.download='Sprawdzian_Excel_Klasa8_Grupa_'+group+'_Uczen.xlsx';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);status.textContent='Plik jest gotowy. Otwórz pobrany arkusz w Excelu. Powodzenia!';
 }catch{status.textContent='Nie udało się pobrać pliku. Sprawdź połączenie i spróbuj ponownie.';}finally{b.disabled=false;}
 };
 }
 if(['A','B','C'].includes(group))show();else{
 result.innerHTML='<button class="btn primary" id="exam-draw">✦ Losuję swoją grupę</button>';
 result.querySelector('button').onclick=()=>{let n;do{n=crypto.getRandomValues(new Uint8Array(1))[0];}while(n===255);group=['A','B','C'][n%3];try{sessionStorage.setItem(storageKey,group);}catch{}show();};
 }
 }catch{status.textContent='Hasło nie pasuje. Sprawdź zapis lub poproś nauczyciela o aktualne hasło.';}finally{button.disabled=false;}
 };
 }catch{host.textContent='Nie udało się wczytać sprawdzianu. Odśwież stronę i sprawdź połączenie.';}
}
export function teacherExam(){return `<section class="cloud-box"><h3>Sprawdzian Excel — klasa 8</h3><p>Zmiana hasła rozpoczyna nową turę losowania. Zapis obowiązuje od razu na stronie uczniów.</p><form id="exam-settings"><label>Obecne hasło sprawdzianu <input name="old" type="password" required autocomplete="off"></label><label>Nowe hasło (minimum 8 znaków) <input name="next" type="password" required minlength="8" maxlength="128" autocomplete="new-password"></label><label>Powtórz nowe hasło <input name="repeat" type="password" required minlength="8" maxlength="128" autocomplete="new-password"></label><button class="btn primary">Zmień hasło dla wszystkich uczniów</button></form><p id="exam-settings-status" role="status"></p><p class="muted">To wspólne hasło na lekcję, bez kont uczniów. Nie gwarantuje równej liczby osób w grupach. Zmiana hasła nie odbiera pobranych plików ani kopii poprzednich ustawień. Przy poufnym kolejnym sprawdzianie przygotuj nowe pliki.</p><a class="text-link" href="#class/8/exam">Otwórz stronę ucznia →</a></section>`;}
