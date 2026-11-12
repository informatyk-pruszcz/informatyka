# Informatyka w akcji

Statyczna platforma dla klas IV–VIII. Uruchom lokalne HTTP z katalogu repozytorium (np. `python -m http.server 4218`). Adresy `#item/…` identyfikują materiały również po aktualizacji notatek.

## Biblioteka i jej kopia

1. W panelu nauczyciela wybierz **Eksportuj bazę (JSON)**. Zachowaj plik sprzed większej zmiany na dysku nauczyciela. Kopia obejmuje materiały edytowalne i lokalne szkice. Wbudowane lekcje i załączniki przywraca się z historii repozytorium.
2. Aby odtworzyć bibliotekę, wybierz **Importuj bazę (JSON)**. Sprawdź liczbę materiałów, zapisz kopię obecnego stanu i potwierdź zastąpienie lokalnej bazy. Format v1 sprzed dodania metryki jest nadal obsługiwany.
3. Sprawdź zmieniony materiał i opublikuj z panelu. Szkic pozostaje na komputerze nauczyciela i w jego eksporcie. Oznaczenie opublikowanego wpisu jako szkicu wycofuje go z biblioteki chmurowej przy kolejnej publikacji.
4. Przy konflikcie dwóch zapisów zachowaj swój JSON, pobierz aktualną bazę, nanieś ponownie swoje poprawki i opublikuj. Import pełnej starej kopii zastąpiłby także nowsze prace innego redaktora.

Kopia ucznia z Pracowni HTML jest osobnym formatem. Uczeń eksportuje ją przed końcem sesji i przywraca przyciskiem **Wczytaj postęp (.json)**. Sesja HTML trwa 45 minut z możliwością wydłużenia. W klawiaturze 45 minut liczy się od aktywności.

## Autoryzacja i odtwarzalny test

Portal czyta pojedynczy publiczny dokument `school/content`. Kontrolę zapisu wymusza Firestore. Wzorzec w `firestore.rules` ogranicza zapis do UID nauczyciela, dopuszcza następną rewizję i serwerowy znacznik czasu. Pozostałe dokumenty są domyślnie niedostępne. Przy zmianie konta trzeba zmienić UID zarówno w regułach, jak i w `config.js`.

Do odtworzenia próby poza produkcją użyj Firebase CLI z JDK oraz Node.js z fetch:

```sh
firebase emulators:exec --project demo-informatyka --only firestore "node tests/firestore.mjs"
```

Test działa tylko na 127.0.0.1:8194 i czyści projekt demonstracyjny. Sprawdza próbę anonimową, inne UID, nauczyciela, dwa zapisy tej samej rewizji i końcową zawartość. **Publikacja GitHub Pages nie wdraża reguł produkcyjnej bazy.** Właściciel porównuje reguły w konsoli Firebase z wersją repozytorium i uwzględnia inne usługi używające tej samej bazy przed ich publikacją.

## Odbiór wersji

Trener w `konkursy/kuratoryjny-trener.html` zawiera 214 ćwiczeń z 13 arkuszy. Rozszerzenie `kuratoryjny-zadania-2024-2026.js` dodaje 152 części treningowe na podstawie 8 PDF-ów w `konkursy/arkusze/`. Każda część ma trwały identyfikator, źródło (plik, numer zadania i strona), wskazówkę oraz rozwiązanie. To adaptacje wybranych poleceń, a nie odwzorowanie pełnych testów ani oficjalny klucz. Oryginalne arkusze pozostają dostępne do pobrania.

W adaptacji doprecyzowano m.in. dzielenie całkowite `//` w Pythonie 3, osadzone i połączone multimedia, jednostki MB/Mb, najmniejszą cyfrę w nierówności HEX oraz zapis HTML `target="_blank"`. Nowe zadania przyznają po 1 punkcie treningowym. Klucz zapisu ucznia i identyfikatory wcześniejszych ćwiczeń nie zostały zmienione.

Test tego modułu: uruchom lokalny serwer na porcie 4239 i wykonaj `node tests/contest.cjs` w środowisku z Playwright. Test sprawdza obliczenia, osiem plików źródłowych, wszystkie nowe odpowiedzi, filtry, zachowanie starego postępu, brak podwójnego punktowania, odświeżenie i szerokość 390 px. Obsługuje zmienne `BASE_URL` i `BROWSER_EXE`.

Na lokalnie uruchomionym serwisie wykonaj `node tests/school.cjs` w środowisku z Playwright. Opcjonalne zmienne: `BASE_URL` i `BROWSER_EXE` (pełna ścieżka do Edge). Test przechodzi przez wszystkie 82 tematy, pobiera XLSX, ocenia VAT, zmienia stronę danych i sprawdza zegary pracowni.

Dodatkowo `node tests/library.cjs` sprawdza odtwarzanie kopii i szkice na izolowanej bibliotece testowej. `node --test tests/pilots.test.cjs` uruchamia próby pięciu modułów.

W klasie sprawdź dostępność z NVDA, prawy Alt na używanym układzie Windows, czytelność z ostatniej ławki i pracę całej grupy na szkolnych stanowiskach. Po lekcji zbierz realny produkt ucznia i jedną poprawkę po informacji zwrotnej. Quiz ani pokaz symulatora nie zastępuje oceny oddanej pracy.
