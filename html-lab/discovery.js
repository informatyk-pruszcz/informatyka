// Krótkie próby przed właściwym zadaniem. Przykład nigdy nie zmienia pracy ucznia.
const discoveries = {
  'pierwszy-naglowek':['<h1>Klub robotów</h1>', 'p','h1','Co zmieni się po zamianie h1 na p?', ['Tekst stanie się akapitem.', 'Znikną słowa „Klub robotów”.'],0,'Znaczniki określają rolę tekstu. Słowa między nimi pozostają te same.'],
  'akapity':['<p>Start. Meta.</p>', 'Start. Meta.','Start.</p><p>Meta.','Co zobaczysz po rozdzieleniu tekstu parą </p><p>?',['Dwa osobne akapity.','Znaki </p> na stronie.'],0,'Pierwszy akapit się kończy, a drugi zaczyna.'],
  'hierarchia':['<h1>Gazetka</h1><h1>Sport</h1>', '<h2>Sport</h2>','<h1>Sport</h1>','Zmień drugi h1 na h2. Który tekst będzie śródtytułem?',['Gazetka','Sport'],1,'Gazetka ma główny nagłówek. Sport jest jej działem.'],
  'wyroznienia':['<p>Przynieś notes.</p>','notes','<strong>notes</strong>','Które słowa wyróżni znacznik strong wokół słowa „notes”?',['Cały akapit.','Tylko „notes”.'],1,'Wyróżnienie obejmuje tekst między <strong> i </strong>.'],
  'lista-punktowana':['<ul><li>Mapa</li><li>Woda</li></ul>','ol','ul','Zamień ul na ol na początku i końcu. Co się zmieni?',['Kolejność słów.','Punkty zmienią się w numery.'],1,'Elementy li zostają na miejscu. Rodzaj listy określa ich oznaczenia.'],
  'obraz':['<img src="park.svg" alt="Ścieżka w parku">','park.svg','brak.svg','Czego dowiesz się z opisu alt, gdy zabraknie pliku?',['Co przedstawiał obraz.','Ile ważył plik.'],0,'Opis zastępuje informację z obrazu, gdy nie można go zobaczyć.'],
  'link':['<a href="https://zpe.gov.pl/">Odwiedź portal</a>','Odwiedź portal','Materiały do nauki','Zmieniasz słowa między <a> i </a>. Co pozostanie takie samo?',['Napis na stronie.','Adres, do którego prowadzi link.'],1,'Cel linku zapisujesz w href. Napis umieszczasz między znacznikami.']
};
function showDiscovery(id) {
  const panel = document.querySelector('#discovery'), item = discoveries[id];
  panel.hidden = !item; panel.open = false;
  if (!item) return;
  const [before,a,b,question,choices,correct,explanation] = item;
  const [from,to] = ['pierwszy-naglowek','hierarchia','lista-punktowana'].includes(id) ? [b,a] : [a,b];
  const after = before.replaceAll(from,to);
  panel.innerHTML = '<summary>Mały eksperyment: przewidź efekt</summary><p></p><pre></pre><div class="choices"></div><p role="status"></p><div class="sample" hidden></div>';
  const [prompt,feedback] = panel.querySelectorAll('p');
  prompt.textContent = question;
  panel.querySelector('pre').textContent = after;
  const sample = panel.querySelector('.sample');
  choices.forEach((label,i) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.onclick = () => {
      if (i !== correct) { feedback.textContent = 'Spróbuj jeszcze raz. Porównaj obie wersje kodu.'; panel.querySelector('pre').textContent = 'Przed:\n'+before+'\nPo:\n'+after; sample.hidden = true; return; }
      feedback.textContent = 'Tak! ' + explanation;
      sample.hidden = false;
      // Tylko nasze stałe przykłady; link ma tu pokazać wygląd napisu.
      sample.innerHTML = '<strong>Przed zmianą</strong><div>'+before+'</div><strong>Po zmianie</strong><div>'+after+'</div>';
      for (const link of sample.querySelectorAll('a')) link.onclick = e => e.preventDefault();
    };
    panel.querySelector('.choices').append(button);
  });
}