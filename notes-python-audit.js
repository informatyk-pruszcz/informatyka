export const pythonTopics = [
  {
    title:'Ile minut trwa wspólne czytanie?', points:'I.1, III.3',
    idea:'Dane wejściowe to liczba rund. Jedna runda trwa 5 minut. Wynikiem ma być łączny czas.',
    code:`rundy = int(input("Liczba rund: "))
minuty = rundy * 5
print(minuty)`,
    task:'Zapisz program czas.py. Zmień czas rundy na 7 minut. Przed uruchomieniem oblicz wynik dla trzech rund.',
    tests:['W przykładzie 3 rundy dają 15 minut. Po zmianie oczekuj 21.', 'Dla 0 rund wynik wynosi 0 w obu wersjach.'],
    extra:'Wczytaj również czas jednej rundy. Opisz, jakie dane mają sens.',
    question:'Dlaczego zamieniamy wynik input na int?', answer:'input zwraca tekst. int pozwala liczyć na wartości całkowitej.'
  },
  {
    title:'Które wyniki przekroczyły próg?', points:'I.1, II.1',
    idea:'Mamy listę punktów. Dla każdego wyniku sprawdź warunek. Licznik rozpoczyna się od zera.',
    code:`wyniki = [2, 5, 7, 5]
licznik = 0
for punkty in wyniki:
    if punkty >= 5:
        licznik += 1
print(licznik)`,
    task:'Zapisz prog.py. Prześledź licznik po każdym wyniku. Zmień warunek tak, aby liczyły się wyniki ściśle większe od 5.',
    tests:['Dla [2, 5, 7, 5] przykład zwraca 3. Zmieniony program zwraca 1.', 'Dla [] pętla wykona się zero razy. Wynik powinien wynieść 0.'],
    extra:'Wczytaj próg z klawiatury i porównaj wyniki dla dwóch progów.',
    question:'Dlaczego 5 przechodzi pierwszy warunek?', answer:'Operator >= dopuszcza równość. Operator > jej nie dopuszcza.'
  },
  {
    title:'Jak reszta z dzielenia pomaga znaleźć NWD?', points:'I.1, I.2a',
    idea:'Dla dodatnich liczb NWD to największy wspólny dzielnik. Zamieniaj parę (a, b) na (b, reszta), aż b osiągnie zero.',
    code:`a = 48
b = 18
while b != 0:
    reszta = a % b
    a, b = b, reszta
print(a)`,
    task:'Zapisz nwd.py. Przed uruchomieniem wypisz kolejne pary. Przewidź, co zwróci 18 % 6. Sprawdź obie prognozy w Pythonie.',
    tests:['Dla 48 i 18 kolejne pary to (18, 12), (12, 6), (6, 0). Wynik to 6.', 'Dla 9 i 9 wynik to 9. Dla 7 i 0 pętla nie wykona się, a wynikiem będzie 7.'],
    extra:'Rozłóż 60 na czynniki. Zacznij od d = 2. Dopóki n > 1, gdy n % d == 0, wypisz d i wykonaj n //= d. W przeciwnym razie zwiększ d o 1. Oczekuj 2, 2, 3, 5. Dla n = 1 lista czynników będzie pusta.',
    question:'Po czym poznasz, że 6 jest dzielnikiem 18?', answer:'18 % 6 daje zero, więc dzielenie nie zostawia reszty.'
  },
  {
    title:'Jak znaleźć pierwsze wystąpienie na liście?', points:'I.1, I.2b',
    idea:'Numeruj miejsca od zera. Przejrzyj elementy po kolei. Zakończ po pierwszym trafieniu.',
    code:`lista = [4, 2, 4, 9]
szukana = 4
pozycja = -1
for i in range(len(lista)):
    if lista[i] == szukana:
        pozycja = i
        break
print(pozycja)`,
    task:'Zapisz szukaj.py. Dla szukanej 9 zapisz kolejno odwiedzone indeksy. Zmień poszukiwaną liczbę na 8.',
    tests:['Dla szukanej 9 wynik to 3. Dla 4 otrzymasz 0, choć na liście są dwie czwórki.', 'Dla brakującej 8 oraz pustej listy wynik to -1. Tu -1 oznacza brak wyniku.'],
    extra:'Usuń break. Zanim włączysz program, przewidź wynik dla 4. Wyjaśnij różnicę.',
    question:'Po co polecenie break?', answer:'Zatrzymuje pętlę po pierwszym trafieniu.'
  },
  {
    title:'Jak porządkować liczby przez wybór?', points:'I.1, I.2b',
    idea:'Znajdź najmniejszą liczbę w nieuporządkowanej części listy. Zamień ją z pierwszą liczbą tej części.',
    code:`liczby = [5, 2, 4, 2]
for i in range(len(liczby) - 1):
    najm = i
    for j in range(i + 1, len(liczby)):
        if liczby[j] < liczby[najm]:
            najm = j
    liczby[i], liczby[najm] = liczby[najm], liczby[i]
print(liczby)`,
    task:'Zapisz sortuj.py. Dodaj print(liczby) po zamianie, wewnątrz zewnętrznej pętli. Wskaż część listy, która jest już uporządkowana.',
    tests:['Dla [5, 2, 4, 2] wynik to [2, 2, 4, 5]. Obie dwójki zostają.', 'Dla [] wynik to []. Dla [7] wynik to [7].'],
    extra:'W pętli po j skróć koniec zakresu o 1. Przetestuj [1, 2, 3] i [3, 2, 1]. Wyjaśnij różnicę i przywróć poprawną granicę.',
    question:'Dlaczego algorytm zapamiętuje indeks minimum?', answer:'Indeks mówi, który element zamienić z początkiem pozostałej części.'
  }
];