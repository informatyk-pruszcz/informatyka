import {curriculum} from '../curriculum.js?v=audit1';

import {lessonMetadata} from '../curriculum-metadata.js';

const lessons = [
  {
    grade: 4, number: '2.3', slug: 'ilustracje',
    skill: 'Wybieram ilustrację do druku', assessment: 'Wskaż zgodę autora na druk i uzasadnij drugi wybór w katalogu.', title: 'Wybierz ilustrację na zaproszenie',
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
    grade: 5, number: '1.4', slug: 'ogloszenie',
    skill: 'Układam tekst i obraz w Wordzie', assessment: 'Odczytaj godzinę po dopisaniu zdania i ponownym otwarciu pliku. Wskaż podpis ilustracji.', title: 'Uratuj godzinę otwarcia wystawy',
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
    grade: 6, number: '2.3', slug: 'budzet',
    skill: 'Naprawiam formułę w budżecie', assessment: 'Zmień cenę i pokaż, jak zmieniły się suma wydatków i decyzja o zakupie biletu.', title: 'Dlaczego saldo klubu stoi w miejscu?',
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
    grade: 7, number: '2.2', slug: 'odsylacz',
    skill: 'Tworzę działający odsyłacz', assessment: 'Naciśnij Tab i Enter. Wskaż cel odsyłacza oraz opis obrazu w kodzie.', title: 'Dokąd prowadzi „Kliknij tutaj”?',
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
    grade: 8, number: '1.4', slug: 'vat',
    skill: 'Ćwiczę tabele przestawne', assessment: 'Wskaż największą sumę i średnią przy dwóch ustawieniach filtra. Uzasadnij wynik kwotą i liczbą zakupów.', title: 'Czy ubrania wygrywają dwa razy?',
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

for (const [grade, number, point, skill] of [
  [4, '5.1', '2.1, 2.2, 2.4', 'Układam ruch robota w pętli'],
  [5, '3.3', 'I.2b', 'Rysuję figurę za pomocą pętli'],
  [6, '3.2', 'II.1, II.2', 'Testuję ruch postaci']
]) {
  lessons.push({
    grade, number, point, skill, slug:'petla-' + grade, title:'Narysuj trasę za pomocą pętli', tool:'Edytor blokowy',
    lead:'Robot czeka w lewym górnym rogu planszy. Zaprogramuj przejazd po bokach figury.',
    steps:[
      [2,'Przewidź pierwszy ruch','Wybierz kwadrat. Sprawdź długości boków. Powiedz lub pokaż, gdzie trafi robot po pierwszym ruchu i obrocie.'],
      [4,'Ułóż i uruchom pętlę','Ustaw powtórzenia, ruch i obrót. Uruchom program. Porównaj trasę z celem na rysunku lub przeczytaj opis drogi. Popraw jeden element i spróbuj jeszcze raz.'],
      [4,'Zmień figurę','Wybierz prostokąt. Zmień program tak, aby robot przejechał każdy bok raz i wrócił do startu.']
    ],
    hint:'Na rogu robot zmienia kierunek o ćwierć obrotu. W prostokącie kolejny bok może mieć inną długość.',
    product:'Działający program i wskazanie grupy powtarzanych poleceń.',
    assessment:'Uruchom program dla kwadratu. Zmień go dla prostokąta i wskaż polecenie, które zmieniło wynik.'
  });
}

export const practicalCards = lessons.map(lesson => {
  const {grade, number, slug, title, lead, steps, hint, product, tool, point, file, download} = lesson;
  const topic = curriculum.find(t => t.grade === grade && t.number === number);
  const topicId = 'topic-' + grade + '-' + number.replace('.', '-');
  const minutes = steps.reduce((total, [time]) => total + time, 0);
  return {
    id: 'praktyka-' + slug, topicId, skill: lesson.skill,
    type: 'task', grades: [grade], section: topic.section, title, tags: [tool, 'Praca praktyczna'],
    summary: `Temat ${number} · około ${minutes} min. ${lead}`,
    body: '<h2>Cel ćwiczenia</h2><p>' + lesson.skill + '.</p><h2>Praca na lekcji</h2><ol>' + steps.map(([time, label, instruction]) =>
      '<li><strong>' + label + ' (' + time + ' min).</strong> ' + instruction + '</li>').join('') +
      '</ol><h3>Wskazówka</h3><p>' + hint + '</p><h3>Co pokazać na koniec?</h3><p>' + product + '</p>',
    file, download, minutes, study: {
      ...lessonMetadata(topicId), point, tool, product, assessment: lesson.assessment,
      program: (grade === 4 ? 'Informatyka w akcji' : 'Lubię to!') + ' · klasa ' + grade + ', temat ' + number,
      support: 'Uczeń może wyświetlić po jednym kroku, pracować dłużej oraz wskazać wynik lub wyjaśnić go ustnie. Dobierz formę pracy do indywidualnych zaleceń ucznia.'
    }, source: 'Ćwiczenie autorskie według rozkładu materiału i wymagań edukacyjnych Nowej Ery.'
  };
});

export function practicalLink(id) {
  const card = practicalCards.find(c => c.id === id || c.topicId === id);
  if (!card) return '';
  if (id === card.id && !card.file) return '';
  if (id === card.id) return '<p><a class="btn primary" download href="praktyka/' + card.file + '">' + card.download + '</a></p>';
  return '<p><a class="btn primary" href="#item/' + card.id + '">Praktyka · ' + card.minutes + ' min · ' + card.title + '</a></p>';
}
