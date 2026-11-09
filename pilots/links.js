'use strict';
(() => {
  const links = {};
  function add(ids,lab,step,label) {
    for(const id of ids) {
      (links[id]??=[]).push({lab,step,label});
    }
  }
  for(let step=1;step<=5;step++) add(['topic-8-2-'+step],'algorytmy',step,'Prześledź algorytm krok po kroku');
  add(['topic-4-2-3'],'siec',4,'Porównaj zdjęcie i nagłówek');
  add(['topic-4-2-2','topic-6-1-2','topic-7-1-3'],'siec',1,'Sprawdź podejrzaną wiadomość');
  add(['topic-4-2-4'],'siec',2,'Wybierz odbiorców zdjęcia');
  add(['topic-6-1-3'],'siec',5,'Sprawdź twierdzenie o zbiórce');
  add(['topic-6-1-4'],'model',1,'Wytrenuj model na przykładach');
  add(['topic-6-2-1','topic-6-2-3','karta-8-1-kosztorys-balu'],'dane',1,'Oblicz koszt wycieczki');
  add(['topic-8-1-1','topic-8-1-2','karta-8-1-rentownosc-excel'],'dane',2,'Skopiuj formułę ze stałą stawką');
  add(['topic-6-2-2','karta-6-2-2-porzadki'],'dane',3,'Sprawdź ranking po zmianie rekordu');
  add(['topic-8-1-4','karta-8-1-misja-vat','karta-8-1-tabele-przestawne'],'dane',4,'Zbadaj VAT po dwóch filtrach');
  add(['topic-6-2-4','topic-8-1-3'],'dane',5,'Porównaj wyniki na wykresie');
  add(['karta-4-1-urzadzenia-pliki','topic-4-1-2'],'pliki',1,'Poćwicz na wirtualnych folderach');
  window.pilotLinks = id => (links[id]||[]).map(({lab,step,label})=>'<p><a class="btn" href="pilots/index.html?z='+encodeURIComponent(id)+'#'+lab+'/'+step+'">'+label+' →</a></p>').join('');
})();