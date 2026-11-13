# Pracownia Python

Samodzielny moduł GitHub Pages, dostępny w „Ćwiczeniach z kodem” oraz zadaniach klas 7 i 8. Nie wymaga backendu ani kont uczniów.

## Materiały

24 autorskie lekcje: wyświetlanie tekstu, zmienne i obliczenia; wejście i warunki; pętle, listy i funkcje; minimum, wyszukiwanie i sortowanie; projekty budżetu, quizu i gry tekstowej. Każda lekcja ma wyjaśnienie, przykład, polecenie, podpowiedzi, rozwiązanie i propozycję eksperymentu.

Inspiracje metodyczne (własna treść ćwiczeń, bez kopiowania kursów):

- [Code.org / CodeAI Python Lab](https://code.org/en-US/tools/python-lab): programowanie w przeglądarce i projekty.
- [Khan Academy — kurs Python](https://blog.khanacademy.org/introducing-khan-academys-new-intro-to-computer-science-course-with-python/): małe wyzwania, przykłady do zmieniania, bieżąca informacja zwrotna.
- [Raspberry Pi Foundation — Introduction to Python](https://projects.raspberrypi.org/en/pathways/python-intro): stopniowe przejście do własnych projektów.

## Wykonanie i ograniczenia

Prawdziwy CPython przez [Pyodide 314.0.7](https://pyodide.org/en/stable/), przypięty do konkretnej wersji na `https://unpkg.com/pyodide@314.0.7/`. Pierwszy start pobiera około 13 MB nieskompresowanych plików silnika; przeglądarka może je buforować. Sieć szkolna musi pozwalać na dostęp do `unpkg.com`. Błąd pobierania nie usuwa kodu i umożliwia ponowną próbę.

`runtime.js` tworzy iframe z `sandbox="allow-scripts"` (bez wspólnego originu). Iframe uruchamia worker z blobu, dynamicznie importujący moduły Pyodide. Taki bootstrap obsługuje również nieprzezroczysty origin iframe w Chromium. Wiadomości są weryfikowane przez `event.source`, a odpowiedzi programu przypisane do identyfikatora wywołania. Przerwanie usuwa cały iframe z workerem. Zmiana generacji chroni przed spóźnionym pobraniem przerwanego uruchomienia.

Kod ucznia nie ma dostępu do dokumentu i magazynu danych portalu. CSP ogranicza pobieranie zasobów w środowisku wykonawczym do dostawcy silnika. Wynik jest wstawiany jako tekst, nigdy jako HTML. To pracownia edukacyjna, nie platforma do bezpiecznego wykonywania dowolnego wrogiego kodu ani chroniony system egzaminacyjny.

Obsługiwane są programy konsolowe i podstawowa biblioteka standardowa. Bez instalacji pakietów, GUI pulpitu i turtle. `input()` pobiera kolejne wiersze z pola odpowiedzi. Wynik zawiera pytania i użyte odpowiedzi. Każdy test ma nową przestrzeń nazw. Limit wykonania: 6 sekund na serię; limit drukowanego wyniku: 20 000 znaków. Stop przerywa także ładowanie silnika. Kod: maks. 30 000 znaków.

Sprawdzarka porównuje rzeczywisty wynik dla 53 przypadków testowych oraz obecność ćwiczonych konstrukcji AST. Nie jest dowodem poprawności dla wszystkich danych. Przycisk „Sprawdź zadanie” zalicza ćwiczenie; „Uruchom” tylko wykonuje kod. Edycja kodu usuwa poprzednie zaliczenie. Przykładowe rozwiązania są jawne.

## Sesja i pliki

Przycisk „Zwiń menu / Rozwiń menu” w stałym pasku górnym oddaje całą szerokość panelu roboczemu. Preferencja na komputerze jest zapisywana osobno pod kluczem `python-pracownia-sidebar-open`. Na małych ekranach lista jest domyślnie zwinięta i zamyka się po wybraniu lekcji. Tryb skupienia tymczasowo chowa menu; po wyłączeniu przywraca preferencję użytkownika. Zapis i import plików pozostają dostępne pod edytorem. Testy układu: `node tests/python-layout.cjs`.

`localStorage`: `python-pracownia-session-v1`, osobny od pracowni HTML. Sesja 45 minut przetrwa F5; po jej upływie postęp jest automatycznie czyszczony. Nowy uczeń dostaje nowy identyfikator; stare karty wykrywają zmianę. Dostępne jest przedłużenie o 15 minut i ostrzeżenie przed końcem sesji. Brak dostępu do localStorage przełącza pracę do pamięci bieżącej strony.

Eksport/import `.py` dotyczy bieżącego ćwiczenia. Eksport/import `.json` obejmuje szkice, odpowiedzi do input() i zaliczenia. Import wymaga poprawnego identyfikatora aplikacji, wersji i znanych kluczy; nie uruchamia kodu. Potwierdzenie poprzedza zastąpienie pracy. Plik JSON jest kopią ucznia, a nie certyfikatem wyniku. Dane nie są automatycznie wysyłane nauczycielowi.

## Testy

Uruchom serwer statyczny repozytorium na porcie 4182, a następnie `node tests/python-lab.cjs` (Playwright). Opcjonalnie ustaw `BROWSER_EXE`, `BASE_URL` i `PYODIDE_CACHE` — ostatni wskazuje lokalne pliki tej samej wersji Pyodide i służy tylko testom sieciowym.

Sprawdzane są: wszystkie rozwiązania i wymagania, błędy wraz z numerami linii, izolacja przestrzeni nazw, limit wyjścia i nieskończona pętla, odhaczanie i unieważnienie postępu, F5, import/eksport obu formatów, automatyczny reset i druga karta, brak CDN, widoki 390/800/1366/1920 px, motyw ciemny, tryb skupienia i wpis w katalogu obu klas.
