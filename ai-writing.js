export const aiWriting = {
  id: 'pisanie-z-ai', type: 'note', grades: [6, 7, 8],
  title: 'Pisanie tekstów z pomocą AI', section: 'Warsztat pisania',
  tags: ['AI', 'pisanie', 'prompty'], pending: false,
  summary: 'Przygotuj zaproszenie na szkolną wymianę książek. Ty wybierasz pomysł i decydujesz o ostatecznym tekście.',
  body: `<h2>Jak poprosić AI o pomoc?</h2>
<p><strong>Prompt</strong> to polecenie, które wpisujesz do narzędzia AI. Spróbuj najpierw na kartce. Z kim rozmawiasz? Co ta osoba powinna wiedzieć po przeczytaniu tekstu?</p>
<p>Pracuj na fikcyjnym wydarzeniu. Wymiana książek odbędzie się w piątek o 12.00 w szkolnej bibliotece. Każdy może przynieść jedną książkę.</p>
<h3>Klasa VI · Doprecyzuj polecenie</h3>
<p>Porównaj dwie prośby. Która daje autorowi więcej wskazówek?</p>
<blockquote>Napisz zaproszenie.</blockquote>
<blockquote>Napisz trzy zdania dla szóstoklasistów. Zaproś ich do biblioteki w piątek o 12.00. Poproś o przyniesienie jednej książki. Pisz serdecznie.</blockquote>
<p>Obie prośby działają bez pokazywania wzoru. To podejście nazywa się <strong>zero-shot</strong>. W drugiej prośbie podajesz odbiorców, fakty i długość tekstu.</p>
<p><strong>Twoja próba.</strong> Napisz własne zaproszenie. Podkreśl miejsce, godzinę i czynność, którą proponujesz czytelnikowi.</p>
<h3>Klasa VII · Szukaj różnych pomysłów</h3>
<p><strong>Kwiat lotosu.</strong> Pośrodku kartki zapisz „wymiana książek”. Poproś AI o osiem pomysłów wokół tego tematu. Wybierz jeden, np. plakat. Dopiero teraz poproś o osiem pomysłów na sam plakat.</p>
<p><strong>SCAMPER</strong> pomaga zmieniać pomysł. Wypróbuj jedno pytanie z listy.</p>
<ul><li><strong>Zastąp.</strong> Czym zastąpisz długi opis książki?</li><li><strong>Połącz.</strong> Jak połączysz wymianę z zagadką?</li><li><strong>Dostosuj.</strong> Jak ułatwisz udział młodszym uczniom?</li><li><strong>Zmień.</strong> Co powiększysz na plakacie?</li><li><strong>Użyj inaczej.</strong> Jak zakładka może stać się zaproszeniem?</li><li><strong>Usuń.</strong> Które zdanie można skreślić bez utraty informacji?</li><li><strong>Odwróć.</strong> Co się stanie, gdy zaczniesz od pytania czytelnika?</li></ul>
<p><strong>Twoja próba.</strong> Wybierz pomysł i przygotuj dwie wersje ogłoszenia. Jedną przeczytasz przez radiowęzeł, drugą umieścisz na małej zakładce. Co trzeba skrócić?</p>
<h3>Klasa VIII · Dopracuj tekst dla odbiorcy</h3>
<p>Wyobraź sobie ucznia, który przychodzi pierwszy raz. Czego chce się dowiedzieć? Zapytaj „dlaczego?”, a potem dopytaj o przyczynę odpowiedzi. Tak działa metoda <strong>5 × dlaczego</strong>. Sprawdź swoje przypuszczenia w rozmowie.</p>
<p>Model <strong>DELTA</strong> pomoże ci ułożyć polecenie. Wskaż zadanie (D), przykład (E), ograniczenia (L), ton (T) i odbiorców (A).</p>
<blockquote>Przeredaguj moje zaproszenie. Zacznij pytaniem podobnym do „Która książka szuka nowego czytelnika?”. Zachowaj miejsce i godzinę. Zmieść się w 40 słowach. Pisz przyjaźnie do ucznia, który pierwszy raz odwiedzi wymianę.</blockquote>
<p><strong>AIDA</strong> podpowiada kolejność zdań. Przyciągnij uwagę pytaniem. Wzbudź zainteresowanie wydarzeniem. Pokaż korzyść dla czytelnika. Na końcu zaproś do działania, np. „Przynieś jedną książkę”.</p>
<p><strong>Twoja próba.</strong> Poproś o lekką korektę i o drugą wersję z innym początkiem. Wybierz jedno zdanie z każdej. Uzasadnij wybór.</p>
<h2>Od zaproszenia do opowieści</h2>
<p>Chcesz opisać wydarzenie w gazetce? Poproś AI, żeby najpierw zebrała informacje.</p>
<blockquote>Zadaj mi po jednym pytaniu o bohatera, jego cel, trudność, decyzję i zakończenie. Za każdym razem poczekaj na odpowiedź. Potem zaproponuj plan opowiadania w trzech częściach.</blockquote>
<p><strong>Przed oddaniem pracy</strong> porównaj szkic z faktami. Popraw daty i miejsca. Usuń wymyślone cytaty. Korzystaj z fikcyjnych danych zamiast wpisywać dane kolegów. Przeczytaj tekst na głos i popraw zdania, których sam byś nie użył.</p>`,
  source: 'Opracowanie szkolne na podstawie materiału nauczyciela „Pisanie tekstów z pomocą AI”.',
  quiz: [
    {q:'Co dodasz do polecenia „Napisz zaproszenie”?',a:'Odbiorców, cel, miejsce, czas i oczekiwaną długość.'},
    {q:'Jak rozwiniesz jeden płatek kwiatu lotosu?',a:'Wybiorę jedną propozycję i poproszę o osiem bardziej szczegółowych pomysłów.'},
    {q:'AI dopisała darmowe nagrody. Co zrobisz?',a:'Sprawdzę informację u organizatora. Usunę ją, jeśli nie została potwierdzona.'}
  ]
};
