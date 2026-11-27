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
    quiz:Array.isArray(question) ? question.map(([q,a])=>({q,a})) : [{q:question,a:answer}]
  }];
}

function graphicsLesson({goal, ideas, picture, practice, check, takeaway, links}) {
  return '<blockquote><p><strong>Twój cel.</strong> '+goal+'</p></blockquote>'+
    section('3 rzeczy, które warto znać','<ul>'+ideas.map(idea=>'<li>'+idea+'</li>').join('')+'</ul>')+
    '<img src="'+picture.src+'" alt="'+picture.alt+'"><p>'+picture.caption+'</p>'+
    section('Zrób krok po kroku',steps(practice))+
    '<p><strong>Sprawdź efekt.</strong> '+check+'</p>'+
    '<blockquote><p><strong>Zapamiętaj.</strong> '+takeaway+'</p></blockquote>'+
    (links ? '<p>'+links+'</p>' : '');
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
  note('topic-7-3-1','Przesuń napis, zostaw tło na miejscu','II.3a, II.4','GIMP',
    'Projekt polana.xcf i gotowy obraz PNG.',
    'Ukryj napis w projekcie. Jeśli tło nadal widać, oba elementy są na osobnych warstwach.',
    graphicsLesson({
      goal:'Dodasz drogowskaz i napis do polany. Każdy element poprawisz osobno.',
      ideas:[
        '<strong>Piksel</strong> to mały punkt obrazu. Powiększ widok do 400%, żeby zobaczyć piksele.',
        '<strong>Warstwy</strong> układają się jedna nad drugą. Nieprzezroczyste tło może zasłonić napis pod spodem.',
        '<strong>XCF</strong> zachowuje warstwy GIMP-a. <strong>PNG</strong> to gotowy obraz. <strong>JPEG</strong> sprawdza się np. przy zdjęciach.'
      ],
      picture:{src:assets+'polana.png',alt:'Polana z drogą pośrodku, drzewami po bokach i słońcem nad górami.',caption:'Tu zacznij. Wybierz miejsce na drogowskaz przy ścieżce.'},
      practice:[
        'Pobierz '+download('polana.png','tło polany (PNG)')+' i otwórz je w GIMP-ie.',
        'Dodaj przezroczystą warstwę <strong>Znak</strong>. Narysuj na niej prosty drogowskaz.',
        'Narzędziem <strong>Tekst</strong> dodaj napis „Do szkoły”. W panelu warstw umieść go najwyżej.',
        'Zapisz projekt jako <code>polana.xcf</code>. Przez <strong>Plik → Wyeksportuj jako</strong> utwórz <code>polana-gotowa.png</code>.'
      ],
      check:'Kliknij oko przy warstwie tekstowej. Napis znika, a polana i drogowskaz zostają.',
      takeaway:'Najpierw zapisz projekt XCF. Potem wyeksportuj obraz do udostępnienia.',
      links:'Chcesz poćwiczyć kolory, wyostrzanie albo warstwy ze statkiem? <a href="https://informatyk-pruszcz.github.io/informatyka/klasa7/gimp-obrazy.html">Otwórz kartę GIMP 3.1</a>.'
    }),[
      ['Jak schowasz napis bez usuwania go z projektu?','Kliknę oko obok warstwy z napisem.'],
      ['W którym pliku poprawisz położenie napisu?','W projekcie XCF, bo zachowuje osobne warstwy.'],
      ['Napis zniknął po przesunięciu pod tło. Jak go odzyskasz?','Przeniosę warstwę napisu nad tło.']
    ]),
  note('topic-7-3-2','Ożyw piłkę w trzech klatkach','II.4, III.2','GIMP',
    'Projekt XCF oraz gotowa animacja GIF.',
    'Odtwórz GIF. Sprawdź, czy piłka porusza się w zaplanowanym kierunku.',
    graphicsLesson({
      goal:'Zobaczysz, jak osobne obrazki tworzą ruch. Ustawisz też jego tempo.',
      ideas:[
        '<strong>Klatka</strong> to jeden obraz animacji. Ułóż kolejne pozycje piłki na osobnych warstwach.',
        '<strong>Kolejność</strong> decyduje o kierunku ruchu. W GIMP-ie animacja zaczyna się od dolnej warstwy.',
        '<strong>Opóźnienie</strong> mówi, jak długo widać jedną klatkę. Przy 500 ms trwa ona dwa razy dłużej niż przy 250 ms.'
      ],
      picture:{src:'https://informatyk-pruszcz.github.io/informatyka/klasa7/gimp-klatki.png',alt:'Cztery pozycje ludzika. W kolejnych klatkach jego ręka unosi się.',caption:'Spójrz na rękę ludzika. Zmienia położenie w każdej klatce. Tak samo możesz przesuwać piłkę.'},
      practice:[
        'Pobierz '+download('klatki.zip','trzy klatki piłki (ZIP)')+'. Kliknij plik prawym przyciskiem i wybierz <strong>Wyodrębnij wszystkie</strong>.',
        'Otwórz <code>klatka-1.png</code>. Klatki 2 i 3 dodaj przez <strong>Plik → Otwórz jako warstwy</strong>.',
        'Ustaw klatkę 1 na dole, 2 nad nią, a 3 na górze. Odtwórz podgląd w <strong>Filtry → Animacja → Odtwarzanie</strong>.',
        'Zapisz <code>pilka.xcf</code>. Wyeksportuj <code>pilka.gif</code>, zaznacz <strong>Jako animacja</strong> i ustaw 250 ms.'
      ],
      check:'Wyeksportuj drugą wersję z opóźnieniem 500 ms. Porównaj tempo obu plików.',
      takeaway:'Kolejność klatek ustala kierunek. Dłuższy czas klatki spowalnia ruch.',
      links:'W karcie GIMP znajdziesz podgląd animacji sterowany przyciskami oraz ćwiczenie z filtrem Fale. <a href="https://informatyk-pruszcz.github.io/informatyka/klasa7/gimp-animacje.html">Otwórz kartę GIMP 3.2</a>.'
    }),[
      ['Gdzie umieścisz pierwszą klatkę w panelu warstw?','Na dole listy warstw.'],
      ['Co się zmieni po przejściu z 250 ms na 500 ms?','Każda klatka będzie widoczna dłużej, więc ruch zwolni.'],
      ['Gotowy GIF pokazuje tylko nieruchomy obraz. Co sprawdzisz przy eksporcie?','Upewnię się, że projekt ma kilka klatek i że wybrano „Jako animacja”.']
    ]),
  note('topic-7-3-3','Zbuduj podpórkę z dwóch brył','II.4','Szkolny edytor 3D i program do podglądu druku',
    'Edytowalny model, plik STL i zapisane wymiary.',
    'Sprawdź milimetry, płaskie ułożenie podstawy oraz styk podstawy ze ścianką.',
    graphicsLesson({
      goal:'Połączysz podstawę i ściankę w jeden model. Obejrzysz go przed drukiem.',
      ideas:[
        '<strong>Trzy wymiary</strong> to szerokość, głębokość i wysokość. W tym zadaniu wszystkie wartości wpisujesz w milimetrach.',
        '<strong>Widoki</strong> odpowiadają różnym stronom modelu. Z góry widzisz kształt podstawy. Z boku łatwiej zauważyć szczelinę pod ścianką.',
        '<strong>STL</strong> zapisuje kształt bryły. Program do przygotowania wydruku pokazuje, z jakich warstw powstanie model.'
      ],
      picture:{src:assets+'podporka-widoki.png',alt:'Widok z góry pokazuje podstawę 30 na 20 mm. Widok z boku pokazuje podstawę o grubości 3 mm i ściankę o wysokości 12 mm.',caption:'Porównaj dwa widoki tej samej podpórki. W widoku z boku ścianka dotyka podstawy.'},
      practice:[
        'Wczytaj '+download('podstawa.stl','podstawę 30 × 20 × 3 mm (STL)')+' do edytora 3D. Sprawdź jednostkę <strong>mm</strong>.',
        'Dodaj prostopadłościan <strong>30 × 3 × 12 mm</strong>. Ustaw go przy tylnym brzegu na wierzchu podstawy.',
        'Obejrzyj połączenie z boku. Połącz bryły i zapisz edytowalny projekt.',
        'Wyeksportuj <code>podporka.stl</code>. W programie do druku obejrzyj pierwszą, środkową i ostatnią warstwę.'
      ],
      check:'Podstawa leży płasko, a między nią a ścianką nie ma przerwy. Wydruk uzgodnij z nauczycielem.',
      takeaway:'Przed drukiem sprawdź jednostki i obróć model. Jeden widok to za mało.',
      links:'Jeśli edytor nie jest dostępny, narysuj widok z góry i z boku na kartce. Podpisz podane wymiary.'
    }),[
      ['Który widok ułatwia dostrzeżenie szczeliny pod ścianką?','Widok z boku pokazuje styk pionowej ścianki z podstawą.'],
      ['Jaką jednostkę wybierzesz w tym projekcie?','Milimetry, czyli mm.'],
      ['Co pokaże podgląd po przygotowaniu pliku do druku?','Kolejne warstwy budujące bryłę.']
    ]),
  note('topic-7-3-4','Zaproś klasę plakatem, który da się przeczytać','II.3a, II.4, IV.1','GIMP lub Inkscape',
    'Projekt plakatu, wersja do publikacji i jedno zdanie o wprowadzonej poprawce.',
    'Odbiorca z końca sali potrafi odczytać nazwę wydarzenia, termin i miejsce.',
    graphicsLesson({
      goal:'Przygotujecie zaproszenie na fikcyjny spacer. Sprawdzicie, co odbiorca widzi jako pierwsze.',
      ideas:[
        '<strong>Kolejność czytania.</strong> Duży tytuł przyciąga uwagę. Pod nim odbiorca szuka terminu i miejsca.',
        '<strong>Kontrast</strong> pomaga odczytać tekst. Wypróbuj ciemne litery na jasnym, gładkim tle.',
        '<strong>Źródło ilustracji.</strong> Najprościej użyć własnego rysunku. Przy cudzym sprawdź warunki użycia i dodaj wymagany podpis.'
      ],
      picture:{src:assets+'plakat-czytelnosc.png',alt:'Plakat o spacerze. Największy tekst to nazwa wydarzenia. Pod ilustracją na jasnym tle wyróżniono datę, godzinę i miejsce.',caption:'Odczytaj w tej kolejności. Co się wydarzy? Kiedy? Gdzie?'},
      practice:[
        'W parze zapiszcie trzy informacje. Przykład: <strong>Spacer przyrodniczy, 15 maja o 10.00, zbiórka przed szkołą</strong>.',
        'Ułóżcie tytuł, ilustrację i szczegóły na plakacie. Możecie pobrać '+download('plakat.svg','szablon do Inkscape (SVG)')+' albo zacząć od pustego projektu w GIMP-ie.',
        'Pokażcie wersję próbną drugiej parze. Poproście o odczytanie terminu i miejsca z końca sali.',
        'Poprawcie jeden szczegół po odpowiedzi odbiorcy. Zapiszcie projekt i wyeksportujcie plakat jako PNG.'
      ],
      check:'Zapiszcie, co zmieniliście i dlaczego. Przykład: „Przenieśliśmy godzinę spod ilustracji, bo trudno ją było znaleźć”.',
      takeaway:'Dobry plakat odpowiada od razu na trzy pytania. Co? Kiedy? Gdzie?',
      links:'Najpierw zróbcie szkic na kartce. Zostawcie wolne miejsce między tytułem, ilustracją i szczegółami.'
    }),[
      ['Co musi znaleźć się na zaproszeniu?','Nazwa wydarzenia, termin i miejsce.'],
      ['Godzinę trudno odczytać na zdjęciu. Jak poprawisz plakat?','Przeniosę godzinę na gładkie tło i zadbam o kontrast.'],
      ['Jak sprawdzisz, czy odbiorca znalazł ważne szczegóły?','Poproszę go o odczytanie terminu i miejsca z końca sali.']
    ])
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
