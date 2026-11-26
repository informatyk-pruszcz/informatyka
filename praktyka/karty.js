import {curriculum} from '../curriculum.js?v=audit1';

const lessons = [
  {
    grade: 4, number: '2.3', slug: 'ilustracje', title: 'Wybierz ilustrację na zaproszenie',
    tool: 'Katalog tekstowy', point: '1.3, 5.6', file: 'katalog-ilustracji.txt', download: 'Pobierz katalog ilustracji (TXT)',
    lead: 'Redakcja przygotowuje drukowane zaproszenie na wystawę robotów. Którą ilustrację wolno wydrukować?',
    steps: [
      [3, 'Otwórz katalog', 'Zapisz jego kopię w swoim folderze. Znajdź karty przedstawiające robota. Możesz skorzystać z Ctrl+F lub odsłuchać opisów.'],
      [7, 'Sprawdź dwa warunki', 'Która ilustracja pasuje do tematu? Który autor zgadza się na druk? Wskaż kartę i po jednym dowodzie dla każdego warunku.'],
      [5, 'Podpisz ilustrację', 'W polu odpowiedzi podaj tytuł, autora, słowa „Katalog redakcji” i literę karty. Możesz też wskazać te pola na wydruku.'],
      [5, 'Zmień zamówienie i zapisz', 'Teraz redakcja potrzebuje ilustracji na drukowane zaproszenie na wystawę mostów. Dopisz drugi podpis, zapisz pracę i pokaż oba wybory.']
    ],
    hint: 'Przeczytaj, gdzie każdy autor pozwala pokazać swój rysunek. Wskaż zdanie, w którym jest mowa o druku.',
    product: 'Dwa podpisy oraz uzasadnienie wyboru ilustracji robota.'
  },
  {
    grade: 5, number: '1.4', slug: 'ogloszenie', title: 'Uratuj godzinę otwarcia wystawy',
    tool: 'Word 2016', point: 'II.3b, V.2', file: 'ogloszenie-start.docx', download: 'Pobierz ogłoszenie do naprawy (DOCX)',
    lead: 'Robot na plakacie zasłania godzinę otwarcia. Ułóż ogłoszenie tak, żeby dało się je przeczytać również po dopisaniu zdania.',
    steps: [
      [3, 'Zapisz własną kopię', 'Otwórz plik w Wordzie i zapisz jako wystawa.docx. Znajdź akapit o dniu i godzinie otwarcia.'],
      [8, 'Ustaw obraz obok tekstu', 'Zaznacz robota. W Narzędziach obrazów wybierz Formatowanie → Zawijaj tekst → Kwadrat. Ustaw obraz z prawej strony tekstu.'],
      [6, 'Sprawdź poprawkę redakcji', 'Przed zdaniem o otwarciu dopisz „Najpierw obejrzymy modele z klocków.” W polu podpisu wpisz „Ilustracja: Informatyka w akcji”.'],
      [5, 'Otwórz gotowe ogłoszenie', 'Zapisz i zamknij dokument. Otwórz swoją kopię. Odczytaj dzień, godzinę i salę. Jeżeli obraz zakrywa tekst, popraw układ i zapisz.']
    ],
    hint: 'Jeśli trudno trafić w uchwyt obrazu, otwórz okienko zaznaczenia (Alt+F10), wybierz robota i skorzystaj z polecenia Położenie na wstążce. Szerokość obrazu możesz podać liczbą.',
    product: 'Edytowalny DOCX. Cały komunikat i podpis rysunku są czytelne po dopisaniu zdania.'
  },
  {
    grade: 6, number: '2.3', slug: 'budzet', title: 'Dlaczego saldo klubu stoi w miejscu?',
    tool: 'Excel 2016', point: 'II.3c', file: 'budzet-start.xlsx', download: 'Pobierz budżet klubu (XLSX)',
    lead: 'Klub ma jeszcze 15 zł. Materiały drożeją o 10 zł. Czy nadal wystarczy na bilet za 10 zł?',
    steps: [
      [3, 'Otwórz budżet', 'Zapisz kopię jako budzet-klubu.xlsx. Znajdź cenę materiałów w B7 i saldo w B13. Przewidź, jak zmieni się saldo.'],
      [8, 'Odszukaj usterkę', 'W B7 zmień 20 na 30. Sprawdź B11 i B13 na pasku formuły. Napraw B11 tak, aby sumowała wszystkie cztery wydatki z B7:B10.'],
      [6, 'Podejmij dwie decyzje', 'Odczytaj saldo po naprawie. Czy wystarczy na bilet? Następnie w B8 obniż cenę papieru z 15 do 8. Sprawdź, czy decyzja się zmieniła.'],
      [5, 'Zapisz i pokaż dowód', 'Podaj obie decyzje z kwotami, ustnie lub w arkuszu. Zapisz plik i pokaż nauczycielowi formułę w B11.']
    ],
    hint: 'Naciśnij F5, wpisz adres komórki i zatwierdź Enterem. Zobacz, czy w B11 jest działanie zaczynające się od =. Jakich adresów potrzebuje funkcja SUMA?',
    product: 'Skoroszyt, który przelicza wydatki i saldo po zmianie ceny.'
  },
  {
    grade: 7, number: '2.2', slug: 'odsylacz', title: 'Dokąd prowadzi „Kliknij tutaj”?',
    tool: 'VS Code i przeglądarka', point: 'II.3d, element II.4', file: 'spacer-start.zip', download: 'Pobierz stronę i ilustrację (ZIP)',
    lead: 'Ktoś słuchający listy linków usłyszy tylko „Kliknij tutaj”. Popraw nazwę i cel odsyłacza na stronie koła przyrodniczego.',
    steps: [
      [4, 'Rozpakuj pliki', 'Otwórz rozpakowany index.html w VS Code oraz w przeglądarce. W tym samym folderze znajdziesz park.svg.'],
      [7, 'Napraw odsyłacz', 'Nadaj linkowi nazwę opisującą jego cel. Połącz href z identyfikatorem nagłówka „Plan spaceru”. Nazwa po # musi odpowiadać wartości id.'],
      [6, 'Dodaj ilustrację', 'Pod nagłówkiem wstaw obraz park.svg i dodaj opis alternatywny. Rysunek przedstawia ścieżkę między drzewami w parku.'],
      [5, 'Zmień, zapisz i sprawdź', 'Dodaj słowo „sobotniego” do nazwy planu i tekstu linku. Zapisz plik i odśwież stronę. Przejdź Tab do linku i naciśnij Enter. Porównaj fragment adresu z id nagłówka. Oddaj HTML wraz z ilustracją.']
    ],
    hint: 'Przykład: href="#mapa" prowadzi do elementu z id="mapa". Przy obrazku użyj znacznika img z atrybutami src i alt.',
    product: 'Link zapowiada swój cel i prowadzi do właściwego nagłówka. Ilustracja ma opis.'
  },
  {
    grade: 8, number: '1.4', slug: 'vat', title: 'Czy ubrania wygrywają dwa razy?',
    tool: 'Excel z tabelą przestawną', point: 'II.3c, element II.4', file: 'vat-start.xlsx', download: 'Pobierz rozpoczętą analizę VAT (XLSX)',
    lead: 'Gazetka twierdzi, że kategoria o największej sumie VAT ma także najwyższy VAT średnio na zakup. Sprawdź to na 2000 fikcyjnych zakupów.',
    steps: [
      [3, 'Otwórz analizę', 'Zapisz kopię jako naglowki.xlsx. W arkuszu Analiza znajdź kategorie, sumę podatku i liczbę zakupów. Zacznij od wszystkich osób.'],
      [8, 'Dodaj średnią', 'W tabeli przestawnej dodaj ponownie pole Kwota VAT (PLN) do obszaru Wartości. W ustawieniach tego pola wybierz Średnia. Znajdź kategorie z najwyższą sumą i średnią. Pomiń wiersz sumy końcowej.'],
      [7, 'Sprawdź zakupy Poli', 'W filtrze osób wybierz Pola. Ponownie znajdź obie kategorie. Ile zakupów składa się na najwyższą średnią?'],
      [4, 'Zapisz dwa wnioski', 'W arkuszu Wnioski wpisz lub podyktuj wyniki dla obu widoków. Rozróżnij zł łącznie i zł na zakup. Przywróć wszystkie osoby i zapisz plik.']
    ],
    hint: 'Wybierz komórkę tabeli, aby otworzyć listę pól. Pole możesz dodać przez jego menu. Suma zbiera podatek z całej grupy, a średnia mówi, ile przypada na jeden zakup.',
    product: 'Tabela reaguje na filtr. Potrafisz podać oba wyniki i wskazać liczbę zakupów za najwyższą średnią Poli.'
  }
];

export const practicalCards = lessons.map(lesson => {
  const {grade, number, slug, title, lead, steps, hint, product, tool, point, file, download} = lesson;
  const topic = curriculum.find(t => t.grade === grade && t.number === number);
  const minutes = steps.reduce((total, [time]) => total + time, 0);
  return {
    id: 'praktyka-' + slug, topicId: 'topic-' + grade + '-' + number.replace('.', '-'),
    type: 'task', grades: [grade], section: topic.section, title, tags: [tool, 'Praca praktyczna'],
    summary: `Temat ${number} · ${minutes} min od otwarcia do zapisania pracy. ${lead}`,
    body: '<h2>Praca na lekcji</h2><ol>' + steps.map(([time, label, instruction]) =>
      '<li><strong>' + label + ' (' + time + ' min).</strong> ' + instruction + '</li>').join('') +
      '</ol><h3>Wskazówka</h3><p>' + hint + '</p><h3>Co pokazać na koniec?</h3><p>' + product + '</p>',
    file, download, minutes, study: {point, tool, product}, source: 'Informatyka w akcji · ćwiczenie praktyczne.'
  };
});

export function practicalLink(id) {
  const card = practicalCards.find(c => c.id === id || c.topicId === id);
  if (!card) return '';
  if (id === card.id) return '<p><a class="btn primary" download href="praktyka/' + card.file + '">' + card.download + '</a></p>';
  return '<p><a class="btn primary" href="#item/' + card.id + '">Praktyka · ' + card.minutes + ' min · ' + card.title + '</a></p>';
}
