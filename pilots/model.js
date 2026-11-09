'use strict';
const modelTasks=[
 ['Nadaj etykiety','Obejrzyj dwa gatunki fikcyjnych roślin. Oznacz przykłady etykietą A lub B.','Narysuj dwie własne rośliny. Zastanów się, czy dwie cechy wystarczą do ich rozróżnienia.'],
 ['Sprawdź pięć nowych roślin','Przewidź liczbę trafień. Wytrenuj model i sprawdź pięć roślin testowych.','Wybierz pomyłkę i znajdź najbliższego sąsiada w tabeli treningowej.'],
 ['Usuń przykłady jednej klasy','Zapisz pierwszą próbę, wyłącz rośliny klasy B i ponownie trenuj.','Porównaj osobno błędy klasy A oraz B. Czy ogólna liczba trafień opowiada całą historię?'],
 ['Znajdź odwróconą etykietę','Roślina T4 została omyłkowo opisana jako A. Zbadaj skutek przed poprawką i po niej.','Czy poprawienie etykiety zawsze poprawi wynik? Wskaż, które rośliny testowe mogły na nią zareagować.'],
 ['Przypadek na granicy','Roślina P3 ma sąsiadów po obu stronach. Sprawdź wpływ zmiany zbioru treningowego.','Zaproponuj nową cechę, którą można zmierzyć. Jak sprawdzisz, czy rzeczywiście pomaga?']
].map(([title,goal,transfer])=>({title,goal,transfer,lesson:'topic-6-1-4'}));
const training=[[2,3,'A'],[3,2,'A'],[4,3,'A'],[6,5,'B'],[7,5,'B'],[8,6,'B']];
const testing=[[2,2,'A'],[3,4,'A'],[5,4,'B'],[6,4,'B'],[8,5,'B']];
function nearest(trainingRows,labels,enabled,testRows) {
  return testRows.map(([x,y,truth])=>{
    const nearest=trainingRows.map(([tx,ty],i)=>({i,d:(x-tx)**2+(y-ty)**2})).filter(v=>enabled[v.i]).sort((a,b)=>a.d-b.d||a.i-b.i)[0];
    return {x,y,truth,from:nearest.i,guess:labels[nearest.i]};
  });
}
pilots.model={name:'Jak model uczy się z przykładów',tasks:modelTasks,render(i){
  const s=state();s.deck??=0;s.labels??=training.map((r,j)=>i===3&&j===3?'A':r[2]);s.enabled??=training.map(()=>true);
  // Obydwie cechy są liczbami w tej samej skali. Zestaw testowy pozostaje stały między treningami.
  const transform=([x,y,t])=>s.deck%2?[10-y,10-x,t]:[x,y,t];
  const learn=training.map(transform),test=testing.map(transform);
  const rows=learn.map(([x,y],j)=>'<tr><th scope="row">T'+(j+1)+'</th><td>'+x+'</td><td>'+y+'</td><td><select aria-label="Etykieta T'+(j+1)+'" data-label="'+j+'">'+options([['A','A'],['B','B']],s.labels[j])+'</select></td><td><input type="checkbox" aria-label="Użyj T'+(j+1)+'" data-enable="'+j+'" '+(s.enabled[j]?'checked':'')+'></td></tr>').join('');
  $('#activity').innerHTML='<p>Każdy przykład ma liczbę liści i płatków w tej samej skali. Model wybiera etykietę najbliższego wiersza. Przy remisie wybiera niższy numer T.</p><h3>Dane do treningu</h3><div class="scroll"><table><thead><tr><th>Roślina</th><th>Liście</th><th>Płatki</th><th>Etykieta</th><th>Użyj</th></tr></thead><tbody>'+rows+'</tbody></table></div>'
    +'<h3>Stałe dane do testu · talia '+(1+s.deck%2)+'</h3>'+table(['Roślina','Liście','Płatki','Znana klasa'],test.map(([x,y,t],j)=>['P'+(j+1),x,y,t]))
    +field('forecast','Ile roślin model oznaczy poprawnie?')
    +'<button id="train" class="primary">Trenuj i sprawdź</button> <button id="deck">Zmień talię i rozpocznij porównanie</button><div id="runs"></div><p>Ten model korzysta z odległości między dwiema liczbami. Nie rozpoznaje zdjęć ani nazw roślin.</p>';
  document.querySelectorAll('[data-label]').forEach(el=>el.onchange=()=>{s.labels[Number(el.dataset.label)]=el.value;saveDraft()});
  document.querySelectorAll('[data-enable]').forEach(el=>el.onchange=()=>{s.enabled[Number(el.dataset.enable)]=el.checked;saveDraft()});
  const draw=()=>{
    const runs=s.runs||[];
    $('#runs').innerHTML=runs.map((run,j)=>'<details '+(j===runs.length-1?'open':'')+'><summary>Próba '+run.number+' · trafienia '+run.hits+'/5</summary><p>'+escapeText(run.settings)+'</p>'+table(['Test','Najbliższa','Przewidywana','Znana','Wynik'],run.rows.map((v,k)=>['P'+(k+1),'T'+(v.from+1),v.guess,v.truth,v.guess===v.truth?'trafienie':'pomyłka']))+'</details>').join('');
  };
  $('#train').onclick=()=>{
    if(!s.enabled.some(Boolean)){message('Włącz przynajmniej jeden przykład do treningu.');return}
    const rows=nearest(learn,s.labels,s.enabled,test),hits=rows.filter(v=>v.guess===v.truth).length;
    const settings=s.labels.flatMap((l,j)=>s.enabled[j]?['T'+(j+1)+'='+l]:[]).join(', ');
    const errors=['A','B'].map(c=>c+': '+rows.filter(v=>v.truth===c&&v.guess!==c).length).join(', ');
    const last=s.runs?.at(-1),number=(last?.number||0)+1;
    s.runs=[...(last?[last]:[]),{rows,hits,settings,number}];draw();
    outcome('Talia '+(1+s.deck%2)+'. '+(last?'Poprzednio '+last.hits+'/5, teraz ':'Trafienia: ')+hits+'/5. Pomyłki według rzeczywistej klasy: '+errors+'. Przewidywanie: '+(s.forecast||'pominięte')+'. '+settings);
  };
  $('#deck').onclick=()=>{s.deck++;s.runs=[];s.forecast='';s.labels=training.map((r,j)=>i===3&&j===3?'A':r[2]);s.enabled=training.map(()=>true);delete s.result;refresh()};draw();
}};