# Sprawdzian Excel — klasa 8

Wejście: Klasa 8 → Sprawdzian wiadomości (#class/8/exam).
Uczeń podaje wspólne hasło, losuje jedną grupę i pobiera oryginalny XLSX.
Przydział jest pamiętany w sessionStorage dla karty i tury. Nowy uczeń czyści przydział.
Nie ma gwarancji równych grup ani blokady nowej karty przeglądarki.

Zmiana hasła: Panel nauczyciela → Sprawdzian Excel — klasa 8.
Podaj obecne hasło sprawdzianu, nowe hasło i jego powtórzenie.
Przycisk publikuje ustawienia od razu; nie wymaga ponownego wdrożenia strony.
Jeśli są lokalne zmiany materiałów, najpierw je opublikuj albo pobierz wersję z chmury.
Nie myl hasła sprawdzianu z hasłem konta nauczyciela.

Pliki JSON grup zawierają AES-256-GCM oryginalnych XLSX. default.json zawiera klucz
opakowany hasłem (PBKDF2-SHA256, 210000 iteracji, losowa sól, AES-GCM).
Aktualne opakowanie klucza i identyfikator tury są zapisywane jako zastrzeżony rekord
system-excel8-access w istniejącym school/content. Rekord jest ukryty w bibliotece
i edycji materiałów, ale pozostaje w kopiach bazy JSON. Nie usuwaj go z kopii.
Transakcja zachowuje pozostałe materiały, weryfikuje rewizję i wymaga konta nauczyciela.
Obowiązują istniejące reguły Firestore.

To organizacja dostępu do wspólnego zestawu, nie chroniony system egzaminacyjny.
Poprzednie ustawienia z historii repozytorium/kopii bazy i poprzednie hasło nadal
mogą odszyfrować te same pliki. Zmiana hasła nie unieważnia pobranych arkuszy.
Do nowego poufnego zestawu trzeba przygotować nowe arkusze i nowy klucz.
Hasło nie jest zapisywane jawnie w konfiguracji. Nie logujemy danych uczniów.

Aktualny zestaw: excel8-20261116. Nowe pliki mają osobny klucz oraz wersjonowane adresy. Ustawienia w chmurze obowiązują tylko wtedy, gdy ich dataset jest zgodny z EXAM_SET; stare ustawienia są pomijane. Każda zmiana hasła zachowuje identyfikator aktualnego zestawu.

Wersje nauczyciela A/B/C znajdują się pod formularzem zmiany hasła w panelu.
Pliki nie są publikowane w GitHub Pages ani w publicznym school/content.
Są przechowywane w Firestore: teacherExams/excel8-20261116/files/{A,B,C}.
Każdy dokument zawiera version=1, content (base64 XLSX), sha256 i filename.
Reguły serwera zezwalają na pojedynczy odczyt tylko UID nauczyciela.
Listowanie i zapis z aplikacji są zabronione; pliki publikuje właściciel przez IAM.
Aplikacja pobiera dokument z serwera, sprawdza sesję i SHA-256 przed pobraniem.
Aktualizacja plików nauczyciela wymaga zachowania tego schematu i limitu 1 MiB dokumentu.
Przy wdrażaniu reguł zachowano istniejące reguły serwera dla school/content.

Poprawka H23: usunięto scaloną ramkę H35:L36 w arkuszu Zadanie 3.
Excel potrzebuje wolnego miejsca również na początkowy obszar pustej tabeli przestawnej.
Wstawianie od H23 i sumy grup A/B/C sprawdzono w natywnym Excelu.
