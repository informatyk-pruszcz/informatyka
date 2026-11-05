export const grade7Notes = {
  "topic-7-1-1": {
    "summary": "Tajny kod maszyn: liczby z zer i jedynek",
    "pending": false,
    "source": "Na podstawie materiału nauczyciela, rozkładu klasy VII i istniejących ćwiczeń Pracowni HTML. Autorskie objaśnienia i ilustracje.",
    "body": "<h2>🚀 Tajny kod maszyn: liczby z zer i jedynek</h2><p><strong>Temat oficjalny:</strong> 1.1. Komputer w życiu człowieka — część 1: System binarny | <strong>Data:</strong> ....................</p><h2>🎯 TWOJA MISJA NA DZIŚ</h2><blockquote>Jak zapisać trzynaście, mając tylko zera i jedynki? Nauczysz się zamieniać liczby w obie strony.</blockquote><h2>🧠 KLUCZ DO GŁOWY</h2><h3>1. 🔹 System dwójkowy i karty z kropkami</h3><p><strong>Co to jest:</strong> System dwójkowy zapisuje liczby cyframi <strong>0 i 1</strong>.</p><p><strong>Przykład:</strong> Każda karta ma dwa razy więcej kropek niż poprzednia.</p><p>Od prawej: <strong>1 → 2 → 4 → 8</strong>.</p><img src=\"https://informatyk-pruszcz.github.io/informatyka/k7-binary.svg\" alt=\"Karty od lewej: 8, 4, 2, 1. Kod 1011: odkryte 8, 2 i 1; karta 4 zakryta. Suma 11.\"><p><strong>1</strong> oznacza kartę odkrytą. <strong>0</strong> oznacza kartę zakrytą.</p><p>Cztery karty wystarczą dla liczb od <strong>0 do 15</strong>.</p><h3>2. 🔹 Z binarnego na dziesiętny: odkoduj</h3><p><strong>Co to jest:</strong> Dodajesz wartości kart oznaczonych jedynkami.</p><p><strong>Przykład:</strong> Odczytaj <strong>1011₂</strong>. Małe ₂ oznacza system dwójkowy.</p><pre><code>Wartości:  8  4  2  1\nKod:       1  0  1  1\nDodaj:     8 +   2 +1 = 11</code></pre><p><strong>1011₂ = 11</strong> w systemie dziesiętnym.</p><p>Nie dodawaj samych cyfr. Dodawaj <strong>wartości ich miejsc</strong>.</p><h3>3. 🔹 Z dziesiętnego na binarny: zakoduj</h3><p><strong>Co to jest:</strong> Dobierasz karty od największej, aż uzyskasz wskazaną liczbę.</p><p><strong>Przykład:</strong> Zapisz liczbę <strong>13</strong> za pomocą kart.</p><ol><li><strong>8 mieści się w 13.</strong> Wpisz 1. Zostaje 5.</li><li><strong>4 mieści się w 5.</strong> Wpisz 1. Zostaje 1.</li><li><strong>2 nie mieści się w 1.</strong> Wpisz 0.</li><li><strong>1 mieści się w 1.</strong> Wpisz 1. Zostaje 0.</li></ol><pre><code>Karty:  8  4  2  1\nKod:    1  1  0  1</code></pre><p>Odczytaj od lewej: <strong>13 = 1101₂</strong>.</p><p>Sprawdź: <strong>8 + 4 + 1 = 13</strong>.</p><h2>⭐ ZŁOTA ZASADA (PRO-TIP)</h2><blockquote><strong>💡 ZAPAMIĘTAJ:</strong> Jedynka: dodaj wartość karty. Zero: pomiń kartę.</blockquote><h2>📖 MINI-SŁOWNICZEK TRUDNYCH SŁÓW</h2><ul><li><strong>Bit (b):</strong> Jedna cyfra binarna: 0 lub 1.</li><li><strong>Bajt (B):</strong> Grupa dokładnie ośmiu bitów.</li></ul><h2>🎮 STREFA AKCJI</h2><p>Dwie minuty dla Ciebie. Spróbuj bez zaglądania do notatki.</p><ol><li>Prawda czy fałsz? Zakryta karta oznacza 0. [ P / F ]</li><li>Wyzwanie 10 sekund: jaką liczbę oznacza 0101₂?</li><li>Z gwiazdką: zapisz 15 za pomocą czterech kart.</li></ol>",
    "quiz": [
      {
        "q": "Prawda czy fałsz? Zakryta karta oznacza 0. [ P / F ]",
        "a": "Prawda. Nie dodajesz wartości zakrytej karty."
      },
      {
        "q": "Wyzwanie 10 sekund: jaką liczbę oznacza 0101₂?",
        "a": "5, ponieważ 4 + 1 = 5."
      },
      {
        "q": "Z gwiazdką: zapisz 15 za pomocą czterech kart.",
        "a": "1111₂. Wszystkie karty odkryte: 8 + 4 + 2 + 1 = 15."
      }
    ]
  },
  "topic-7-2-1": {
    "summary": "Pierwszy znacznik, pierwszy efekt!",
    "pending": false,
    "source": "Na podstawie materiału nauczyciela, rozkładu klasy VII i istniejących ćwiczeń Pracowni HTML. Autorskie objaśnienia i ilustracje.",
    "body": "<h2>🚀 Pierwszy znacznik, pierwszy efekt!</h2><p><strong>Temat oficjalny:</strong> 2.1. Zasady tworzenia stron internetowych | <strong>Data:</strong> ....................</p><h2>🎯 TWOJA MISJA NA DZIŚ</h2><blockquote>Jak zamienić zwykłe zdanie w nagłówek? Napiszesz HTML i zobaczysz wynik w naszej pracowni.</blockquote><h2>🧠 KLUCZ DO GŁOWY</h2><h3>1. 🔹 HTML opisuje treść</h3><p><strong>Co to jest:</strong> HTML oznacza elementy strony za pomocą znaczników.</p><p><strong>Przykład:</strong> Tytuł hobby umieść między <code>&lt;h1&gt;</code> i <code>&lt;/h1&gt;</code>.</p><pre><code>&lt;h1&gt;Moje hobby&lt;/h1&gt;\n&lt;p&gt;Lubię jeździć na rowerze.&lt;/p&gt;</code></pre><p><a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#pierwszy-naglowek\">Ćwicz: Pierwszy nagłówek →</a> Następnie <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#akapity\">Dwa zdania, dwa akapity →</a></p><p>Sam Enter w kodzie <strong>nie tworzy akapitu</strong> na stronie.</p><h3>2. 🔹 Znaczniki mają kolejność</h3><p><strong>Co to jest:</strong> Elementy mogą znajdować się wewnątrz innych elementów.</p><p><strong>Przykład:</strong> Wyróżnij słowo wewnątrz akapitu.</p><pre><code>&lt;p&gt;Zakładam &lt;strong&gt;kask&lt;/strong&gt;.&lt;/p&gt;</code></pre><p>Najpierw zamknij strong, potem p.</p><p><a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#hierarchia\">Ćwicz: Tytuł i śródtytuł →</a> · <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#wyroznienia\">Ważne słowa →</a> · <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#napraw-zagniezdzenie\">Detektyw błędów →</a></p><h3>3. 🔹 Dokument ma head i body</h3><p><strong>Co to jest:</strong> head zawiera informacje, a body widoczną treść.</p><p><strong>Przykład:</strong> title nazywa kartę; h1 jest nagłówkiem strony.</p><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"pl\"&gt;\n&lt;head&gt;\n  &lt;meta charset=\"UTF-8\"&gt;\n  &lt;title&gt;Mój klub&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;h1&gt;Klub odkrywców&lt;/h1&gt;\n  &lt;p&gt;Uczymy się tworzyć strony.&lt;/p&gt;\n&lt;/body&gt;\n&lt;/html&gt;</code></pre><p><strong>DOCTYPE</strong> wskazuje HTML5. <strong>UTF-8</strong> pozwala poprawnie zapisywać polskie znaki.</p><p><a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#szkielet\">Ćwicz: Cały dokument HTML5 →</a></p><h2>⭐ ZŁOTA ZASADA (PRO-TIP)</h2><blockquote><strong>💡 ZAPAMIĘTAJ:</strong> Otwórz → wpisz treść → zamknij → sprawdź.</blockquote><h2>📖 MINI-SŁOWNICZEK TRUDNYCH SŁÓW</h2><ul><li><strong>Znacznik:</strong> Oznaczenie elementu, np. nagłówka.</li><li><strong>Atrybut:</strong> Dodatkowa informacja w znaczniku.</li></ul><h2>🛠️ W PRACOWNI</h2><ol><li>Otwórz wskazane ćwiczenie. Przeczytaj jego polecenie.</li><li>Wpisz kod w edytorze. Obserwuj podgląd na żywo.</li><li>Kliknij <strong>Sprawdź</strong>. Popraw wskazane elementy.</li><li>Jeśli utkniesz, skorzystaj z podpowiedzi.</li></ol><h2>📎 ŚCIĄGA HTML — miej pod ręką</h2><p>W pracowni znajdziesz także przycisk <strong>Ściąga HTML</strong>.</p><ul><li><strong>główny nagłówek</strong><pre><code>&lt;h1&gt;Tytuł&lt;/h1&gt;</code></pre></li><li><strong>śródtytuł</strong><pre><code>&lt;h2&gt;Część strony&lt;/h2&gt;</code></pre></li><li><strong>akapit</strong><pre><code>&lt;p&gt;Treść.&lt;/p&gt;</code></pre></li><li><strong>ważna treść</strong><pre><code>&lt;strong&gt;Ważne&lt;/strong&gt;</code></pre></li><li><strong>nacisk na słowo</strong><pre><code>&lt;em&gt;Naprawdę&lt;/em&gt;</code></pre></li><li><strong>lista punktowana</strong><pre><code>&lt;ul&gt;&lt;li&gt;Woda&lt;/li&gt;&lt;/ul&gt;</code></pre></li><li><strong>lista numerowana</strong><pre><code>&lt;ol&gt;&lt;li&gt;Start&lt;/li&gt;&lt;/ol&gt;</code></pre></li><li><strong>link do strony</strong><pre><code>&lt;a href=\"https://zpe.gov.pl/\"&gt;Materiały&lt;/a&gt;</code></pre></li><li><strong>obraz z opisem</strong><pre><code>&lt;img src=\"park.svg\" alt=\"Drzewa w parku\"&gt;</code></pre></li><li><strong>link do części strony</strong><pre><code>&lt;a href=\"#plan\"&gt;Plan&lt;/a&gt;</code></pre></li><li><strong>cel powyższego linku</strong><pre><code>&lt;h2 id=\"plan\"&gt;Plan&lt;/h2&gt;</code></pre></li><li><strong>tabela: tr to wiersz, th nagłówek, td dane</strong><pre><code>&lt;table&gt;&lt;tr&gt;&lt;th&gt;Czas&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;10:00&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;</code></pre></li></ul><p><strong>Uwaga:</strong> img i meta nie mają znaczników zamykających.</p><p><strong>Dla chętnych:</strong> header, main, footer opisują części strony.</p><pre><code>&lt;header&gt;&lt;h1&gt;Nasz klub&lt;/h1&gt;&lt;/header&gt;\n&lt;main&gt;&lt;p&gt;Tu działamy.&lt;/p&gt;&lt;/main&gt;\n&lt;footer&gt;&lt;p&gt;Projekt szkolny&lt;/p&gt;&lt;/footer&gt;</code></pre><p><strong>CSS</strong> zmienia wygląd. Przykład koloru z pracowni:</p><pre><code>&lt;h1 style=\"color: teal;\"&gt;Nasz klub&lt;/h1&gt;</code></pre><h2>🎮 STREFA AKCJI</h2><p>Dwie minuty dla Ciebie. Spróbuj bez zaglądania do notatki.</p><ol><li>Prawda czy fałsz? title i h1 mają tę samą rolę. [ P / F ]</li><li>Wyzwanie 10 sekund: jak zamkniesz znacznik p?</li><li>Z gwiazdką: popraw <p><strong>Witaj!</p></strong>.</li></ol>",
    "quiz": [
      {
        "q": "Prawda czy fałsz? title i h1 mają tę samą rolę. [ P / F ]",
        "a": "Fałsz. title opisuje kartę, h1 główny nagłówek treści."
      },
      {
        "q": "Wyzwanie 10 sekund: jak zamkniesz znacznik p?",
        "a": "Wpisz </p>."
      },
      {
        "q": "Z gwiazdką: popraw <p><strong>Witaj!</p></strong>.",
        "a": "<p><strong>Witaj!</strong></p>"
      }
    ]
  },
  "topic-7-2-2": {
    "summary": "Zbuduj stronę swojego klubu!",
    "pending": false,
    "source": "Na podstawie materiału nauczyciela, rozkładu klasy VII i istniejących ćwiczeń Pracowni HTML. Autorskie objaśnienia i ilustracje.",
    "body": "<h2>🚀 Zbuduj stronę swojego klubu!</h2><p><strong>Temat oficjalny:</strong> 2.2. Tworzenie własnej strony internetowej | <strong>Data:</strong> ....................</p><h2>🎯 TWOJA MISJA NA DZIŚ</h2><blockquote>Połącz nagłówki, listy, obraz i link. Zbudujesz stronę fikcyjnego klubu oraz pobierzesz gotowy plik.</blockquote><h2>🧠 KLUCZ DO GŁOWY</h2><h3>1. 🔹 Zaplanuj treść</h3><p><strong>Co to jest:</strong> Plan określa kolejność informacji na stronie.</p><p><strong>Przykład:</strong> Nazwa klubu → opis → wyposażenie → obraz.</p><p><strong>ul</strong> tworzy listę punktowaną. <strong>ol</strong> tworzy listę numerowaną.</p><p>Każdy punkt umieść w <strong>li</strong>.</p><p><a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#lista-punktowana\">Ćwicz: Lista rzeczy na wycieczkę →</a> · <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#lista-numerowana\">Instrukcja krok po kroku →</a></p><h3>2. 🔹 Dodaj obraz i odsyłacz</h3><p><strong>Co to jest:</strong> Obraz ilustruje treść; odsyłacz wskazuje inne miejsce.</p><p><strong>Przykład:</strong> Użyj obrazu dostępnego w naszej pracowni.</p><pre><code>&lt;img src=\"park.svg\" alt=\"Drzewa i ścieżka w parku\" width=\"320\"&gt;\n&lt;a href=\"https://zpe.gov.pl/\"&gt;Materiały do nauki&lt;/a&gt;</code></pre><p><strong>src</strong> wskazuje obraz. <strong>alt</strong> opisuje jego treść.</p><p><strong>href</strong> wskazuje cel linku.</p><p><a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#obraz\">Ćwicz: Obraz, który coś opowiada →</a> · <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#link\">Klikalny odsyłacz →</a> · <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#kotwica\">Skok do części strony →</a></p><blockquote>Linki zewnętrzne są nieaktywne w podglądzie pracowni. Sprawdzisz je w pobranym pliku HTML. Kotwice działają w podglądzie.</blockquote><h3>3. 🔹 Połącz i sprawdź</h3><p><strong>Co to jest:</strong> Testowanie polega na sprawdzaniu działania kolejnych elementów.</p><p><strong>Przykład:</strong> Dodaj listę, sprawdź ją, dopiero potem dodaj obraz.</p><p><a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#case-hobby\">Projekt: Strona o pasji →</a></p><ol><li>Uzupełnij title, h1 oraz dwa akapity.</li><li>Dodaj h2 i listę ul z trzema punktami.</li><li>Wstaw park.svg i własny opis alt.</li><li>Kliknij <strong>Sprawdź</strong> i przeczytaj wymagania.</li><li>Pobierz HTML. Otwórz plik w przeglądarce.</li></ol><p>Pracownia dołącza obraz do eksportowanego pliku.</p><p><strong>Kolejny krok:</strong> <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#tabela\">Tabela, która porządkuje dane →</a> → <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#case-wydarzenie\">Zaproszenie na wydarzenie →</a></p><p><strong>Dla chętnych:</strong> <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#css\">Pierwszy kolor z CSS →</a> · <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#sekcje\">Strona ma swoje części →</a> · <a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#case-przewodnik\">Mały przewodnik →</a></p><p><a href=\"https://informatyk-pruszcz.github.io/informatyka/html-lab/index.html#napraw-wizytowke\">Sprawdź się: Serwis naprawy stron →</a></p><h2>⭐ ZŁOTA ZASADA (PRO-TIP)</h2><blockquote><strong>💡 ZAPAMIĘTAJ:</strong> Obraz: src i alt. Link: href i czytelny opis.</blockquote><h2>📖 MINI-SŁOWNICZEK TRUDNYCH SŁÓW</h2><ul><li><strong>Odsyłacz:</strong> Klikalny element prowadzący do celu.</li><li><strong>Kotwica:</strong> Cel linku wewnątrz tej samej strony.</li></ul><h2>📎 ŚCIĄGA HTML — miej pod ręką</h2><p>W pracowni znajdziesz także przycisk <strong>Ściąga HTML</strong>.</p><ul><li><strong>główny nagłówek</strong><pre><code>&lt;h1&gt;Tytuł&lt;/h1&gt;</code></pre></li><li><strong>śródtytuł</strong><pre><code>&lt;h2&gt;Część strony&lt;/h2&gt;</code></pre></li><li><strong>akapit</strong><pre><code>&lt;p&gt;Treść.&lt;/p&gt;</code></pre></li><li><strong>ważna treść</strong><pre><code>&lt;strong&gt;Ważne&lt;/strong&gt;</code></pre></li><li><strong>nacisk na słowo</strong><pre><code>&lt;em&gt;Naprawdę&lt;/em&gt;</code></pre></li><li><strong>lista punktowana</strong><pre><code>&lt;ul&gt;&lt;li&gt;Woda&lt;/li&gt;&lt;/ul&gt;</code></pre></li><li><strong>lista numerowana</strong><pre><code>&lt;ol&gt;&lt;li&gt;Start&lt;/li&gt;&lt;/ol&gt;</code></pre></li><li><strong>link do strony</strong><pre><code>&lt;a href=\"https://zpe.gov.pl/\"&gt;Materiały&lt;/a&gt;</code></pre></li><li><strong>obraz z opisem</strong><pre><code>&lt;img src=\"park.svg\" alt=\"Drzewa w parku\"&gt;</code></pre></li><li><strong>link do części strony</strong><pre><code>&lt;a href=\"#plan\"&gt;Plan&lt;/a&gt;</code></pre></li><li><strong>cel powyższego linku</strong><pre><code>&lt;h2 id=\"plan\"&gt;Plan&lt;/h2&gt;</code></pre></li><li><strong>tabela: tr to wiersz, th nagłówek, td dane</strong><pre><code>&lt;table&gt;&lt;tr&gt;&lt;th&gt;Czas&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;10:00&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;</code></pre></li></ul><p><strong>Uwaga:</strong> img i meta nie mają znaczników zamykających.</p><p><strong>Dla chętnych:</strong> header, main, footer opisują części strony.</p><pre><code>&lt;header&gt;&lt;h1&gt;Nasz klub&lt;/h1&gt;&lt;/header&gt;\n&lt;main&gt;&lt;p&gt;Tu działamy.&lt;/p&gt;&lt;/main&gt;\n&lt;footer&gt;&lt;p&gt;Projekt szkolny&lt;/p&gt;&lt;/footer&gt;</code></pre><p><strong>CSS</strong> zmienia wygląd. Przykład koloru z pracowni:</p><pre><code>&lt;h1 style=\"color: teal;\"&gt;Nasz klub&lt;/h1&gt;</code></pre><h2>🎮 STREFA AKCJI</h2><p>Dwie minuty dla Ciebie. Spróbuj bez zaglądania do notatki.</p><ol><li>Prawda czy fałsz? Obraz img potrzebuje znacznika </img>. [ P / F ]</li><li>Wyzwanie 10 sekund: do czego służy alt?</li><li>Z gwiazdką: link ma href=\"#plan\". Jak oznaczysz jego cel?</li></ol>",
    "quiz": [
      {
        "q": "Prawda czy fałsz? Obraz img potrzebuje znacznika </img>. [ P / F ]",
        "a": "Fałsz. img nie ma znacznika zamykającego."
      },
      {
        "q": "Wyzwanie 10 sekund: do czego służy alt?",
        "a": "Opisuje treść obrazu dla osoby, która go nie widzi."
      },
      {
        "q": "Z gwiazdką: link ma href=\"#plan\". Jak oznaczysz jego cel?",
        "a": "Dodaj id=\"plan\" do elementu docelowego, np. <h2 id=\"plan\">Plan</h2>."
      }
    ]
  },
  "topic-7-4-1": {
    "summary": "Redaktor w akcji: uporządkuj swój tekst!",
    "pending": false,
    "source": "Na podstawie notatek nauczyciela z działów 4–5 i nazw tematów rozkładu klasy VII. Temat 4.4: autorska synteza umiejętności z lekcji 4.1–4.3.",
    "body": "<h2>🚀 Redaktor w akcji: uporządkuj swój tekst!</h2><p><strong>Temat oficjalny:</strong> 4.1 Opracowywanie tekstu | <strong>Data:</strong> ....................</p><h2>🎯 TWOJA MISJA NA DZIŚ</h2><blockquote>Poprawisz tekst i szybko odnajdziesz wybrane słowa. Przygotujesz czytelną notatkę dla innych.</blockquote><img src=\"https://informatyk-pruszcz.github.io/informatyka/k7-document.svg\" alt=\"Napisz treść, uporządkuj dokument, sprawdź całość.\"><h2>🧠 KLUCZ DO GŁOWY</h2><h3>1. 🔹 Zasady edytorskie</h3><p><strong>Co to jest:</strong> To reguły poprawnego zapisu i porządkowania tekstu.</p><p><strong>Przykład:</strong> Postaw spację po przecinku. Nie stawiaj jej przed przecinkiem.</p><h3>2. 🔹 Znajdź i zamień</h3><p><strong>Co to jest:</strong> To narzędzie wyszukuje tekst i zastępuje go innym.</p><p><strong>Przykład:</strong> Zamień nazwę klubu w ogłoszeniu. Sprawdź każdą zmianę.</p><h3>3. 🔹 Synonimy i statystyka</h3><p><strong>Co to jest:</strong> Synonimy ograniczają powtórzenia. Statystyka pokazuje liczbę słów i znaków.</p><p><strong>Przykład:</strong> Sprawdź długość ogłoszenia. Dobierz zamiennik pasujący do zdania.</p><h2>⭐ ZŁOTA ZASADA (PRO-TIP)</h2><blockquote><strong>💡 ZAPAMIĘTAJ:</strong> Wyrównuj akapit narzędziem, zamiast dodawać kolejne spacje.</blockquote><h2>📖 MINI-SŁOWNICZEK TRUDNYCH SŁÓW</h2><ul><li><strong>Akapit:</strong> Fragment tekstu zakończony klawiszem Enter.</li><li><strong>Synonim:</strong> Wyraz o podobnym znaczeniu.</li></ul><h2>🛠️ WYPRÓBUJ KROK PO KROKU</h2><ol><li>Napisz trzy zdania o fikcyjnym klubie.</li><li>Wyrównaj akapity odpowiednim narzędziem.</li><li>Zamień nazwę klubu i przeczytaj wynik.</li><li>Sprawdź liczbę słów.</li></ol><h2>🎮 STREFA AKCJI</h2><p>Sprawdź się w dwie minuty. Odpowiedzi rozwiniesz poniżej.</p>",
    "quiz": [
      {
        "q": "Prawda czy fałsz? „Znajdź i zamień” może zastąpić wybrane słowo.",
        "a": "Prawda. Przed zamianą wszystkich wystąpień sprawdź kontekst."
      },
      {
        "q": "Wyzwanie 10 sekund: Jak sprawdzisz liczbę słów w dokumencie?",
        "a": "Otwórz statystykę dokumentu lub narzędzie liczenia słów."
      },
      {
        "q": "Z gwiazdką: Dlaczego po automatycznej zamianie trzeba przeczytać tekst?",
        "a": "Zamienione słowo może nie pasować znaczeniem lub formą."
      }
    ]
  },
  "topic-7-4-2": {
    "summary": "Tekst spotyka obraz: zbuduj czytelną stronę!",
    "pending": false,
    "source": "Na podstawie notatek nauczyciela z działów 4–5 i nazw tematów rozkładu klasy VII. Temat 4.4: autorska synteza umiejętności z lekcji 4.1–4.3.",
    "body": "<h2>🚀 Tekst spotyka obraz: zbuduj czytelną stronę!</h2><p><strong>Temat oficjalny:</strong> 4.2 Wstawianie obrazów i innych obiektów do dokumentu tekstowego | <strong>Data:</strong> ....................</p><h2>🎯 TWOJA MISJA NA DZIŚ</h2><blockquote>Uzupełnisz dokument obrazem i tabelą. Rozmieścisz je tak, aby pomagały zrozumieć treść.</blockquote><img src=\"https://informatyk-pruszcz.github.io/informatyka/k7-document.svg\" alt=\"Napisz treść, uporządkuj dokument, sprawdź całość.\"><h2>🧠 KLUCZ DO GŁOWY</h2><h3>1. 🔹 Obraz w dokumencie</h3><p><strong>Co to jest:</strong> To ilustracja uzupełniająca informacje zapisane słowami.</p><p><strong>Przykład:</strong> Dodaj zdjęcie rośliny do jej krótkiego opisu.</p><h3>2. 🔹 Tabela</h3><p><strong>Co to jest:</strong> To dane uporządkowane w wierszach i kolumnach.</p><p><strong>Przykład:</strong> Porównaj terminy spotkań klubu w prostej tabeli.</p><h3>3. 🔹 Obiekt osadzony i połączony</h3><p><strong>Co to jest:</strong> Osadzony znajduje się w dokumencie. Połączony odwołuje się do źródła.</p><p><strong>Przykład:</strong> Przeniesienie pliku źródłowego może utrudnić aktualizację połączonego obiektu.</p><h2>⭐ ZŁOTA ZASADA (PRO-TIP)</h2><blockquote><strong>💡 ZAPAMIĘTAJ:</strong> Ilustracja pomaga czytać. Nie zasłaniaj nią tekstu.</blockquote><h2>📖 MINI-SŁOWNICZEK TRUDNYCH SŁÓW</h2><ul><li><strong>Obiekt:</strong> Element wstawiony do dokumentu.</li><li><strong>Plik źródłowy:</strong> Plik, z którego pochodzi dany obiekt.</li></ul><h2>🛠️ WYPRÓBUJ KROK PO KROKU</h2><ol><li>Wpisz opis fikcyjnego wydarzenia.</li><li>Dodaj pasującą ilustrację, którą możesz wykorzystać.</li><li>Wstaw tabelę: godzina i zajęcia.</li><li>Sprawdź, czy tekst i obiekty są czytelne.</li></ol><h2>🎮 STREFA AKCJI</h2><p>Sprawdź się w dwie minuty. Odpowiedzi rozwiniesz poniżej.</p>",
    "quiz": [
      {
        "q": "Prawda czy fałsz? Obraz powinien zasłaniać ważne zdania.",
        "a": "Fałsz. Treść i ilustracja muszą pozostać czytelne."
      },
      {
        "q": "Wyzwanie 10 sekund: Jak nazwiesz układ danych w wierszach i kolumnach?",
        "a": "Tabela."
      },
      {
        "q": "Z gwiazdką: Co może się stać po przeniesieniu źródła połączonego obiektu?",
        "a": "Połączenie może przestać działać; aktualizacja może wymagać wskazania źródła."
      }
    ]
  },
  "topic-7-4-3": {
    "summary": "Wiele stron, jeden porządek!",
    "pending": false,
    "source": "Na podstawie notatek nauczyciela z działów 4–5 i nazw tematów rozkładu klasy VII. Temat 4.4: autorska synteza umiejętności z lekcji 4.1–4.3.",
    "body": "<h2>🚀 Wiele stron, jeden porządek!</h2><p><strong>Temat oficjalny:</strong> 4.3 Dokument wielostronicowy | <strong>Data:</strong> ....................</p><h2>🎯 TWOJA MISJA NA DZIŚ</h2><blockquote>Uporządkujesz dokument zajmujący kilka stron. Dodasz powtarzalne informacje i automatyczne numery.</blockquote><img src=\"https://informatyk-pruszcz.github.io/informatyka/k7-document.svg\" alt=\"Napisz treść, uporządkuj dokument, sprawdź całość.\"><h2>🧠 KLUCZ DO GŁOWY</h2><h3>1. 🔹 Marginesy</h3><p><strong>Co to jest:</strong> To odstępy między treścią a krawędziami strony.</p><p><strong>Przykład:</strong> Zostaw wolne miejsce przy brzegach szkolnego opracowania.</p><h3>2. 🔹 Nagłówek i stopka</h3><p><strong>Co to jest:</strong> To obszary u góry i u dołu strony.</p><p><strong>Przykład:</strong> Umieść nazwę opracowania w nagłówku, a numer w stopce.</p><h3>3. 🔹 Automatyczna numeracja</h3><p><strong>Co to jest:</strong> To numery stron wstawiane i aktualizowane przez edytor.</p><p><strong>Przykład:</strong> Po dodaniu strony edytor aktualizuje kolejne numery.</p><h2>⭐ ZŁOTA ZASADA (PRO-TIP)</h2><blockquote><strong>💡 ZAPAMIĘTAJ:</strong> Numery wstawiaj automatycznie. Po zmianach obejrzyj cały dokument.</blockquote><h2>📖 MINI-SŁOWNICZEK TRUDNYCH SŁÓW</h2><ul><li><strong>Nagłówek strony:</strong> Obszar u góry strony dokumentu.</li><li><strong>Stopka:</strong> Obszar u dołu strony dokumentu.</li></ul><h2>🛠️ WYPRÓBUJ KROK PO KROKU</h2><ol><li>Otwórz dokument zajmujący kilka stron.</li><li>Ustaw czytelne marginesy.</li><li>Dodaj nazwę opracowania w nagłówku i numerację w stopce.</li><li>Obejrzyj każdą stronę przed zapisaniem.</li></ol><h2>🎮 STREFA AKCJI</h2><p>Sprawdź się w dwie minuty. Odpowiedzi rozwiniesz poniżej.</p>",
    "quiz": [
      {
        "q": "Prawda czy fałsz? Numer każdej strony trzeba wpisywać ręcznie.",
        "a": "Fałsz. Użyj automatycznej numeracji."
      },
      {
        "q": "Wyzwanie 10 sekund: Jak nazywa się odstęp treści od krawędzi strony?",
        "a": "Margines."
      },
      {
        "q": "Z gwiazdką: Dlaczego automatyczne numery pomagają po dodaniu nowej strony?",
        "a": "Edytor aktualizuje numerację; nie poprawiasz każdego numeru ręcznie."
      }
    ]
  },
  "topic-7-4-4": {
    "summary": "Wasza redakcja: przygotuj e-gazetkę!",
    "pending": false,
    "source": "Na podstawie notatek nauczyciela z działów 4–5 i nazw tematów rozkładu klasy VII. Temat 4.4: autorska synteza umiejętności z lekcji 4.1–4.3.",
    "body": "<h2>🚀 Wasza redakcja: przygotuj e-gazetkę!</h2><p><strong>Temat oficjalny:</strong> 4.4 Przygotowanie e-gazetki – zadanie projektowe | <strong>Data:</strong> ....................</p><h2>🎯 TWOJA MISJA NA DZIŚ</h2><blockquote>Połączysz teksty, obrazy i tabele w szkolną e-gazetkę. Wykorzystasz umiejętności z poprzednich trzech lekcji.</blockquote><img src=\"https://informatyk-pruszcz.github.io/informatyka/k7-document.svg\" alt=\"Napisz treść, uporządkuj dokument, sprawdź całość.\"><h2>🧠 KLUCZ DO GŁOWY</h2><h3>1. 🔹 Plan redakcji</h3><p><strong>Co to jest:</strong> To ustalony układ treści i podział pracy.</p><p><strong>Przykład:</strong> Ustalcie, kto pisze, dobiera ilustracje i sprawdza dokument.</p><h3>2. 🔹 Czytelny dokument</h3><p><strong>Co to jest:</strong> To tekst oraz obiekty rozmieszczone w uporządkowany sposób.</p><p><strong>Przykład:</strong> Zastosuj podobny wygląd tytułów i czytelne marginesy.</p><h3>3. 🔹 Kontrola przed oddaniem</h3><p><strong>Co to jest:</strong> To sprawdzenie treści, układu i numeracji stron.</p><p><strong>Przykład:</strong> Przeczytajcie teksty i obejrzyjcie wszystkie strony gazetki.</p><h2>⭐ ZŁOTA ZASADA (PRO-TIP)</h2><blockquote><strong>💡 ZAPAMIĘTAJ:</strong> Najpierw plan, potem skład, na końcu wspólna kontrola.</blockquote><h2>📖 MINI-SŁOWNICZEK TRUDNYCH SŁÓW</h2><ul><li><strong>Redakcja:</strong> Zespół przygotowujący treści gazetki.</li><li><strong>Korekta:</strong> Wyszukiwanie i poprawianie błędów tekstu.</li></ul><h2>🛠️ WYPRÓBUJ KROK PO KROKU</h2><ol><li>Ustalcie temat gazetki i podzielcie zadania.</li><li>Połączcie krótkie teksty i dozwolone ilustracje.</li><li>Dodajcie nagłówek, stopkę i automatyczną numerację.</li><li>Sprawdźcie treść i układ, a potem zapiszcie pracę.</li></ol><h2>🎮 STREFA AKCJI</h2><p>Sprawdź się w dwie minuty. Odpowiedzi rozwiniesz poniżej.</p>",
    "quiz": [
      {
        "q": "Prawda czy fałsz? Podział zadań pomaga przygotować wspólną gazetkę.",
        "a": "Prawda. Ustalcie również osobę sprawdzającą całość."
      },
      {
        "q": "Wyzwanie 10 sekund: Podaj dwa elementy, które sprawdzisz przed oddaniem.",
        "a": "Na przykład pisownię, czytelność obrazów, marginesy lub numerację."
      },
      {
        "q": "Z gwiazdką: Co zrobisz, gdy obraz zasłania fragment artykułu?",
        "a": "Zmień jego położenie lub rozmiar i ponownie sprawdź tekst."
      }
    ]
  },
  "topic-7-5-1": {
    "summary": "Twój pokaz: zainteresuj widza pomysłem!",
    "pending": false,
    "source": "Na podstawie notatek nauczyciela z działów 4–5 i nazw tematów rozkładu klasy VII. Temat 4.4: autorska synteza umiejętności z lekcji 4.1–4.3.",
    "body": "<h2>🚀 Twój pokaz: zainteresuj widza pomysłem!</h2><p><strong>Temat oficjalny:</strong> 5.1 Praca nad prezentacją multimedialną | <strong>Data:</strong> ....................</p><h2>🎯 TWOJA MISJA NA DZIŚ</h2><blockquote>Zaplanujesz prezentację z czytelnymi slajdami. Dobierzesz multimedia oraz oszczędnie zastosujesz efekty.</blockquote><img src=\"https://informatyk-pruszcz.github.io/informatyka/k7-media.svg\" alt=\"Zaplanuj kolejność, połącz treść i multimedia, sprawdź odtwarzanie.\"><h2>🧠 KLUCZ DO GŁOWY</h2><h3>1. 🔹 Struktura prezentacji</h3><p><strong>Co to jest:</strong> To kolejność slajdów: wstęp, rozwinięcie i podsumowanie.</p><p><strong>Przykład:</strong> Pokaż temat, przedstaw najważniejsze informacje, a potem je podsumuj.</p><h3>2. 🔹 Multimedia</h3><p><strong>Co to jest:</strong> To różne formy przekazu, na przykład obraz i dźwięk.</p><p><strong>Przykład:</strong> Dobierz ilustrację, która pomaga wyjaśnić temat slajdu.</p><h3>3. 🔹 Animacja i przejście</h3><p><strong>Co to jest:</strong> Animacja dotyczy elementu. Przejście dotyczy zmiany slajdów.</p><p><strong>Przykład:</strong> Pojawienie się podpisu to animacja. Zmiana slajdu to przejście.</p><h2>⭐ ZŁOTA ZASADA (PRO-TIP)</h2><blockquote><strong>💡 ZAPAMIĘTAJ:</strong> Slajd pokazuje hasła. Ty wyjaśniasz ich znaczenie.</blockquote><h2>📖 MINI-SŁOWNICZEK TRUDNYCH SŁÓW</h2><ul><li><strong>Pokaz slajdów:</strong> Odtwarzanie prezentacji dla odbiorców.</li><li><strong>Przejście:</strong> Efekt podczas zmiany slajdów.</li></ul><h2>🛠️ WYPRÓBUJ KROK PO KROKU</h2><ol><li>Zaplanuj wstęp, rozwinięcie oraz podsumowanie.</li><li>Wpisz krótkie hasła i dodaj pasujące multimedia.</li><li>Sprawdź zgodę lub licencję na cudze materiały.</li><li>Uruchom pokaz. Oceń czytelność i działanie efektów.</li></ol><h2>🎮 STREFA AKCJI</h2><p>Sprawdź się w dwie minuty. Odpowiedzi rozwiniesz poniżej.</p>",
    "quiz": [
      {
        "q": "Prawda czy fałsz? Animacja i przejście zawsze oznaczają to samo.",
        "a": "Fałsz. Animacja dotyczy elementu; przejście dotyczy slajdów."
      },
      {
        "q": "Wyzwanie 10 sekund: Wymień dwa multimedia poza tekstem.",
        "a": "Na przykład obraz i dźwięk albo obraz i film."
      },
      {
        "q": "Z gwiazdką: Dlaczego warto uruchomić pokaz przed wystąpieniem?",
        "a": "Sprawdzisz kolejność slajdów, czytelność i działanie multimediów."
      }
    ]
  },
  "topic-7-5-2": {
    "summary": "Z ujęć do opowieści: zmontuj film!",
    "pending": false,
    "source": "Na podstawie notatek nauczyciela z działów 4–5 i nazw tematów rozkładu klasy VII. Temat 4.4: autorska synteza umiejętności z lekcji 4.1–4.3.",
    "body": "<h2>🚀 Z ujęć do opowieści: zmontuj film!</h2><p><strong>Temat oficjalny:</strong> 5.2 Podstawowy montaż filmu | <strong>Data:</strong> ....................</p><h2>🎯 TWOJA MISJA NA DZIŚ</h2><blockquote>Połączysz krótkie ujęcia w zrozumiały film. Przytniesz zbędne fragmenty i dopasujesz dźwięk.</blockquote><img src=\"https://informatyk-pruszcz.github.io/informatyka/k7-media.svg\" alt=\"Zaplanuj kolejność, połącz treść i multimedia, sprawdź odtwarzanie.\"><h2>🧠 KLUCZ DO GŁOWY</h2><h3>1. 🔹 Montaż wideo</h3><p><strong>Co to jest:</strong> To wybieranie, przycinanie i łączenie fragmentów filmu.</p><p><strong>Przykład:</strong> Ułóż ujęcia z wycieczki w kolejności wydarzeń.</p><h3>2. 🔹 Ścieżka dźwiękowa</h3><p><strong>Co to jest:</strong> To dźwięk towarzyszący obrazowi w filmie.</p><p><strong>Przykład:</strong> Dopasuj głośność muzyki, aby było słychać wypowiedź.</p><h3>3. 🔹 Zapis filmu</h3><p><strong>Co to jest:</strong> To przygotowanie pliku do odtwarzania poza edytorem.</p><p><strong>Przykład:</strong> Zapisz film, a potem otwórz go w odtwarzaczu.</p><h2>⭐ ZŁOTA ZASADA (PRO-TIP)</h2><blockquote><strong>💡 ZAPAMIĘTAJ:</strong> Przytnij, połącz, odsłuchaj. Sprawdź gotowy plik.</blockquote><h2>📖 MINI-SŁOWNICZEK TRUDNYCH SŁÓW</h2><ul><li><strong>Ujęcie:</strong> Fragment nagrania z kamery.</li><li><strong>MP4:</strong> Popularny format pliku multimedialnego.</li></ul><p><strong>Uwaga:</strong> MP4 jest popularny, ale zgodność zależy od urządzenia i sposobu zapisu. Sprawdź gotowy plik przed pokazem.</p><h2>🛠️ WYPRÓBUJ KROK PO KROKU</h2><ol><li>Wybierz krótkie nagrania, których możesz użyć.</li><li>Ułóż je w kolejności. Przytnij zbędne fragmenty.</li><li>Dodaj dozwolony dźwięk i sprawdź jego głośność.</li><li>Zapisz film i sprawdź odtwarzanie na docelowym urządzeniu.</li></ol><h2>🎮 STREFA AKCJI</h2><p>Sprawdź się w dwie minuty. Odpowiedzi rozwiniesz poniżej.</p>",
    "quiz": [
      {
        "q": "Prawda czy fałsz? Montaż pozwala usunąć niepotrzebny fragment nagrania.",
        "a": "Prawda. Możesz przyciąć ujęcie."
      },
      {
        "q": "Wyzwanie 10 sekund: Co poprawisz, gdy muzyka zagłusza wypowiedź?",
        "a": "Zmniejsz głośność muzyki i ponownie odsłuchaj film."
      },
      {
        "q": "Z gwiazdką: Dlaczego przed dodaniem cudzej muzyki sprawdzisz prawa użycia?",
        "a": "Aby upewnić się, że możesz ją wykorzystać i na jakich warunkach."
      }
    ]
  }
};
