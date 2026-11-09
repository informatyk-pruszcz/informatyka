// Materiały do rozkładu 2026/27. Numeracja wymagań odpowiada tabelom wydawcy.
import {esc} from './core.js';
import {pythonTopics} from './notes-python-audit.js';

const assets = 'https://informatyk-pruszcz.github.io/informatyka/materialy-lekcji/';
const download = (file, label) => '<a href="'+assets+file+'">'+label+'</a>';
const steps = items => '<ol>'+items.map(x=>'<li>'+x+'</li>').join('')+'</ol>';
const section = (title, text) => '<h3>'+title+'</h3>'+text;

// Archiwa zawierają przykładowe pliki do otwarcia w programie używanym na lekcji.
const examples = {
  'topic-4-6-1':['kampania','Dwie wersje plakatu i dziennik zespołu'],
  'topic-7-1-2':['trasy','Schemat i opis dwóch tras'],
  'topic-7-1-3':['udostepnianie','Plan udostępniania i wzór zgłoszenia'],
  'topic-7-3-1':['ilustracja','Warstwowa ilustracja ORA i gotowy PNG'],
  'topic-7-3-2':['animacja','Animowany GIF i trzy klatki PNG'],
  'topic-7-3-3':['podporka','Model podpórki STL i jego wymiary'],
  'topic-7-3-4':['zaproszenie','Plakat SVG oraz uwaga odbiorcy'],
  'topic-8-2-1':['czas','Plik czas.py i próby'],
  'topic-8-2-2':['prog','Plik prog.py i próby'],
  'topic-8-2-3':['nwd','Plik nwd.py i próby'],
  'topic-8-2-4':['szukaj','Plik szukaj.py i próby'],
  'topic-8-2-5':['sortuj','Plik sortuj.py i próby']
};
function note(id, summary, points, tool, product, assessment, content, question, answer) {
  const [exampleFile, exampleLabel] = examples[id];
  const grade = Number(id.split('-')[1]);
  const basis = grade === 4 ? 'Podstawa 2026, klasy IV–VI' : 'Dotychczasowa podstawa, klasy VII–VIII';
  return [id, {
    pending:false, summary,
    curriculumVersion:basis, curriculumPoints:points, schoolYear:'2026/2027',
    application:tool, outcome:product, assessment,
    source:'Autorskie opracowanie do rozkładu klasy '+grade+'. '+basis+'. Punkty według rozkładu: '+points+'.',
    body:'<h2>'+summary+'</h2>'+content+
      section('Co oddajesz?', '<p>'+product+'</p><p>'+download('przyklady/'+exampleFile+'.zip', 'Pobierz przykład pracy (ZIP) — '+exampleLabel)+'</p>')+
      section('Jak sprawdzicie pracę?', '<p>'+assessment+'</p>')+
      '<p><strong>Narzędzie:</strong> '+tool+'. <strong>Rok szkolny:</strong> 2026/2027. '+basis+' · '+points+'.</p>',
    quiz:[{q:question,a:answer}]
  }];
}

const notes = [
  note('topic-4-6-1','Jak pomóc młodszej klasie rozpoznać podejrzaną wiadomość?',
    '3.1, 3.7, 4.1, 5.1, 5.3','edytor grafiki i edytor tekstu','Plakat przed poprawkami i po nich oraz lista wkładu zespołu.',
    'Poproście odbiorcę o pokazanie bezpiecznej reakcji. Porównajcie obie wersje. Każda osoba wskazuje swoją czynność oraz zmianę po uwadze.',
    '<p>Waszym odbiorcą jest klasa III. Przygotujcie minikampanię o bezpieczeństwie cyfrowym. To wariant 2 doświadczenia edukacyjnego dla klas IV–VI (s. 257 podstawy).</p>'+
    section('Lekcja 1 · Zaplanujcie przekaz',steps(['Przeczytajcie fikcyjny SMS: „Twoje konto zniknie! Podaj hasło”. Jak może odpowiedzieć trzecioklasista?',
      'Podzielcie role: autor przykładu, ilustrator, redaktor i osoba prowadząca prezentację. W małej grupie jedna osoba łączy role.',
      'Narysujcie układ plakatu. Umieśćcie jedną wiadomość, jeden sygnał ostrzegawczy i jedną reakcję. Zapiszcie szkic.']))+
    section('Lekcja 2 · Sprawdźcie pierwszą wersję',steps(['Przygotujcie plakat. Użyjcie fikcyjnego nadawcy i własnego rysunku. Zapiszcie plik jako kampania-v1.',
      'Pokażcie pracę drugiej grupie. Zapytajcie: „Co zrobisz po otrzymaniu takiej wiadomości?”. Zapiszcie jej odpowiedź.',
      'Wybierzcie jedną uwagę. Poprawcie przekaz i zapiszcie osobny plik kampania-v2.']))+
    section('Lekcja 3 · Dotrzyjcie do odbiorców',steps(['Za zgodą nauczyciela pokażcie plakat młodszej klasie lub umieśćcie go na szkolnej tablicy.',
      'Poproście uczniów o wskazanie osoby, do której zwrócą się po pomoc. Zapiszcie liczbę trafnych odpowiedzi bez nazwisk.',
      'Powiedzcie, jaka poprawka pomogła odbiorcom. Podpiszcie role i czynności w dzienniku grupy.'])),
    'Jak sprawdzisz, czy młodszy odbiorca zrozumiał plakat?', 'Pokażę mu nową fikcyjną wiadomość i poproszę o samodzielne wskazanie bezpiecznej reakcji.'),
  note('topic-7-1-2','Jak wiadomość dociera z laptopa do serwera?', 'III.1','edytor grafiki lub kartka',
    'Schemat dwóch tras z podpisami urządzeń i kierunkami strzałek.',
    'Partner śledzi najpierw trasę do drukarki, potem do serwera. Wyjaśnij, gdzie obie trasy się rozdzielają.',
    '<p>W pracowni laptop i drukarka należą do sieci lokalnej (LAN). Punkt dostępowy łączy laptop przez Wi-Fi. Router łączy sieci i kieruje dane dalej.</p>'+
    '<img src="'+assets+'siec.svg" alt="Laptop przez punkt dostępowy i przełącznik dociera do drukarki. Droga do serwera prowadzi od przełącznika przez router i Internet.">'+
    section('Prześledź dwie trasy',steps(['Przerysuj schemat. Zaznacz drogę dokumentu z laptopa do szkolnej drukarki.',
    'Innym rodzajem linii oznacz drogę żądania strony do zewnętrznego serwera i drogę odpowiedzi.',
    'Kabel do Internetu został odłączony, ale LAN działa. Którą czynność nadal wykonasz? Uzasadnij na swoim schemacie.'])),
    'Czy po odłączeniu Internetu można używać drukarki w LAN?', 'Tak, jeśli komputer, drukarka i połączenie lokalne nadal działają.'),
  note('topic-7-1-3','Komu udostępnisz wspólną pracę?', 'II.3, II.5, IV.2, V.1, V.2, V.3','szkolna platforma współpracy lub lokalny edytor tekstu',
    'Plan udostępnienia dokumentu oraz odpowiedź na fikcyjną wiadomość.',
    'Wskaż odbiorcę, potrzebne uprawnienia, źródło ilustracji oraz konkretny dowód uzasadniający reakcję.',
    '<p>Wspólny dokument ma autora, współredaktorów i czytelników. Sam widok ładnego logo nie potwierdza tożsamości nadawcy.</p>'+
    section('Lekcja 1 · Ustal uprawnienia',steps(['Załóż w parze fikcyjny projekt „Turniej gier”. Pozwól partnerowi edytować tekst. Dla klasy wybierz odczyt.',
    'Jeśli pracujesz offline, zapisz obok trzech ról ich uprawnienia. Wyjaśnij, dlaczego odbiorcy mają różny dostęp.',
    'Dodaj własną ilustrację i podpis autora. Dla cudzej pracy sprawdź autora, źródło oraz warunki użycia.']))+
    section('Lekcja 2 · Sprawdź prośbę',steps(['Odczytaj wiadomość: „Tu administrator. Wklej hasło w odpowiedzi, aby zachować dostęp do pliku”. Wskaż żądanie, które budzi wątpliwość.',
    'Zapisz drogę sprawdzenia prośby znanym kanałem. Przećwicz zgłoszenie nauczycielowi używając fikcyjnych danych.',
    'Porównaj z wiadomością kolegi zawierającą literówkę i prośbę o przeczytanie tekstu na szkolnej platformie. Jakie dowody można sprawdzić?'])),
    'Czy uprawnienie do czytania wystarczy, aby poprawić tekst?', 'Do wprowadzania zmian potrzebne jest uprawnienie do edycji.'),
  note('topic-7-3-1','Zbuduj ilustrację z niezależnych warstw', 'II.3a, II.4','GIMP',
    'Plik z warstwami XCF i gotowa ilustracja PNG.',
    'Ukryj warstwę z własnym elementem. Tło ma pozostać widoczne. Następnie otwórz PNG i porównaj efekt.',
    '<p>Obraz rastrowy składa się z pikseli. Warstwa pozwala przesuwać wybrany element bez naruszania pozostałych.</p>'+
    section('Od tła do ilustracji',steps(['Pobierz '+download('polana.png','rysunek polany (PNG)')+'. Otwórz go w GIMP-ie. Powiększ fragment do 400% i obejrzyj piksele.',
    'Utwórz przezroczystą warstwę Znak. Narysuj drogowskaz. Na osobnej warstwie dodaj napis i przesuń go nad drogowskaz.',
    'Zapisz projekt jako polana.xcf. Wyeksportuj polana.png. Otwórz oba pliki i sprawdź, który pozwala jeszcze przesuwać napis.'])),
    'Po co zapisać XCF przed eksportem?', 'Zachowasz warstwy i możliwość ich osobnej edycji.'),
  note('topic-7-3-2','Jak z trzech klatek zrobić ruch?', 'II.4, III.2','GIMP',
    'Projekt XCF oraz zapętlona animacja GIF.',
    'Odtwórz animację dwukrotnie. Pokaż partnerowi zmianę położenia i spróbuj osiągnąć wolniejsze tempo.',
    '<p>Kolejne warstwy mogą stać się klatkami animacji. W GIMP-ie pierwszą klatką animacji GIF jest dolna warstwa.</p>'+
    section('Uruchom piłkę',steps(['Pobierz '+download('klatki.zip','trzy klatki piłki (ZIP)')+' i rozpakuj plik. Otwórz klatka-1.png, kolejne pliki otwórz jako warstwy.',
    'Ustaw klatkę 1 na dole, 2 pośrodku i 3 u góry. W menu Filtry → Animacja uruchom odtwarzanie.',
    'Zapisz XCF, wyeksportuj jako GIF. Zaznacz „jako animacja”, powtarzanie i opóźnienie 250 ms. Porównaj ruch z wersją 500 ms.'])),
    'Co zmieni wydłużenie czasu klatki?', 'Każda klatka będzie dłużej widoczna, więc ruch zwolni.'),
  note('topic-7-3-3','Zaprojektuj podpórkę w trzech wymiarach','II.4','szkolny edytor 3D z importem STL i podgląd druku',
    'Edytowalny projekt podpórki, plik STL oraz opis wymiarów.',
    'Sprawdź widoki z przodu, góry i boku. Odczytaj wymiary oraz sprawdź, czy model opiera się na płaskiej podstawie.',
    '<p><strong>Temat dodatkowy.</strong> Szerokość, głębokość i wysokość mierzysz wzdłuż trzech osi. Podgląd warstw pokazuje kolejność budowania modelu.</p>'+
    section('Od bryły do podglądu wydruku',steps(['Zaimportuj '+download('podstawa.stl','podstawę 30 × 20 × 3 (STL)')+' do szkolnego edytora. Wybierz milimetry.',
    'Dodaj z tyłu pionową ściankę 30 × 3 × 12 mm. Połącz ją z podstawą. Obejrzyj ich połączenie z boku.',
    'Zapisz projekt i wyeksportuj STL. Otwórz go w programie przygotowującym wydruk. Przejrzyj pierwszą, środkową i ostatnią warstwę. Druk omów z nauczycielem.'])),
    'Dlaczego oglądasz model z boku?', 'Mogę dostrzec odstęp między bryłami i sprawdzić pionowy wymiar.'),
  note('topic-7-3-4','Czy plakat da się przeczytać z końca sali?', 'II.3a, II.4, IV.1','GIMP lub Inkscape',
    'Edytowalny plakat, wersja do publikacji i krótka notatka o poprawce.',
    'Przyznajcie po jednym punkcie za czytelny tytuł, komplet informacji, legalną ilustrację z podpisem oraz poprawkę po teście. Wynik 0–4 uzasadnijcie na przykładzie.',
    '<p>W parze zaproście uczniów na fikcyjny spacer przyrodniczy. Najpierw ustalcie, kto pisze, kto projektuje i kto sprawdzi gotową pracę.</p>'+
    section('Trzy spotkania nad plakatem',steps(['Pobierz '+download('plakat.svg','edytowalny szablon plakatu (SVG)')+'. Zmień tytuł, podaj miejsce, dzień i godzinę. Zostaw odstępy między informacjami.',
    'Dodaj własny znak z prostych figur oraz ilustrację. Możesz wykorzystać '+download('polana.png','rysunek polany')+' udostępniony do tego ćwiczenia. Podpisz źródło.',
    'Pokaż plakat z końca sali. Zapytaj inną parę, gdzie i kiedy odbywa się spacer. Zapisz jej uwagę, popraw jeden szczegół i wyeksportuj plakat.'])),
    'Jak praktycznie sprawdzisz czytelność plakatu?', 'Poproszę odbiorcę o odczytanie miejsca i terminu z przewidzianej odległości.')
];

for (const [index, topic] of pythonTopics.entries()) {
  const body = '<p>'+topic.idea+'</p>'+
    section('Przykład do uruchomienia','<pre><code>'+esc(topic.code)+'</code></pre>')+
    section('Pracuj w Pythonie',steps(['Otwórz nowy plik w szkolnym edytorze Python 3 (np. IDLE). Przepisz przykład, zachowując wcięcia.',
      topic.task,'W IDLE uruchom plik przez Run → Run Module (F5). Zapisz wyniki obu prób.']))+
    section('Test zwykły i brzegowy',steps(topic.tests))+
    section('Dla chętnych','<p>'+topic.extra+'</p>');
  notes.push(note('topic-8-2-'+(index+1),topic.title,topic.points,'Python 3 w szkolnym IDE',
    'Plik .py, dane testowe, prognozy oraz faktyczne wyniki.',
    'Uruchom program na obu zestawach. Wyjaśnij każde odstępstwo od prognozy. Pokaż dodatkowy własny test.',
    body,topic.question,topic.answer));
}

export const auditNotes = Object.fromEntries(notes);