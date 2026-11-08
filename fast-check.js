// Każdy wiersz odpowiada jednemu tematowi. Kolejność par odpowiada pytaniom w notatce.
// Znak ? oznacza pytanie z odpowiedzią tak/nie lub prawda/fałsz.
const variants = `
4-0-1|Próbuję samodzielnie naprawić sprzęt.|Kto w pracowni odpowiada za sprzęt?|Żeby pominąć sprawdzanie wyniku.|Pomyśl o kolejności czynności.
4-1-1|?|W którą stronę płynie nagrywany dźwięk?|Przesyła tylko obraz z komputera.|Co robi ekran, gdy dotykasz ikony?
4-1-2|Obie czynności zawsze usuwają oryginał.|Policz egzemplarze po każdej operacji.|?|Gdzie możesz umieścić kilka rysunków?
4-1-3|Głośnika.|Ala chce nagrywać dźwięk.|Przenieść jedyny egzemplarz do projektu.|Celina chce zachować oryginał.|Podaje rozmiar pliku w bajtach.|Porównaj końcówki .png i .txt.
4-2-1|?|Dokąd sięga połączenie z routerem?|Wyłącznie do wpisywania adresu strony.|Co musi otrzymać przeglądarka?
4-2-2|?|Kto mógłby użyć twojego hasła?|Ukryć wiadomość i dalej klikać.|Kto może pomóc sprawdzić sytuację?
4-2-3|Wyszukiwarka służy do instalowania przeglądarki.|Gdzie wpisujesz słowa, by znaleźć informacje?|?|Czy kolejność mówi coś pewnego o autorze?
4-2-4|Lista technicznych haseł do routera.|Przypomnij sobie zasady rozmowy.|Fakt o wszystkich graczach.|Czy inna osoba może lubić tę grę?
4-2-5|?|Zastanów się, z czym łączy się urządzenie.|Tylko liczbę polubień.|Kto napisał każdą informację?|Ocenić osobę zamiast jej pracy.|Wskaż element pracy, który można poprawić.
4-3-1|800 bajtów i 600 kolorów.|Co oznacza jednostka px?|?|Czy oglądanie przez lupę dodaje szczegóły do pliku?
4-3-2|Aby wszystkie kopie zawsze poruszały się razem.|Pomyśl o rysowaniu dziesięciu takich samych kół.|?|Wyobraź sobie literę odbitą w lustrze.
4-3-3|Postać automatycznie znika po zapisaniu projektu.|Która warstwa leży na wierzchu?|?|Sprawdź, czy białe piksele nadal istnieją.
4-3-4|Powiększyć pierwszy kwiat dziesięć razy.|Ile obiektów powstanie po powiększeniu?|Wyłącznie nazwę pliku.|Czy inna warstwa zasłania postać?|?|Porównaj rozmiar obrazu przed i po powiększeniu widoku.
4-4-1|Oba usuwają zawsze znak po prawej stronie.|Sprawdź pozycję znaku względem kursora.|Aby automatycznie zapisać plik.|Skąd edytor wie, co ma pogrubić?
4-4-2|?|Co robi edytor, gdy tekst dochodzi do marginesu?|Mój kot , lubi mleko .|Przyjrzyj się odstępom przed znakami.
4-4-3|Kadrowanie zmniejsza równomiernie całe zdjęcie.|Co dzieje się z brzegami kadru?|Tylko nazwę programu.|Czy tekst nadal daje się przeczytać?
4-4-4|Dodawać spacje aż do środka ekranu.|Która opcja ustawia cały akapit?|Od razu usunąć plik źródłowy.|Jak upewnisz się, że plik można znaleźć?|?|Co pomoże dostrzec najważniejsze słowo?
4-5-1|Scena jest postacią, którą steruje duszek.|Gdzie rozgrywa się akcja?|15 kroków.|Policz pięć porcji po dziesięć.|Wyłącznie kolor tła.|Od czego zaczyna się skrypt?
4-5-2|Żeby obie postacie zaczęły mówić jednocześnie.|Kiedy ma zacząć się odpowiedź?|?|Czy ukryty duszek nadal jest na liście?|Usunąć duszka z projektu.|Poszukaj bloczka w kategorii Wygląd.
4-5-3|Zwiększyć y o 10.|Która oś biegnie poziomo?|Żeby wykryć spotkanie tylko przy starcie.|Kiedy w grze może dojść do spotkania?|?|Czy kostka może dwa razy pokazać trzy?
4-5-4|Żeby duszek zaczynał tam, gdzie skończył ostatnio.|Porównaj start dwóch prób.|Zmienić wszystkie bloczki naraz.|Jak rozpoznasz, która poprawka pomogła?|?|Położenie i widoczność to różne cechy.
5-1-1|?|Co oznaczają symbole końca akapitu?|Przesuwając margines strony.|Wybierz najpierw fragment do zmiany.|?|Czy poprawnie zapisane słowo zawsze pasuje do zdania?
5-1-2|?|Jak rozpoznasz punkt należący do innego punktu?|W ustawieniach drukarki.|Gdzie edytor grupuje gotowe wyglądy tekstu?|Gdy wszystkie punkty mają być bez kolejności.|Pomyśl o przepisie z kolejnymi krokami.
5-1-3|?|Wyobraź sobie plan zajęć wpisany w kilka pól.|Poziomo, od lewej do prawej.|Pomyśl o kolumnie podtrzymującej dach.|6 komórek.|Policz po dwa pola w każdym wierszu.
5-1-4|Automatycznie zmienia rozdzielczość obrazu.|Obserwuj, dokąd przesuwają się słowa.|Zmieniać szerokość niezależnie od wysokości.|Porównaj kształt koła przed i po zmianie.|Że obraz jest zablokowany na zawsze.|Z czym jest powiązany obraz pływający?
5-1-5|?|Jakie elementy widać w atlasie?|Losowy krój pisma na każdej stronie.|Co powinno się powtarzać?|Aby każda osoba przygotowała tę samą stronę.|Jak połączysz rozdziały różnych autorów?
5-2-1|Jednym efektem zmiany ekranu.|Co dodajesz, gdy potrzebujesz kolejnej strony pokazu?|?|Sprawdź zakres zastosowania motywu.|Bo program nie zapisuje długich zdań.|Pomyśl o osobie w ostatniej ławce.
5-2-2|?|Czy zdjęciu można dodać podpis?|Zakończyć pracę bez prezentacji.|Jak zwykle dodajesz zdjęcie do slajdu?|Z dowolnej strony bez sprawdzania autora.|Sprawdź, kto pozwala wykorzystać zdjęcie.
5-2-3|?|Rozróżnij element slajdu i cały slajd.|Rozmiar liter.|W jakich jednostkach opisujemy długość animacji?|Ustawić każdy efekt po poprzednim.|Czy efekty mają czekać na zakończenie innych?
5-2-4|Nie, można zmienić tylko rozmiar klipu.|Sprawdź ustawienia odtwarzania.|?|W którym pliku możesz zaznaczyć pojedynczy napis?|?|Czy wszystkie programy mają identyczny eksport?
5-2-5|?|Poszukaj listy efektów.|Oba oznaczają wyłącznie długość animacji.|Oddziel czas czekania od ruchu.|Gdy efekty mają ruszyć równocześnie.|Kiedy kończy się wcześniejszy efekt?
5-3-1|Tylko kolor duszka.|Co może uniemożliwić dojście do mety?|Aby zachować kroki z poprzedniej próby.|Od czego powinien zacząć licznik?|B jest krótsza o 20 kroków.|Porównaj 140 i 160 kroków.
5-3-2|Do Wyglądu.|Szukasz bloczka zbierającego informację.|?|Czy samo pytanie zmienia pozycję?|Zwiększę x jeszcze o 3.|Jak odwrócić przesunięcie?
5-3-3|?|Co dzieje się z poprzednim rysunkiem po uniesieniu pisaka?|Ruch o bok i obrót o 45°.|Ile obrotu przypada na cztery równe skręty?|Zmieniać tylko kolor tła.|Które narzędzie zostawia ślad?
5-3-4|Kolor wypełnienia figury.|Gdzie skrypt używa zmiennej Bok?|Każdy kwadrat sam obróci się o 30°.|Czy zmienił się kierunek rozpoczęcia?|16 ruchów.|Każdy z dwunastu kwadratów ma cztery boki.
5-4-1|Dowolny uchwyt na końcu ręki.|Odszukaj początek figury.|?|Pomyśl, do czego służy podgląd poprzedniej klatki.|PIV służy tylko do oglądania gotowego filmu.|W którym pliku da się dalej ustawiać figury?
5-4-2|W oknie eksportu GIF.|Gdzie możesz dodawać segmenty?|Tylko podczas odtwarzania gotowego GIF-u.|Czy figura jest teraz edytowana?|?|Pomyśl o ruchu całej figury.
5-4-3|Żeby program sam narysował wszystkie klatki.|Jak ustalisz kolejność wydarzeń?|Wyłącznie w oknie zapisu filmu.|W jakim programie rysujesz obrazy?|?|Kto ustawia pozycje w kolejnych klatkach?
6-1-1|?|Kto czyta wiadomość po drugiej stronie?|Formatowaniem.|Przypomnij sobie nazwę etykiety sieciowej.|Zawsze oznacza radość.|Jak odbiorca może odczytać ton?
6-1-2|?|Czy takie hasło łatwo odgadnąć?|Sam poprawny zapis ortograficzny.|Czy ktoś próbuje wymusić pośpiech?|?|Czy ktoś mógł przejąć konto?
6-1-3|?|Kto wykonał zdjęcie?|Wpiszę wyłącznie słowo „jedzenie”.|Który składnik chcesz wykluczyć?|?|Skąd obie strony wzięły informację?
6-1-4|?|Jak sprawdzisz odpowiedź w innym źródle?|Zwykłe włączenie lampki przełącznikiem.|Które zadanie wymaga rozpoznawania wzorców?|Bo czat przyjmuje wyłącznie liczby.|Pomyśl, kto może przetwarzać wpisany tekst.
6-2-1|12D.|W adresie najpierw podaj oznaczenie kolumny.|A0.|Od którego numeru zaczynają się wiersze?|Żeby oba pola dostały tę samą liczbę.|Jak arkusz rozpozna odstęp między liczbami?
6-2-2|2, 15, 40, 99.|Od której wartości zaczniesz malejąco?|Sortowanie alfabetyczne.|Szukasz zmiany wyglądu, gdy warunek jest spełniony.|Ponieważ arkusz nie potrafi sortować liczb.|Co łączy wynik z właściwą drużyną?
6-2-3|?|Od którego znaku zaczyna się wzór?|Ukośnik /.|Pomyśl o iloczynie, a nie ilorazie.|25.|Sprawdź operator między adresami.
6-2-4|?|Co wybierasz po zaznaczeniu zakresu?|?|Czy jedna dobrze podpisana seria wymaga klucza kolorów?|Powiązany wykres zachowuje zawsze stare liczby.|Czy wykres korzysta z tabeli, czy jest obrazkiem?
6-2-5|?|Do czego służy współtworzenie?|Obie osoby mogą nadpisywać dane.|Która osoba może zmienić zawartość komórki?|Wszyscy naraz wpisują dane do tej samej komórki.|Jak uniknąć nadpisania czyjejś pracy?
6-3-1|?|Co możesz zmienić w kopii projektu?|W pojedynczym kostiumie duszka.|Szukasz miejsca na zbiór projektów.|?|Kto stworzył wcześniejszą wersję?
6-3-2|?|Co może odebrać drugi duszek?|Bloczek zatrzymujący wszystkie skrypty.|Jak duszek rozpozna chwilę nadejścia sygnału?|Zwiększę liczbę kroków duszka.|Porównaj nazwy nadawanego i odbieranego sygnału.
6-3-3|?|Ile pozycji może zawierać lista?|W nazwie sceny.|Która wartość zmienia się podczas gry?|Zastąpię całą listę jedną liczbą 8.|Jak zachowasz poprzednie wyniki?
6-4-1|?|Co widzisz, gdy kartki leżą jedna na drugiej?|Zwiększę powiększenie widoku.|Które ustawienie wpływa na przezroczystość?|Przeniosę napis pod nieprzezroczyste tło.|Która warstwa powinna być wyżej?
6-4-2|?|Z ilu zdjęć możesz wybrać fragmenty?|Nazwa pliku i folder.|Co zmienia wygląd świateł i cieni?|Połączenie wszystkiego w jedną warstwę.|Którą część chcesz móc zaznaczyć osobno?
6-4-3|?|Jak przygotujesz kilka części projektu?|Zmienię nazwę zdjęcia.|Co umożliwia przejście do innej strony?|Zmniejszę czytelność podpisu.|Co zasłania napis?
6-4-4|?|Czy każdy element możesz poprawić osobno?|Wyłącznie zmianą nazwy pliku na swoim komputerze.|Jak plik dotrze do drugiej osoby?|Każdy przygotuje oba napisy ponownie.|Jak uniknąć dublowania pracy?
7-1-1|?|Policz widoczne kropki.|10, bo dodaję 8 i 2.|Dopasuj cyfry kolejno do 8, 4, 2 i 1.|1000₂.|Których kart potrzebujesz do sumy 15?
7-2-1|?|Porównaj napis na karcie z nagłówkiem w treści.|<p/>|Gdzie umieszczasz ukośnik w znaczniku zamykającym?|<p><strong>Witaj!</p></strong>|Zamknij najpierw ostatni otwarty element.
7-2-2|?|Przypomnij sobie zapis przykładu z park.svg.|Podaje adres pliku obrazu.|Co otrzyma osoba, która nie widzi ilustracji?|Dodam href="plan" do nagłówka.|Link potrzebuje pasującego identyfikatora.
7-4-1|?|Jak poprawisz nazwę klubu w kilku akapitach?|Policzę numery stron.|Które narzędzie podaje długość tekstu?|Ponieważ edytor zamienia wyłącznie pierwsze słowo.|Czy nowy wyraz pasuje do zdania?
7-4-2|?|Czy odbiorca przeczyta zasłonięty tekst?|Akapit.|Gdzie spotykają się wiersze i kolumny?|Dokument zawsze sam odnajdzie przeniesiony plik.|Jak program trafi do starej lokalizacji?
7-4-3|?|Co wstawia pole numeru strony?|Interlinia.|Odstęp dotyczy brzegu kartki.|Trzeba wtedy samemu przepisać wszystkie numery.|Co edytor aktualizuje po dodaniu strony?
7-4-4|?|Kto sprawdzi gotową gazetkę?|Wyłącznie szybkość połączenia i stan baterii.|Co wpływa na czytelność gotowej strony?|Dodam taki sam obraz na wierzchu.|Sprawdź położenie oraz rozmiar ilustracji.
7-5-1|?|Co się porusza: element czy cały slajd?|Margines i numer strony.|Pomyśl o tym, co widzisz i słyszysz.|Aby program automatycznie poprawił wszystkie błędy.|Co usłyszy i zobaczy widownia?
7-5-2|?|Do czego służy przycinanie?|Przyspieszę odtwarzanie obrazu.|Która ścieżka zagłusza głos?|Każda muzyka w internecie ma te same warunki użycia.|Sprawdź, na co pozwala twórca.
ai|Tylko słowo „ładnie”.|Co musi wiedzieć zaproszona osoba?|Wypiszę ponownie te same osiem ogólnych tematów.|Wybierz jeden obszar do pogłębienia.|Zostawię informację, bo brzmi ciekawie.|Kto może potwierdzić obietnicę nagród?
`.trim().split('\n');
const pairs=new Map(variants.map(line=>{const [key,...fields]=line.split('|'); return [key,fields];}));
const extra={
 n4a:['4-1-2',0,1],n4b:['4-5-1',0,1],n5a:['4-4-2',0,1],n5b:['5-3-3',1,0],n6a:['6-2-1',0,1],n6b:['6-1-2',1,2],n7a:['7-2-1',0,1],
 n7b:['4-2-1',0,1]
};
const safety='63c8ba84-c5e8-4f27-a519-0ccd4c692193';
export function fastQuestions(item,topics){
 if(item.type!=='note'||item.pending||!item.grades.some(g=>g>=4&&g<=7))return [];
 if(item.id===safety)return [
 {q:'Kabel jest uszkodzony. Co robisz?',a:'Przerywam pracę i informuję nauczyciela.',wrong:'Próbuję samodzielnie naprawić kabel.',hint:'Kto odpowiada za sprzęt w pracowni?'},
 {q:'Gdzie odstawisz kubek z wodą?',a:'Z dala od sprzętu.',wrong:'Obok klawiatury.',hint:'Pomyśl, gdzie może rozlać się napój.'}];
 let key=item.id.replace('topic-',''), quiz=item.quiz||[],indices=quiz.map((_,i)=>i);
 if(item.id==='pisanie-z-ai')key='ai';
 if(extra[item.id]&&!quiz.length){[key,...indices]=extra[item.id];quiz=topics['topic-'+key].quiz;}
 const original=topics[item.id]?.quiz;
 if(original && original.some((entry,i)=>entry.q!==quiz[i]?.q || entry.a!==quiz[i]?.a))return [];
 const fields=pairs.get(key);
 if(!fields)return [];
 return indices.flatMap(i=>{
 const {q,a}=quiz[i],variant=fields[2*i],hint=fields[2*i+1];
 if(!variant||!hint)return [];
 if(variant!=='?')return [{q,a,wrong:variant,hint}];
 const yes=/^(Tak|Prawda)\b/i.test(a),statement=/^(Prawda|Fałsz)/i.test(a);
 return [{q,a,correct:statement?(yes?'Prawda':'Fałsz'):(yes?'Tak':'Nie'),wrong:statement?(yes?'Fałsz':'Prawda'):(yes?'Nie':'Tak'),hint}];
 });
}
export function mountFastCheck(host,questions){
 const title=document.createElement('h2');title.textContent='Fast Check';
 const intro=document.createElement('p');intro.textContent='Wybierz odpowiedź. Po wskazówce możesz spróbować ponownie.';
 host.append(title,intro);
 questions.forEach(({q,a,correct,wrong,hint},index)=>{
 const box=document.createElement('fieldset');box.className='cloud-box';box.style.minWidth='0';
 const legend=document.createElement('legend');legend.textContent=q;
 const actions=document.createElement('div');actions.className='actions';
 const status=document.createElement('p');status.setAttribute('role','status');
 const options=[{label:correct||a,ok:true},{label:wrong,ok:false}];
 if(Math.random()<0.5)options.reverse();
 for(const choice of options){
 const button=document.createElement('button');button.type='button';button.className='btn';button.textContent=choice.label;button.style.whiteSpace='normal';button.style.overflowWrap='anywhere';button.setAttribute('aria-pressed','false');
 button.onclick=()=>{for(const b of actions.querySelectorAll('[aria-pressed]'))b.setAttribute('aria-pressed',String(b===button));status.textContent=choice.ok?'Dobrze! '+a:'Spróbuj jeszcze raz. '+hint;};
 actions.append(button);
 }
 const help=document.createElement('button');help.type='button';help.className='text-link';help.textContent='Wskazówka';help.onclick=()=>{status.textContent=hint;};
 box.append(legend,actions,help,status);host.append(box);
 });
}
