// Zachowujemy pozycje w oryginalnym tekście. DOM przeglądarki sam naprawia część błędów.
function scanSource(code) {
  const tokens = [], problems = [], stack = [];
  const single = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
  const pattern = /<!--[\s\S]*?(?:-->|$)|<(style|script)\b[^>]*>[\s\S]*?<\/\1\s*>|<!doctype\b[^>]*>|<\/?[a-z][\w:-]*(?:"[^"]*"|'[^']*'|[^<>"'])*(?:>|(?=<)|$)|<\/?[a-z][^<>]*/gi;
  const issue = (t,msg) => problems.push({...t,msg});
  for (const m of code.matchAll(pattern)) {
    const raw=m[0], head=/^<(\/?)([\w:-]+)/.exec(raw);
    if (!head || m[1]) continue;
    const tag=head[2].toLowerCase(), t={tag,raw,start:m.index,end:m.index+raw.length,closing:!!head[1]};
    tokens.push(t);
    if (!raw.endsWith('>') || /^(?:[^"']|"[^"]*"|'[^']*')*["'][^"']*$/.test(raw)) {
      issue(t,'Tu znacznik się urywa. Sprawdź końcowy > i parę cudzysłowów.'); continue;
    }
    if (single.has(tag)) { if(t.closing) issue(t,'Usuń to zamknięcie. Element <'+tag+'> nie ma pary zamykającej.'); continue; }
    if (!t.closing) {stack.push(t); continue;}
    const i=stack.map(x=>x.tag).lastIndexOf(tag);
    if(i<0) issue(t,'Ten koniec nie ma początku. Porównaj nazwę w '+raw+' z nazwą znacznika otwierającego.');
    else {
      if(i!==stack.length-1) issue(t,'Zanim wpiszesz '+raw+', zamknij wewnętrzny element <'+stack.at(-1).tag+'>.');
      stack.splice(i);
    }
  }
  for(const t of stack.reverse()) issue(t,'Tu zaczyna się <'+t.tag+'>. Po jego treści brakuje </'+t.tag+'>.');
  return {tokens,problems};
}

// Jeśli brakuje całego elementu, pokazujemy miejsce do dopisania, nie rzekomą literówkę.
function lessonSuggestions(code,lesson,result) {
  const {tokens,problems}=result.scan, items=[...problems];
  for(const [i,r] of lesson.rules.entries()) {
    if(result.results[i].ok) continue;
    const tag=r.selector.match(/[a-z][a-z0-9]*$/i)?.[0];
    const candidates=tokens.filter(t=>!t.closing && t.tag===tag);
    // Podobna nazwa sama nie jest błędem (np. h2). Szukamy tylko nieznanych elementów.
    const typo = !candidates.length && tag && tokens.find(x=>{
      if(x.closing || x.tag.includes('-') || !(document.createElement(x.tag) instanceof HTMLUnknownElement)) return false;
      const left=x.tag, right=tag;
      if(left.length===right.length)return [...left].filter((c,i)=>c!==right[i]).length===1;
      const [long,short]=left.length>right.length?[left,right]:[right,left];
      return long.length===short.length+1 && [...long].some((_,i)=>long.slice(0,i)+long.slice(i+1)===short);
    });
    if(typo){items.push({...typo,msg:'Czy chodziło Ci o <'+tag+'>? Porównaj nazwę na początku i na końcu elementu.'});continue;}
    let t;
    if(r.attr) t=candidates.find(t=>{
      const el=parseHTML(t.raw).querySelector(tag);
      if(!el)return false;
      if(r.attr==='css-color')return !el.style.color;
      const val=(el.getAttribute(r.attr)||'').trim();
      return r.value==='*'?!val:val!==r.value;
    });
    if(t) items.push({...t,msg:r.attr==='css-color'?'Sprawdź zapis koloru w atrybucie style.':'Sprawdź atrybut '+r.attr+' w tym znaczniku. '+r.label});
    else if(!problems.length) {
      const pos=tokens.find(t=>t.closing&&t.tag===(tag==='title'?'head':'body'))?.start??code.length;
      const found=candidates.find(x=>code.slice(x.end).trimStart().toLowerCase().startsWith('</'+tag+'>'));
      items.push(found?{...found,msg:'Między znacznikami brakuje treści. '+r.label}:{start:pos,end:pos,insert:true,msg:'Sprawdź cel: '+r.label+' Porównaj swój kod z przykładem.'});
    }
  }
  if(lesson.full&&!result.results[lesson.rules.length].ok) items.push({start:0,end:0,msg:'Sprawdź szkielet dokumentu: DOCTYPE, język pl, head, kodowanie UTF-8 i body.'});
  if(result.notes.some(n=>n.startsWith('W tym ćwiczeniu'))) items.push({msg:result.notes.at(-1)});
  return items;
}
let markedLines=new Set();
function paintNumbers() {
  const el=$('#code'), gutter=$('#line-numbers');
  gutter.innerHTML=el.value.split('\n').map((_,i)=>markedLines.has(i+1)?'<b class="issue-number">'+(i+1)+'</b>':String(i+1)).join('\n');
  gutter.scrollTop=el.scrollTop;
}
function drawConsole(code,lesson,result) {
  const items=lessonSuggestions(code,lesson,result);
  const box=$('#feedback');
  const row=p=>code.slice(0,p).split('\n').length;
  markedLines=new Set(items.filter(s=>s.start!=null).map(s=>row(s.start)));
  paintNumbers();
  box.innerHTML='<div class="feedback-box '+(result.ok?'':'warn')+'"><strong></strong><ol></ol></div>';
  box.querySelector('strong').textContent=result.ok?'✓ Kod przeszedł sprawdzenie. Obejrzyj efekt w podglądzie.':'Konsola podpowiedzi · zacznij od pierwszej wskazówki';
  for(const s of items.slice(0,6)) {
    const li=document.createElement('li'); box.querySelector('ol').append(li);
    if(s.start!=null){
      const btn=document.createElement('button');
      btn.textContent=(s.insert?'Miejsce do uzupełnienia · ':'')+'Wiersz '+row(s.start);
      btn.onclick=()=>{
        const el=$('#code'); el.focus(); el.setSelectionRange(s.start,s.end);
        el.scrollTop=Math.max(0,(row(s.start)-3)*parseFloat(getComputedStyle(el).lineHeight));
        $('#line-numbers').scrollTop=el.scrollTop;
      };
      li.append(btn,' ');
    }
    li.append(s.msg);
  }
  if(result.ok)box.querySelector('ol').remove();
}