import {auditNotes} from './notes-audit.js';

// Punkty przepisano z odpowiedniego rozkładu Nowej Ery. Produkt i kryterium są propozycją do pracy w klasie.
const lessonRows = {
  "topic-4-0-1": ["4.1","edytor tekstu","Lista trzech zastosowań komputera w szkole","Do każdego przykładu dobierz urządzenie i uzasadnij wybór."],
  "topic-4-1-1": ["4.1, 4.5, 5.3","stanowisko komputerowe","Karta ustawień stanowiska","Pokaż dwa ustawienia poprawiające wygodę pracy i jedno oszczędzające energię."],
  "topic-4-1-2": ["3.7, 5.7","Eksplorator plików","Folder z uporządkowanymi pracami","Otwórz wskazany plik oraz wskaż warunki użycia programu."],
  "topic-4-1-3": ["3.7, 4.1, 4.5, 5.3","Eksplorator plików","Zestaw plików w podpisanych folderach","Samodzielnie odszukaj pracę i opisz bezpieczne zakończenie pracy przy komputerze."],
  "topic-4-2-1": ["3.7, 4.2","przeglądarka","Schemat przesłania wiadomości","Wskaż nadawcę, odbiorcę i połączenie między nimi."],
  "topic-4-2-2": ["4.3, 5.3, 5.4, 5.5","przeglądarka","Plan reakcji na fikcyjną wiadomość","Wskaż sygnał ostrzegawczy i osobę, do której zwrócisz się po pomoc."],
  "topic-4-2-3": ["1.3, 3.7, 5.6","wyszukiwarka","Notatka z dwoma źródłami","Sprawdź autora, adres i zgodność informacji."],
  "topic-4-2-4": ["3.7, 4.2, 5.1, 5.2","szkolny komunikator lub edytor tekstu","Wiadomość do zespołu","Oceń, czy adresat rozumie prośbę i może odpowiedzieć zgodnie z netykietą."],
  "topic-4-2-5": ["1.3, 3.7, 4.2, 4.3, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6","przeglądarka i edytor tekstu","Poradnik bezpiecznej reakcji","Rozwiąż nowy przypadek, wskaż źródło i bezpieczną decyzję."],
  "topic-4-3-1": ["3.1, 3.7","edytor grafiki","Rysunek z podstawowych kształtów","Otwórz zapisany obraz i porównaj go ze szkicem."],
  "topic-4-3-2": ["3.1, 3.7","edytor grafiki","Kompozycja z powtórzonych elementów","Pokaż kopiowanie, przesuwanie i zmianę jednego elementu."],
  "topic-4-3-3": ["3.1, 3.6, 3.7","edytor grafiki z warstwami","Rysunek z oddzielnymi warstwami","Ukryj i pokaż jeden element bez zmiany tła."],
  "topic-4-3-4": ["3.1, 3.6, 3.7","edytor grafiki","Ilustracja do prezentacji klasowej","Porównaj zapis roboczy z eksportem oraz uzasadnij wybór narzędzia."],
  "topic-4-4-1": ["3.3, 3.7","edytor tekstu","Dokument z tytułem i dwoma akapitami","Otwórz zapisany dokument i wskaż początki akapitów."],
  "topic-4-4-2": ["3.3, 3.7","edytor tekstu","Czytelnie sformatowana notatka","Sprawdź wyróżnienia, odstępy i jednolity wygląd tytułów."],
  "topic-4-4-3": ["3.3, 3.7","edytor tekstu","Dokument z ilustracją i podpisem","Sprawdź położenie obrazu oraz jego proporcje."],
  "topic-4-4-4": ["3.3, 3.7","edytor tekstu","Gotowa ilustrowana informacja dla klasy","Odbiorca odczytuje najważniejszą wiadomość i odnajduje podpis."],
  "topic-4-5-1": ["1.2, 1.4, 2.1, 2.2, 2.3, 2.4, 3.7","Scratch","Skrypt ruchu duszka","Przewidź położenie duszka i przetestuj skrypt."],
  "topic-4-5-2": ["1.2, 1.4, 2.1, 2.2, 2.3, 2.4, 3.7","Scratch","Dialog dwóch duszków","Odtwórz dialog i sprawdź kolejność wypowiedzi."],
  "topic-4-5-3": ["1.2, 1.4, 2.1, 2.2, 2.3, 2.4, 3.7","Scratch","Duszek sterowany z klawiatury","Przetestuj wszystkie zaprogramowane klawisze."],
  "topic-4-5-4": ["1.2, 1.4, 2.1, 2.2, 2.3, 2.4, 3.7","Scratch","Samodzielna scena interaktywna","Podaj działanie oczekiwane, uruchom projekt i omów poprawkę."],
  "topic-5-1-1": ["II.3b","edytor tekstu","Notatka z uporządkowanymi akapitami","Sprawdź czytelność po ponownym otwarciu dokumentu."],
  "topic-5-1-2": ["II.3b","edytor tekstu","Instrukcja z numerowaniem i stylami","Dodaj krok w środku i sprawdź numerację."],
  "topic-5-1-3": ["I.1a, II.3b","edytor tekstu","Tabela z nagłówkami","Odczytaj z tabeli dwie wartości i sprawdź właściwy wiersz."],
  "topic-5-1-4": ["II.3b, III.2a, V.2","edytor tekstu","Tekst z ilustracją i źródłem","Sprawdź podpis, czytelność i warunki użycia grafiki."],
  "topic-5-1-5": ["II.3b, III.2a, IV.1, IV.2","edytor tekstu","Zespołowy atlas przyrodniczy","Porównaj układ dwóch stron i wskaż swój wkład."],
  "topic-5-2-1": ["II.3d, III.2a, V.2","edytor prezentacji","Prezentacja ze zdjęciem i podpisem","Uruchom pokaz i odczytaj tytuł z daleka."],
  "topic-5-2-2": ["I.1a, II.3d, III.1a, III.1b","edytor prezentacji","Album fotograficzny","Sprawdź kolejność slajdów i podpisy zdjęć."],
  "topic-5-2-3": ["II.3d","edytor prezentacji","Pokaz z przejściem i animacją","Wskaż efekt dotyczący slajdu oraz efekt obiektu."],
  "topic-5-2-4": ["II.3d, III.1a, III.1b","edytor prezentacji","Slajd z dźwiękiem lub filmem","Odtwórz multimedia od początku w trybie pokazu."],
  "topic-5-2-5": ["II.3d","edytor prezentacji","Krótka animowana opowieść","Porównaj kolejność efektów ze scenariuszem."],
  "topic-5-3-1": ["I.3","kartka lub edytor tekstu","Plan trasy zapisany krokami","Druga osoba odtwarza trasę wyłącznie z instrukcji."],
  "topic-5-3-2": ["I.2b, II.1a, II.1b, II.2","Scratch","Skrypt przejścia przez labirynt","Sprawdź drogę od startu do mety i opisz poprawkę."],
  "topic-5-3-3": ["I.2b","Scratch z rozszerzeniem Pióro","Rysunek utworzony skryptem","Porównaj narysowany kształt z planem."],
  "topic-5-3-4": ["I.2b","Scratch z rozszerzeniem Pióro","Rozeta z wielokątów","Zmień kąt obrotu i wyjaśnij efekt."],
  "topic-5-4-1": ["I.1b","Pivot Animator","Animacja z kilku klatek","Sprawdź ciągłość ruchu i czas odtwarzania."],
  "topic-5-4-2": ["I.1b, II.3a","Pivot Animator","Własna postać i krótki ruch","Przetestuj zgięcie dwóch segmentów postaci."],
  "topic-5-4-3": ["I.1b, IV.1, IV.2","Pivot Animator","Film o pokonywaniu przeszkody","Odtwórz film, porównaj ze scenariuszem i omów wkład zespołu."],
  "topic-6-1-1": ["III.2b, III.2c, V.1, V.3","szkolna poczta lub edytor tekstu","Wiadomość z tematem i podpisem","Sprawdź odbiorcę i czytelność prośby."],
  "topic-6-1-2": ["V.1, V.2, V.3","przeglądarka i fikcyjne wiadomości","Plan reakcji na próbę wyłudzenia","Uzasadnij wybór bezpiecznego kanału zgłoszenia."],
  "topic-6-1-3": ["III.2a, V.1, V.2, V.3","wyszukiwarka i edytor tekstu","Notatka porównująca źródła","Wskaż jeden wspólny fakt i nazwij źródła."],
  "topic-6-1-4": ["V.1, V.2, V.3","lokalny symulator modelu i przeglądarka","Porównanie działania modelu na przykładach","Na tych samych danych testowych wyjaśnij jedną pomyłkę."],
  "topic-6-2-1": ["II.3c","Microsoft Excel","Arkusz z planem lekcji","Sprawdź adresy komórek i otwórz zapisany skoroszyt."],
  "topic-6-2-2": ["II.3c","Microsoft Excel","Sformatowany i posortowany ranking","Sprawdź kolejność wyników i zachowanie całych rekordów."],
  "topic-6-2-3": ["II.3c","Microsoft Excel","Arkusz budżetu kieszonkowego","Zmień wydatek i sprawdź zależny od niego wynik."],
  "topic-6-2-4": ["II.3c","Microsoft Excel","Wykres wyników wyborów","Porównaj dwie wartości na wykresie z tabelą źródłową."],
  "topic-6-2-5": ["II.3c, II.4","wspólny arkusz kalkulacyjny","Tabela z wynikami pracy grupy","Pokaż źródło danych, wniosek i wkład każdej osoby."],
  "topic-6-3-1": ["IV.1, IV.2, IV.3","Scratch","Omówiony projekt lub propozycja remiksu","Pokaż źródło projektu, swoją zmianę i życzliwą informację zwrotną."],
  "topic-6-3-2": ["I.2a, I.2b, I.3, II.1, II.2","Scratch","Projekt reagujący na komunikaty","Przewidź kolejność zdarzeń i uruchom projekt."],
  "topic-6-3-3": ["I.2a, I.2b, I.3, II.1, II.2","Scratch","Gra zapisująca wyniki","Przetestuj dodanie dwóch różnych wyników do listy."],
  "topic-6-4-1": ["II.3a","GIMP","Ilustracja z warstwami","Ukryj jedną warstwę i sprawdź pozostałe."],
  "topic-6-4-2": ["II.3a, II.4","GIMP","Fotomontaż wraz z wersją roboczą","Porównaj krawędzie montażu w powiększeniu."],
  "topic-6-4-3": ["II.3a, II.3d","Canva","Projekt graficzny dla wybranego odbiorcy","Uzasadnij wybór kompozycji i odczytaj informacje w eksporcie."],
  "topic-6-4-4": ["II.3a, II.4","edytor grafiki","Zespołowy obraz pamiątkowy","Wskaż pochodzenie elementów oraz poprawkę po uwadze grupy."],
  "topic-7-1-1": ["I.3, III.3, V.1, V.2, V.3","karty binarne lub edytor tekstu","Zapis kodowania i odkodowania liczby","Sprawdź wyniki sumą wartości pozycji."],
  "topic-7-2-1": ["II.3.d, II.4","Pracownia HTML","Pierwsza strona z nagłówkiem i akapitem","Zmień tytuł karty oraz nagłówek i porównaj efekty."],
  "topic-7-2-2": ["II.3.d, II.4","edytor HTML i przeglądarka","Samodzielna strona WWW","Otwórz pobrany plik, sprawdź odsyłacze i opis obrazu."],
  "topic-7-4-1": ["II.3.b, II.4","edytor tekstu","Dokument ze stylami akapitów","Zmień jeden styl i oceń spójność tekstu."],
  "topic-7-4-2": ["II.3.b, II.4","edytor tekstu","Tekst z obiektami i podpisami","Sprawdź układ i odczyt podpisów po eksporcie."],
  "topic-7-4-3": ["II.3.b, II.4","edytor tekstu","Dokument wielostronicowy","Sprawdź numerację stron, nagłówki i spis treści."],
  "topic-7-4-4": ["II.3.b, II.4, IV.1","edytor tekstu","Wspólna e-gazetka","Oceń jakość źródeł, skład stron i wkład zespołu."],
  "topic-7-5-1": ["II.3.d, II.4","edytor prezentacji","Pokaz multimedialny","Odtwórz pokaz i przetestuj multimedia na drugim stanowisku."],
  "topic-7-5-2": ["II.3.a, II.4, III.2","edytor wideo","Zmontowany film","Odtwórz wyeksportowany plik i sprawdź obraz oraz dźwięk."],
  "topic-8-1-1": ["II.3c, II.4","Microsoft Excel","Tabela z kopiowanymi formułami","Zmień dane i sprawdź przeliczenie co najmniej dwóch wierszy."],
  "topic-8-1-2": ["II.3c, II.4","Microsoft Excel","Skoroszyt z funkcjami i stałym adresem","Skopiuj formułę i porównaj adresy w dwóch komórkach."],
  "topic-8-1-3": ["II.3c, II.4, II.5","Microsoft Excel","Wykres z opisem i wnioskiem","Porównaj etykiety z danymi oraz uzasadnij typ wykresu."],
  "topic-8-1-4": ["II.3c, II.4, II.5","Microsoft Excel","Wynik analizy lub symulacji","Zmień jeden parametr i porównaj wynik z przewidywaniem."],
  "topic-8-3": ["Wariant C++ zamiast działu Python. Brak osobnej pozycji w rozkładzie Python.","szkolne IDE C++","Program algorytmiczny i testy","Uruchom kod na danych zwykłych i brzegowych oraz wyjaśnij wynik."],
  "topic-8-4-1": ["II.3c, II.4, IV.1","arkusz kalkulacyjny i edytor tekstu","Dokumentacja wydarzenia sportowego","Sprawdź zgodność zbiorczych wyników z danymi i podziałem zadań."],
  "topic-8-4-2": ["II.1, II.2, IV.1","szkolne IDE lub środowisko blokowe","Program sterujący obiektem","Przeprowadź test zwykły i brzegowy oraz omów poprawkę."],
};

export function lessonMetadata(item) {
  const id = typeof item === 'string' ? item : item?.id;
  const authored = auditNotes[id];
  const row = lessonRows[id];
  if (!row && !authored) return null;
  const grade = Number(id.split('-')[1]);
  const basis = grade === 4 ? 'Podstawa 2026 · IV–VI' :
    grade < 7 ? 'Podstawa dotychczasowa · IV–VI' : 'Podstawa dotychczasowa · VII–VIII';
  const [point, tool, product, assessment] = row ||
    [authored.curriculumPoints, authored.application, authored.outcome, authored.assessment];
  return {basis, point, year:'2026/2027', tool, product, assessment};
}
