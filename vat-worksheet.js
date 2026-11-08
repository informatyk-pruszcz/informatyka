export const vatCard = {
  id: 'karta-8-1-misja-vat', type: 'task', grades: [8],
  title: 'Misja VAT — ile podatku kryje się w zakupach?',
  section: '1. Arkusz kalkulacyjny', tags: ['Excel','VAT','TabelePrzestawne','KartaPracy'],
  summary: 'Przeanalizuj 2000 zakupów. Zbuduj dwie tabele przestawne, wykres i dwa fragmentatory.',
  body: '<p>Pięć misji w Excelu na podstawie zakupów fikcyjnych nastolatków.</p>',
  source: 'Misja VAT • karta pracy i baza zakupów przekazane przez nauczyciela.'
};

const moneyAnswers = {brutto:59225.15, vat:9466.05, kwota1:857.32, kwota2:740.42, kwota3:723.78, filtr:250.86};
const textAnswers = {kategoria:'Ubrania', osoba1:'Lena', osoba2:'Celina', osoba3:'Natalia'};
function field(key,label) {
  return `<label class="ws-ans-line"><span>${label}</span><input data-vat="${key}" ${key in moneyAnswers?'inputmode="decimal"':''}></label>`;
}
function mission(number,title,content){
  return `<section class="ws-card ws-step"><h2>Misja ${number} · ${title}</h2>${content}
    <label class="ws-done-toggle"><input type="checkbox" data-step-check="vat-step-${number}"> Misja wykonana</label></section>`;
}
export function renderVat(toolbar){
  return toolbar + `<div class="ws-sheet ws-theme-green" id="ws-sheet">
    <header class="ws-header vat-header"><div><small>Karta pracy ucznia · Klasa VIII</small>
    <h1>Nie pracuję, więc nie płacę podatków? Excel sprawdza!</h1>
    <p>Ile VAT kryje się w cenie biletu lub słuchawek? Sprawdź wybrane zakupy 16 fikcyjnych osób z 2025 roku.</p></div></header>
    <div class="ws-student-bar"><label class="ws-student-field">Imię i nazwisko <input id="ws-student-name"></label>
    ${field('klasa','Klasa')} ${field('data','Data')}</div>
    <section class="ws-card"><h2>Materiały do zadania</h2><div class="actions">
    <a class="btn primary" href="./Zakupy_nastolatkow_2000_rekordow.xlsx" download>Pobierz bazę zakupów (Excel)</a>
    <a class="btn" href="./Misja_VAT_klasa_8_2000.pdf" download>Pobierz kartę pracy (PDF)</a></div>
    <details><summary>Podgląd arkusza BAZA_ZAKUPÓW</summary><div class="ws-table-wrap"><table class="ws-excel-grid"><caption>Pierwsze cztery zakupy · wybrane kolumny</caption><thead><tr><th>ID</th><th>Imię</th><th>Produkt lub usługa</th><th>Brutto (zł)</th><th>VAT (zł)</th></tr></thead><tbody>
    <tr><td>T0001</td><td>Hania</td><td>Żel pod prysznic 250 ml</td><td>12,18</td><td>2,28</td></tr>
    <tr><td>T0002</td><td>Pola</td><td>Koszulka bawełniana</td><td>32,26</td><td>6,03</td></tr>
    <tr><td>T0003</td><td>Emilia</td><td>Bilet ulgowy na basen - sam wstęp</td><td>16,29</td><td>1,21</td></tr>
    <tr><td>T0004</td><td>Filip</td><td>Słuchawki przewodowe</td><td>79,24</td><td>14,82</td></tr></tbody></table></div></details></section>
    <section class="ws-card"><h2>Start · Przygotuj warsztat</h2><ol><li>Otwórz bazę w Excelu. Zapisz kopię jako <code>Misja_VAT_Imię.xlsx</code>.</li>
    <li>Kliknij komórkę tabeli <strong>Zakupy</strong> w arkuszu <strong>BAZA_ZAKUPÓW</strong>.</li>
    <li>Wybierz <strong>Wstawianie → Tabela przestawna → Z tabeli/zakresu → Nowy arkusz → OK</strong>. Nazwij arkusz <strong>ANALIZY</strong>.</li></ol></section>
    ${mission(1,'Odkryj podatek',`<p>Do <strong>Wierszy</strong> przeciągnij „Kategoria zakupów”. Do <strong>Wartości</strong> dodaj „Cena brutto (PLN)” i „Kwota VAT (PLN)”.</p>
    <p>Dla obu pól wybierz <strong>Ustawienia pola wartości → Suma → Format liczby → Walutowe</strong> i dwa miejsca po przecinku. Jeśli panel zniknął, wybierz <strong>Analiza tabeli przestawnej → Lista pól</strong>.</p>
    ${field('brutto','Suma brutto (zł)')}${field('vat','Suma VAT (zł)')}${field('kategoria','Kategoria z największą kwotą VAT')}`)}
    ${mission(2,'Kto płaci najwięcej?',`<p>Skopiuj całą tabelę. Wklej ją od A18, zostawiając odstęp. W kopii usuń kategorię i cenę brutto. Umieść „Imię kupującego (fikcyjne)” w <strong>Wierszach</strong>, a sumę VAT w <strong>Wartościach</strong>.</p><p>Kliknij kwotę prawym przyciskiem. Wybierz <strong>Sortuj → Od największych do najmniejszych</strong>. Zapisz pierwsze trzy osoby i ich kwoty VAT.</p>
    ${[1,2,3].map(n=>field('osoba'+n,'Miejsce '+n+' · imię')+field('kwota'+n,'VAT (zł)')).join('')}<small>Ranking obejmuje tylko zakupy zapisane w bazie.</small>`)}
    ${mission(3,'Podatki na wykresie','<p>Skopiuj pierwszą tabelę do nowego arkusza <strong>WYKRES</strong>. Usuń z kopii cenę brutto. Kliknij tabelę i wybierz <strong>Analiza tabeli przestawnej → Wykres przestawny → Kolumnowy grupowany</strong>.</p><p>Nadaj tytuł „VAT w zakupach według kategorii”. Sprawdź, czy nazwy kategorii są czytelne, a kwoty opisane w złotych.</p>')}
    ${mission(4,'Fragmentatory w akcji',`<p>Kliknij pierwszą tabelę. Wybierz <strong>Analiza tabeli przestawnej → Wstaw fragmentator</strong>. Dodaj kategorię oraz imię kupującego. Przesuń przyciski obok tabel.</p><p>Dla każdego fragmentatora otwórz <strong>Połączenia raportu</strong>. Zaznacz obie tabele i kopię do wykresu. Brakuje tabeli? Utwórz ją przez skopiowanie pierwszej.</p><p>Wybierz <strong>Pola</strong> i <strong>Gry</strong>. Odczytaj VAT. Sprawdź obie tabele i wykres. Na koniec wyczyść oba filtry. Z klawiszem Ctrl możesz wybrać kilka pozycji.</p>${field('filtr','VAT po obu filtrach (zł)')}`)}
    <button type="button" class="btn primary" id="vat-check">Sprawdź wyniki misji 1, 2 i 4</button><p id="vat-result" role="status"></p>
    ${mission(5,'Czy wystarczyłoby na słuchawki?',`<p>Wybierz jedną osobę i wszystkie kategorie. Odczytaj sumę VAT. W bazie znajdź „Słuchawki przewodowe” i wybierz jedną cenę brutto. Podziel sumę VAT przez tę cenę.</p>${field('wybor','Wybrana osoba')}${field('jejVAT','Suma VAT (zł)')}${field('cena','Cena słuchawek (zł)')}${field('iloraz','Iloraz')}${field('wniosek','Czy wystarczyłoby na jedną sztukę?')}<p>Porównujesz dwie wartości. VAT był już częścią zapłaconej ceny.</p>`)}
    <section class="ws-card"><h2>Bonus · Detektyw podatkowy</h2><p>Skopiuj tabelę i wyczyść filtry. W <strong>Wierszach</strong> ustaw miesiąc lub stawkę VAT. W <strong>Wartościach</strong> ustaw sumę brutto i sumę VAT.</p>${field('bonus','Twój wniosek poparty dwiema liczbami')}</section>
    <section class="ws-card"><h2>Finał · Wyciągnij wnioski i zapisz plik</h2>${field('final1','Czy osoba bez pracy może płacić podatki?')}${field('final2','Czym VAT na paragonie różni się od PIT?')}${field('final3','Co zaskoczyło Cię w wynikach?')}
    <p>Konsument płaci VAT w cenie, a sprzedawca go rozlicza. PIT dotyczy dochodów. Gdy w komórce masz stawkę procentową, oblicz <strong>VAT = brutto × stawka ÷ (1 + stawka)</strong>. Przy 23% jest to 23/123 ceny brutto.</p><p>Zapisz swoją kopię skoroszytu z tabelami i wykresem.</p></section></div>`;
}
export function bindVat(sheet,state,saveState){
  const inputs=[...sheet.querySelectorAll('[data-vat]')];
  const status=sheet.querySelector('#vat-result');
  for(const input of inputs){
    const key='vat-'+input.dataset.vat;
    input.value=state[key] || '';
    input.oninput=()=>{state[key]=input.value;saveState();input.removeAttribute('aria-invalid');status.textContent='';};
  }
  sheet.querySelector('#vat-check').onclick=()=>{
    let correct=0;
    for(const input of inputs){
      const key=input.dataset.vat;
      if(!(key in moneyAnswers || key in textAnswers))continue;
      const raw=input.value.trim();
      const amount=raw.replace(/\s/g,'').replace(',','.');
      const ok=key in moneyAnswers ? /^\d+(\.\d{1,2})?$/.test(amount)&&Number(amount)===moneyAnswers[key] : raw.toLocaleLowerCase('pl')===textAnswers[key].toLocaleLowerCase('pl');
      input.setAttribute('aria-invalid',String(!ok));
      if(ok)correct++;
    }
    status.textContent=correct===10?'Wszystkie 10 wyników zgadza się z bazą zakupów.':`Poprawne wyniki: ${correct} z 10. Sprawdź zaznaczone pola. W misjach 1 i 2 wyczyść filtry, a w misji 4 zastosuj oba filtry.`;
  };
  document.querySelector('#ws-reset-progress').onclick=()=>{
    for(const input of inputs){input.value='';delete state['vat-'+input.dataset.vat];input.removeAttribute('aria-invalid');}
    for(const check of sheet.querySelectorAll('[data-step-check]')){check.checked=false;check.dispatchEvent(new Event('change'));}
    saveState();status.textContent='Wyczyszczono odpowiedzi i zaznaczenia tej karty.';
  };
}

