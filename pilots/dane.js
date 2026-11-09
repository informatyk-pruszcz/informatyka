'use strict';
const dataExercises=[
 ['Budżet wycieczki','Oblicz łączny koszt transportu i biletów dla grupy.','Zwiększ liczbę osób o dwie. Opisz, które koszty zależą od liczby osób.','topic-6-2-1'],
 ['Jedna stawka w wielu wierszach','Pomnóż ilość przez stałą z E2. Dodaj wyniki.','Wpisz w C2 formułę =B2*$E$2. Skopiuj ją i zmień stawkę. Co stało się z sumą?','topic-8-1-2'],
 ['Ranking po zmianie rekordu','Posortuj wyniki malejąco. Następnie zmień wynik ostatniej drużyny zgodnie z poleceniem.','Dodaj drużynę z wynikiem równym liderowi. Ustal, jak zapisać remis.','topic-6-2-2'],
 ['VAT po dwóch filtrach','Uwzględnij tylko sklep A i stawkę 23%. Zsumuj podatek osobno dla każdej kategorii.','W Excelu dodaj filtr sklepu B. Porównaj obie sumy i zapisz wniosek.','karta-8-1-misja-vat'],
 ['Wykres dla rady klasy','Porównaj liczbę głosów na trzy pomysły. Wybierz wykres i oblicz różnicę skrajnych wyników.','Wstaw wykres w Excelu. W podpisie porównaj dwie kategorie i podaj obie liczby.','topic-8-1-3']
].map(([title,goal,transfer,lesson])=>({title,goal,transfer,lesson}));
function dataset(i,seed) {
  const rng=random(seed+1009*i),r=()=>1+Math.floor(rng()*10), k=r(), a=r(), b=r();
  if(i===0){const n=15+a,price=8+b,bus=150+seed%31;
    return {headers:['Wydatek','Ilość','Cena jednostkowa (zł)'],rows:[['Autobus',1,bus],['Bilety',n,price]],ask:'Koszt całej wycieczki w zł',answer:bus+n*price,hint:'Pomnóż ilość przez cenę w każdym wierszu. Dodaj oba koszty.'}}
  if(i===1){const rate=(100+seed%100)/100,qty=[a,b,k];return {headers:['Produkt','Ilość','Koszt (zł)','', 'Stawka (zł)'],rows:['Kartki','Naklejki','Koperty'].map((t,j)=>[t,qty[j],'','',j?'':rate]),ask:'Suma kosztów w zł',answer:Math.round(qty.reduce((x,y)=>x+y,0)*rate*100)/100,hint:'Przy kopiowaniu zablokuj adres komórki ze stawką: $E$2.'}}
  if(i===2){const scores=[60+a,45+b,21+k];const newScore=58+seed%14;
    return {headers:['Drużyna','Punkty'],rows:['Sowy','Lisy','Rysie'].map((t,j)=>[t,scores[j]]),note:'Zastąp wynik drużyny Rysie liczbą '+newScore+'.',ask:'Największa liczba punktów po zmianie',answer:Math.max(scores[0],scores[1],newScore),hint:'Zmień jeden rekord i ponownie posortuj całe wiersze.'}}
  if(i===3){const rows=[['Sport','A',23,a+5],['Gry','A',23,b+3],['Sport','B',23,80],['Gry','A',8,50],['Gry','A',23,k+1],['Sport','A',23,2]];
    const sums={};rows.filter(row=>row[1]==='A'&&row[2]===23).forEach(([cat,,,vat])=>sums[cat]=(sums[cat]||0)+vat);
    return {headers:['Kategoria','Sklep','VAT (%)','Kwota VAT (zł)'],rows,ask:'Największa suma VAT w jednej kategorii (zł)',answer:Math.max(...Object.values(sums)),note:'W swoim wniosku podaj nazwę kategorii z największym VAT. W razie remisu podaj obie.',hint:'Filtr sklepu i filtr stawki muszą działać równocześnie. Dodaj kwoty według kategorii.'}}
  const counts=[10+a,20+b,5+k];return {headers:['Pomysł','Głosy'],rows:['Kino','Park','Muzeum'].map((t,j)=>[t,counts[j]]),ask:'Różnica między największą i najmniejszą liczbą głosów',answer:Math.max(...counts)-Math.min(...counts),hint:'Znajdź najwyższą i najniższą kolumnę. Odejmij ich wartości.'};
}
function csvCell(v){const t=typeof v==='number'?String(v).replace('.',','):String(v);return '"'+t.replaceAll('"','""')+'"'}
pilots.dane={name:'Zadania na danych w Excelu',tasks:dataExercises,render(i){
  const s=state();s.seed??=17;const data=dataset(i,s.seed);
  $('#activity').innerHTML='<p>Zestaw '+s.seed+'. Pobierz dane i otwórz je w Excelu. Przy imporcie wybierz separator średnik.</p>'
    +table(data.headers,data.rows)+(data.note?'<p>'+escapeText(data.note)+'</p>':'')+'<div class="actions"><button id="csv">Pobierz dane CSV</button><button id="variant">Kolejny zestaw</button><a href="../#item/topic-8-1-2">Jak działa adresowanie?</a></div>'
    + field('forecast','Co przewidujesz przed obliczeniem?')+field('answer',data.ask)
    +(i===4?'<label>Wykres do porównania pomysłów <select id="chart">'+options([['','Wybierz'],['column','Kolumnowy'],['bar','Słupkowy'],['line','Liniowy']],s.chart)+'</select></label>':'')
    +'<button class="primary" id="verify">Sprawdź wynik</button>';
  $('#csv').onclick=()=>downloadable('dane-'+(i+1)+'-'+s.seed+'.csv','\ufeff'+[data.headers,...data.rows].map(row=>row.map(csvCell).join(';')).join('\r\n'),'text/csv;charset=utf-8');
  $('#variant').onclick=()=>{s.seed++;s.answer='';s.forecast='';s.reflection='';delete s.result;refresh()};
  if(i===4)$('#chart').onchange=e=>{s.chart=e.target.value;saveDraft()};
  $('#verify').onclick=()=>{const raw=(s.answer||'').trim().replace(',','.');
    if(!/^-?\d+(\.\d+)?$/.test(raw)||Math.abs(Number(raw)-data.answer)>.000001){message(data.hint);return}
    if(i===4&&!['column','bar'].includes(s.chart)){message('Poszukaj wykresu, który porówna kategorie bez sugerowania przebiegu w czasie.');return}
    outcome('Zestaw '+s.seed+'. Przewidywanie: '+(s.forecast||'pominięte')+'. Wynik: '+data.answer.toLocaleString('pl-PL')+'. Uzasadnij go dwiema liczbami. Skoroszyt i wniosek omów z nauczycielem.');};
}};