'use strict';
const algorithmTasks=[
  ['Dzielenie z resztą','Sprawdź, ile pełnych grup powstanie z 18 elementów.','18, 6','a, b → iloraz = a // b → reszta = a % b','wynik','Sprawdź w Pythonie 18 // 6 i 18 % 6. Powtórz dla 19 i 6. Opisz, co się zmieniło.'],
  ['Czynniki pierwsze','Rozłóż 60 na czynniki. Zapisuj dzielnik i liczbę pozostałą po podziale.','60','d = 2\ndopóki n > 1: jeśli n % d == 0, podziel n przez d i zapisz d; inaczej zwiększ d o 1','pozostało','Napisz pętlę w Pythonie. Sprawdź liczbę pierwszą 13 i liczbę 1.'],
  ['Największy wspólny dzielnik','Przewiduj nową wartość b po każdym kroku algorytmu Euklidesa.','48, 18','dopóki b ≠ 0: (a, b) = (b, a % b)\nwynik = a','b','Uruchom swój program w Pythonie dla 24 i 24 oraz dla 24 i 0. Zapisz wyniki.'],
  ['Wyszukiwanie z duplikatami','Znajdź pierwszą pozycję szukanej liczby. Indeksy zaczynają się od zera.','2, 2, 5, 9','wynik = −1\ndla każdego indeksu: jeśli element == cel, zapisz indeks i zakończ','indeks sprawdzany','W Pythonie przetestuj listę pustą, duplikaty i brak wyniku. Porównaj dwa sposoby szukania.'],
  ['Napraw ostatnie porównanie','Sprawdź, co się stanie, gdy pętla pominie ostatnią liczbę. Potem popraw granicę.','7, 4, 1','dla i od 0 do n−2: znajdź indeks minimum w zakresie [i, koniec); zamień elementy','minimum','Zapisz sortowanie przez wybór w Pythonie. Przetestuj listę posortowaną, odwróconą i z duplikatami.']
].map(([title,goal,example,code,variable,transfer],i)=>({title,goal,example,code,variable,transfer,lesson:'topic-8-2-'+(i+1)}));

function algorithmTrace(i,values,target,fix=true) {
  const states=[];
  const add=(action,data,predict)=>states.push({action,data,predict});
  const [a,b]=values;
  if(i===0){add('Oblicz pełne grupy',a+' // '+b,Math.floor(a/b)); add('Policz resztę',a+' % '+b,a%b);}
  if(i===1){
    let n=a,d=2; const factors=[];
    while(n>1){
      if(n%d===0){const before=n; factors.push(d); n/=d; add('Dopisz czynnik '+d,before+' ÷ '+d+' · czynniki: '+factors.join(' × '),n);}
      else {d++;} // Pośrednie próby bez podziału nie zmieniają rozkładu.
    }
    if(a===1)add('Liczba 1 ma pusty rozkład','Brak czynników pierwszych',1);
  }
  if(i===2){let x=a,y=b;while(y){const r=x%y;add('Zastąp parę ('+x+', '+y+')','nowe a = '+y+', nowe b = '+x+' % '+y,r);[x,y]=[y,r];}if(!states.length)add('Pętla kończy się od razu','b = 0, NWD = '+x,0);states.at(-1).data+=' · NWD = '+x;}
  if(i===3){
    let index=-1;
    for(let j=0;j<values.length;j++){const yes=values[j]===target;add('Sprawdź indeks '+j,values[j]+(yes?' = ':' ≠ ')+target,j);if(yes){index=j;break}}
    if(!states.length)add('Lista jest pusta','Brak sprawdzanego indeksu',-1);
    states.at(-1).data+=' · wynik = '+index;
  }
  if(i===4){
    const arr=[...values];
    for(let j=0;j<arr.length-1;j++){
      let min=j;
      for(let k=j+1;k<arr.length-(fix?0:1);k++)if(arr[k]<arr[min])min=k;
      const value=arr[min];[arr[j],arr[min]]=[arr[min],arr[j]];add('Ustaw pozycję '+j,'minimum = '+value+' · lista: '+arr.join(', '),value);
    }
    if(!states.length)add('Lista już uporządkowana','Lista: '+arr.join(', '),arr[0]??0);
  }
  return states;
}

function parseAlgInput(i,text,target) {
  const v=text.trim()===''?[]:text.split(',').map(n=>n.trim()!==''?Number(n):NaN);
  if(v.length>12||v.some(n=>!Number.isInteger(n)||n<0||n>1000))throw Error('Wpisz najwyżej 12 liczb całkowitych od 0 do 1000, oddzielając je przecinkami.');
  if(i===0 && (v.length!==2||v[1]===0))throw Error('Podaj dwie liczby. Druga musi być większa od zera.');
  if(i===1 && (v.length!==1||v[0]<1))throw Error('Podaj jedną liczbę od 1 do 1000.');
  if(i===2 && (v.length!==2 || v.every(n=>n===0)))throw Error('Podaj dwie liczby, w tym przynajmniej jedną dodatnią.');
  if(i===3 && (!String(target).trim()||!Number.isInteger(Number(target))))throw Error('Podaj szukaną liczbę całkowitą.');
  if(i===4 && v.length===0)throw Error('Podaj przynajmniej jedną liczbę.');
  return v;
}
pilots.algorytmy={
  name:'Laboratorium algorytmów',tasks:algorithmTasks,
  render(i,task) {
    const s=state();s.values??=task.example;s.target??='4';s.step??=0;s.fixed??='short';
    s.seed??=0;
    $('#activity').innerHTML=field('values','Dane wejściowe (liczby oddziel przecinkami)',task.example)
      +(i===3?field('target','Szukana liczba','4'):'')
      +(i===4?'<label>Granica przeszukiwania <select id="bound">'+options([['short','n − 1 (pomiń ostatni element)'],['full','n (uwzględnij ostatni element)']],s.fixed)+'</select></label>':'')
      +'<button id="variant">Zmień przykład</button> <button id="start">Uruchom od początku</button>'
      +'<p>Numer wariantu: '+s.seed+'</p><pre>'+escapeText(task.code)+'</pre><div id="trace"></div>';
    const run=(reset=false)=>{
      let steps;
      try{steps=algorithmTrace(i,parseAlgInput(i,s.values,s.target),Number(s.target),s.fixed==='full')}catch(err){s.step=0;delete s.result;saveDraft();$('#trace').textContent='';message(err.message);return}
      if(reset){s.step=0;s.prediction='';delete s.result;saveDraft()}s.step=Math.min(s.step,steps.length);
      const current=steps[s.step];
      $('#trace').innerHTML=table(['Krok','Operacja','Stan po kroku'],steps.slice(0,s.step).map((v,j)=>[j+1,v.action,v.data+' · '+task.variable+' = '+v.predict]))
        +(current?'<p>Teraz: '+escapeText(current.action)+'.</p>'+field('prediction','Przewidź wartość „'+task.variable+'”','')+'<button id="predict">Przewidź</button> <button id="step">Krok →</button>':'<p>Ślad zakończony. Zmień dane i sprawdź własny przypadek.</p>')
        +' <button id="undo" '+(s.step?'':'disabled')+'>Cofnij krok</button>';
      if(current){
        $('#predict').onclick=()=>message(String(s.prediction??'').trim()!=='' && Number(s.prediction)===current.predict?'Zgadza się. Wybierz „Krok”, aby zobaczyć stan.':'Sprawdź działanie „'+current.action+'”. Użyj danych z ostatniego widocznego kroku.');
        $('#step').onclick=()=>{if(!String(s.prediction??'').trim()){message('Wpisz przewidywanie, a potem wybierz „Krok”.');return}
          const guess=s.prediction;s.step++;s.prediction='';saveDraft();run();
          const text='Przewidywanie: '+guess+'. '+task.variable+' = '+current.predict+'. '+current.data;
          if(s.step===steps.length)outcome('Dane: '+s.values+'. '+text);else message(text);};
      }
      $('#undo').onclick=()=>{s.step--;delete s.result;s.prediction='';saveDraft();message('Cofnięto krok.');run()};
    };
    $('#values').oninput=()=>{s.values=$('#values').value;run(true)};
    if(i===3)$('#target').oninput=()=>{s.target=$('#target').value;run(true)};
    if(i===4)$('#bound').onchange=e=>{s.fixed=e.target.value;run(true)};
    $('#start').onclick=()=>{message('');run(true)};
    $('#variant').onclick=()=>{s.seed++;
      const rng=random(7919*s.seed), number=()=>2+Math.floor(rng()*19);
      const a=number(),b=number();
      const examples=[a*b+(s.seed%2)+', '+b,String(a*b),s.seed%2?a+', '+a:a*b+', '+b,
        [a,a,b,a+b].join(', '),(s.seed%2?[a,a+b,a+b+1]:[a+b+1,a+b,a]).join(', ')];
      s.values=examples[i];if(i===3)s.target=String(s.seed%2?a:a+b+5);s.step=0;s.prediction='';delete s.result;refresh()};
    run();
  }
};