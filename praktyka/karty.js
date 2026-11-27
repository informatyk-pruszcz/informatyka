import {curriculum} from '../curriculum.js?v=audit1';

import {lessonMetadata} from '../curriculum-metadata.js';

const lessons = [
  {
    grade: 4, number: '2.3', slug: 'ilustracje',
    requirement: 'Wybierasz materiał, którego autor pozwala użyć na zaproszeniu.', evidence: 'Wskaż w katalogu zgodę na druk oraz autora wybranej ilustracji.',
    support: 'Czytaj po jednej karcie katalogu. Uczeń może wskazać palcem lub odczytać tytuł i zdanie ze zgodą na druk.',
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
    requirement: 'Wstawiasz obraz do dokumentu i ustawiasz go względem tekstu.', evidence: 'Po otwarciu dokumentu da się odczytać godzinę i podpis ilustracji. Jeśli obraz jest już wstawiony, przećwicz zmianę jego położenia.',
    support: 'Zwiększ powiększenie dokumentu. Położenie ilustracji można ustawić z klawiatury. Uczeń pokazuje czytelny komunikat po ponownym otwarciu pliku.',
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
    requirement: 'Obliczasz wydatki przy użyciu adresów komórek i sprawdzasz, jak zmiana ceny wpływa na budżet.', evidence: 'Pokaż formułę w B11 i dwie decyzje o zakupie biletu. Do każdej dobierz kwotę salda.',
    support: 'Wskaż na początek komórki B7, B11 i B13. Uczeń może przejść do nich klawiszem F5 i podyktować decyzję wraz z kwotą.',
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
    requirement: 'Tworzysz stronę HTML z obrazem.', evidence: 'Otwórz własny plik HTML i pokaż ilustrację. Następnie sprawdź odsyłacz klawiaturą i odczytaj opis obrazu w kodzie.',
    support: 'Zacznij od porównania dwóch krótkich fragmentów: wartości href i id. Uczeń sprawdza link klawiszami Tab i Enter, a tekst alternatywny może podyktować.',
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
    requirement: 'Filtrujesz dane w arkuszu i odczytujesz wynik dla wybranego kupującego.', evidence: 'W arkuszu Zakupy włącz filtr w wierszu nagłówków. Wybierz Polę, odczytaj kategorię oraz kwotę VAT jednego zakupu i pokaż je nauczycielowi. Wyczyść filtr. Dalsza analiza sum i średnich w tabeli przestawnej jest rozszerzeniem.',
    support: 'Pokaż najpierw jedną kolumnę wyników. Uczeń może wskazać kategorię i podyktować kwotę, a po zmianie filtra powtórzyć czynność. Oceniaj interpretację danych.',
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

const loopLessons = [
  {
    grade: 4, number: '5.1', point: '1.4, 2.1, 2.2, 2.4',
    requirement: 'Układasz skrypt powtarzający ruch duszka lub robota określoną liczbę razy.', evidence: 'Uruchom trasę kwadratu. Wskaż, ile razy wykonały się ruch i obrót.',
    title: 'Jak robot może objechać kwadrat?', skill: 'Układam ruch robota w pętli',
    lead: 'Robot startuje w lewym górnym rogu i patrzy w prawo. Pomóż mu objechać kwadrat o boku trzech kratek.',
    steps: [
      [2, 'Przewidź ruch', 'Spójrz na pierwszy ruch programu lub odczytaj go z listy. Wskaż, w którą stronę pojedzie robot. Uruchom program i porównaj swoją odpowiedź ze śladem.'],
      [5, 'Domknij kwadrat', 'Ustaw ruch na długość jednego boku. Ile razy robot powinien wykonać ruch i obrót? Zmień liczbę powtórzeń i uruchom program ponownie.'],
      [3, 'Pokaż powtórzenie', 'Wskaż na liście lub w bloczkach dwa polecenia, które robot powtarza na każdym boku. Jeśli masz ochotę, wypróbuj też prostokąt.']
    ],
    hint: 'Po każdym boku robot skręca o ćwierć obrotu. Możesz prześledzić jego drogę palcem albo przeczytać opis pod planszą.',
    product: 'Kwadrat o boku trzech kratek i wskazanie powtarzanej pary poleceń.',
    assessment: 'Uczeń pokazuje powrót do startu i wskazuje ruch oraz obrót w pętli. Prostokąt jest zadaniem dodatkowym.',
    support: 'Pozwól prześledzić jeden bok palcem albo za pomocą opisu tekstowego. Uczeń może wskazać powtarzane polecenia na liście.'
  },
  {
    grade: 5, number: '3.3', point: 'I.2b',
    requirement: 'Układasz skrypt rysujący kwadrat.', evidence: 'Wybierz kwadrat i zaprogramuj cztery boki. W Scratchu możesz powtórzyć próbę z rozszerzeniem Pióro i opuszczonym pisakiem. Prostokąt poniżej pozwala sprawdzić, jak zmieni się grupa poleceń.',
    title: 'Jak zamienić kwadrat w prostokąt?', skill: 'Rysuję figurę za pomocą pętli',
    lead: 'Na planszy narysujesz prostokąt o bokach pięciu i trzech kratek. Jaką część trasy można zapisać tylko raz?',
    steps: [
      [2, 'Zaplanuj drogę', 'Wybierz prostokąt. Zacznij w lewym górnym rogu i prześledź cztery boki. Wskaż dwie kolejne długości, które potem się powtórzą.'],
      [5, 'Ułóż pętlę', 'Ustaw ruch na długość pierwszego boku i dodaj drugi ruch. Między bokami robot potrzebuje obrotu. Dobierz liczbę powtórzeń całej grupy.'],
      [3, 'Porównaj wynik z planem', 'Uruchom program. Sprawdź na rysunku lub w opisie, czy robot po każdym boku przejechał raz. Wskaż, po którym ruchu kończy się jedna grupa poleceń.']
    ],
    hint: 'Przeczytaj długości boków w kolejności od startu. Która para się powtarza? Pamiętaj o skręcie przed następnym bokiem.',
    product: 'Prostokąt 5 × 3 i wskazanie grupy poleceń, która rysuje dwa kolejne boki.',
    assessment: 'Uczeń uruchamia działającą pętlę i pokazuje dwa różne boki w jednej powtarzanej grupie.',
    support: 'Podawaj długości po dwie. Uczeń może ułożyć grupę na liście klawiaturą i porównać wynik z opisem słownym trasy.'
  },
  {
    grade: 6, number: '3.2', point: 'II.1, II.2',
    requirement: 'Programujesz reakcję duszka na komunikat.', evidence: 'W Scratchu ustaw dwa krótkie skrypty. Po kliknięciu zielonej flagi nadaj komunikat „Start”. Po odebraniu „Start” przesuń duszka o 30 kroków. Pokaż nadawcę i odbiorcę, uruchom projekt i wskaż efekt. Plansza poniżej służy do ćwiczenia przewidywania i poprawiania ruchu.',
    title: 'Dlaczego robot nie wrócił do startu?', skill: 'Testuję ruch postaci',
    lead: 'Przed pracą z komunikatami w Scratchu sprawdź, jak wykryć błąd w ruchu postaci. Będziesz porównywać przewidywania z działaniem programu.',
    steps: [
      [2, 'Postaw hipotezę', 'Wybierz kwadrat o boku trzech kratek. Przeczytaj program przed uruchomieniem. Powiedz, wskaż albo zapisz, na którym boku trasa po raz pierwszy rozminie się z celem.'],
      [5, 'Przetestuj poprawkę', 'Uruchom program i odczytaj trasę. Zmień jeden parametr, przewidź wynik i uruchom ponownie. Powtarzaj próbę, aż robot poprawnie objedzie kwadrat.'],
      [3, 'Sprawdź, co powoduje błąd', 'W działającym programie zmień liczbę powtórzeń o jeden. Przewidź skutek i sprawdź swój pomysł. Przywróć poprzednią wartość i pokaż oba wyniki.']
    ],
    hint: 'Porównuj próby, zmieniając jedną rzecz naraz, na przykład liczbę powtórzeń. Opis pod planszą podaje kierunki i długości ruchów.',
    product: 'Działający program i porównanie dwóch prób po zmianie jednego parametru.',
    assessment: 'Uczeń przewiduje skutek zmiany, wykonuje próbę i wskazuje w wyniku, co potwierdziło jego przewidywanie albo skłoniło go do poprawki.',
    support: 'Udostępnij wzór odpowiedzi „Zmieniam … Przewiduję … Robot …”. Uczeń może porównać próby ustnie, odczytując tekstowy opis trasy.'
  }
];

for (const lesson of loopLessons) {
  lessons.push({...lesson, slug: 'petla-' + lesson.grade, tool: 'Edytor blokowy'});
}

export const practicalCards = lessons.map(lesson => {
  const {grade, number, slug, title, lead, steps, hint, product, tool, point, file, download} = lesson;
  const topic = curriculum.find(t => t.grade === grade && t.number === number);
  const topicId = 'topic-' + grade + '-' + number.replace('.', '-');
  const basicSteps = {
    vat: ['Otwórz plik i przejdź do arkusza Zakupy. Zaznacz nagłówek i włącz filtr (Ctrl+Shift+L), jeśli strzałek jeszcze nie ma.', 'W kolumnie z imieniem wybierz tylko Polę. Odczytaj kategorię oraz kwotę VAT z jednego widocznego wiersza.', 'Pokaż lub podyktuj oba wyniki. Wyczyść filtr, aby znów zobaczyć wszystkich kupujących.'],
    'petla-5': ['Na planszy wybierz kwadrat o boku trzech kratek.', 'Ułóż ruch i obrót. Dobierz liczbę powtórzeń i uruchom robota.', 'Sprawdź, czy robot objechał cztery boki. Wskaż powtarzany fragment programu. W Scratchu możesz wykonać tę samą próbę z opuszczonym pisakiem.'],
    'petla-6': ['Otwórz Scratch i wybierz duszka. Dodaj blok zielonej flagi, a pod nim blok nadający nowy komunikat o nazwie „Start”.', 'Obok ułóż drugi skrypt. Pod blokiem odbioru komunikatu „Start” dodaj ruch o 30 kroków.', 'Przewidź, co zrobi duszek. Kliknij zieloną flagę i pokaż, który skrypt nadał komunikat, a który na niego zareagował.']
  }[slug];
  const assessment = basicSteps
    ? lesson.evidence + ' Przy wykonywaniu dalszej części: ' + lesson.assessment
    : lesson.assessment;
  const series = grade === 4 ? 'Informatyka w akcji' : 'Lubię to!';
  const minutes = steps.reduce((total, [time]) => total + time, 0);
  return {
    id: 'praktyka-' + slug, topicId, skill: lesson.skill,
    type: 'task', grades: [grade], section: topic.section, title, tags: [tool, 'Praca praktyczna'],
    summary: `Temat ${number} · około ${minutes} min. ${lead}`,
    body: '<h2>Cel ćwiczenia</h2><p>' + lesson.requirement + '</p>' +
      (basicSteps ? '<h2>Zadanie na lekcję</h2><ol>' + basicSteps.map(step => '<li>' + step + '</li>').join('') +
        '</ol><h3>Po czym poznasz, że umiesz?</h3><p>' + lesson.requirement + ' Pokaż wynik ostatniego kroku.</p>' : '<h3>Po czym poznasz, że umiesz?</h3><p>' + lesson.evidence + '</p>') +
      (basicSteps ? '<details><summary>' + (slug === 'vat' ? 'Rozszerzenie z tabelą przestawną' : slug === 'petla-5' ? 'Rozszerzenie z prostokątem' : 'Dodatkowy trening ruchu na planszy') + '</summary>' : '<h2>Praca na lekcji</h2>') +
      '<ol>' + steps.map(([time, label, instruction]) => '<li><strong>' + label + ' (' + time + ' min).</strong> ' + instruction + '</li>').join('') +
      '</ol><h3>Wskazówka</h3><p>' + hint + '</p><h3>Co pokazać na koniec?</h3><p>' + product + '</p>' + (basicSteps ? '</details>' : ''),
    file, download, minutes, study: {
      ...lessonMetadata(topicId), point, tool, product: basicSteps ? lesson.requirement : product, assessment,
      program: series + ' (Nowa Era), klasa ' + grade + ' · ' + number + ' ' + topic.title,
      support: lesson.support + ' Można wyświetlać po jednym kroku i wydłużyć czas zgodnie z potrzebami ucznia.'
    }, source: 'Ćwiczenie autorskie. Odniesienie: Nowa Era, „' + series + '”, wymagania edukacyjne do informatyki dla klasy ' + grade + ', temat ' + number + '.'
  };
});

export function practicalLink(id) {
  const card = practicalCards.find(c => c.id === id || c.topicId === id);
  if (!card) return '';
  if (id === card.id && !card.file) return '';
  if (id === card.id) return '<p><a class="btn primary" download href="praktyka/' + card.file + '">' + card.download + '</a></p>';
  return '<p><a class="btn primary" href="#item/' + card.id + '">Praktyka · ' + card.minutes + ' min · ' + card.title + '</a></p>';
}
