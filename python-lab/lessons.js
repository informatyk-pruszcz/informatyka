// Autorskie ćwiczenia. Przykłady pokazują mechanizm, zadania wymagają własnej zmiany.
export const lessons = [
  {
    "id": "pierwszy-program",
    "group": "01 · Pierwsze kroki",
    "title": "Pierwsza wiadomość",
    "intro": "print() wyświetla wiadomość. Tekst otocz cudzysłowami. Python wykonuje polecenia od góry do dołu.",
    "example": "print(\"Hej, odkrywco!\")",
    "task": "Wyświetl dokładnie: Cześć, Python!",
    "starter": "print(\"Tutaj wpisz wiadomość\")",
    "solution": "print(\"Cześć, Python!\")",
    "tests": [
      {
        "input": [],
        "output": "Cześć, Python!"
      }
    ],
    "requirements": [
      {
        "feature": "call:print",
        "label": "Wyświetl wiadomość za pomocą print()."
      }
    ],
    "hints": [
      "Zmień tekst wewnątrz cudzysłowów.",
      "Zostaw nawiasy i oba cudzysłowy."
    ],
    "experiment": "Dodaj drugą wiadomość. Kliknij „Uruchom” i obejrzyj wynik."
  },
  {
    "id": "dwie-linie",
    "group": "01 · Pierwsze kroki",
    "title": "Program krok po kroku",
    "intro": "Każde print() zaczyna nowy wiersz. Komentarz po # jest wskazówką dla człowieka — Python go pomija.",
    "example": "print(\"Start\")\n# Krótka przerwa w opowieści\nprint(\"Meta\")",
    "task": "Wyświetl w osobnych wierszach: Jestem oraz programistą.",
    "starter": "# Wpisz dwa polecenia\n",
    "solution": "print(\"Jestem\")\nprint(\"programistą.\")",
    "tests": [
      {
        "input": [],
        "output": "Jestem\nprogramistą."
      }
    ],
    "requirements": [
      {
        "feature": "call:print",
        "label": "Użyj print() do pokazania dwóch wierszy."
      }
    ],
    "hints": [
      "Napisz dwa wywołania print().",
      "Każdą wiadomość otocz cudzysłowami."
    ],
    "experiment": "Zamień kolejność poleceń. Co zmieniło się w wyniku?"
  },
  {
    "id": "zmienne",
    "group": "01 · Pierwsze kroki",
    "title": "Pudełko z nazwą",
    "intro": "Zmienna przechowuje wartość. Znak = przypisuje wartość do nazwy. Później możesz użyć tej nazwy.",
    "example": "zwierze = \"kot\"\nprint(zwierze)",
    "task": "Utwórz zmienną imie z tekstem Ada. Wyświetl jej zawartość.",
    "starter": "imie = \"\"\nprint(imie)",
    "solution": "imie = \"Ada\"\nprint(imie)",
    "tests": [
      {
        "input": [],
        "output": "Ada"
      }
    ],
    "requirements": [
      {
        "feature": "Assign",
        "label": "Przypisz wartość do zmiennej."
      },
      {
        "feature": "call:print",
        "label": "Wyświetl zawartość zmiennej."
      }
    ],
    "hints": [
      "Wpisz Ada pomiędzy cudzysłowy.",
      "W print(imie) nazwa nie potrzebuje cudzysłowów."
    ],
    "experiment": "Zmień imię i zobacz jego wartość pod konsolą."
  },
  {
    "id": "obliczenia",
    "group": "01 · Pierwsze kroki",
    "title": "Python liczy za Ciebie",
    "intro": "Liczby wpisuj bez cudzysłowów. + dodaje, - odejmuje, * mnoży, / dzieli. Nawiasy ustalają kolejność działań.",
    "example": "cena = 6\nsztuki = 3\nprint(cena * sztuki)",
    "task": "Bilet kosztuje 8 zł. Oblicz i wyświetl koszt 4 biletów. Użyj mnożenia.",
    "starter": "cena = 8\nsztuki = 4\nprint()",
    "solution": "cena = 8\nsztuki = 4\nprint(cena * sztuki)",
    "tests": [
      {
        "input": [],
        "output": "32"
      }
    ],
    "requirements": [
      {
        "feature": "Mult",
        "label": "Użyj operatora mnożenia *."
      }
    ],
    "hints": [
      "Połącz cenę i liczbę sztuk operatorem *.",
      "Wyrażenie obliczeniowe wstaw do print()."
    ],
    "experiment": "Sprawdź różnicę między print(2 + 3) i print(\"2\" + \"3\")."
  },
  {
    "id": "tekst-i-liczby",
    "group": "01 · Pierwsze kroki",
    "title": "Wiadomość ze zmienną",
    "intro": "f-string to tekst z miejscem na zmienne. Dodaj f przed cudzysłowem. Wartość wstaw pomiędzy { i }.",
    "example": "punkty = 12\nprint(f\"Masz {punkty} punktów.\")",
    "task": "Zmienna monety ma wartość 5. Wyświetl: Mam 5 monet. Użyj f-stringa.",
    "starter": "monety = 5\nprint(\"\")",
    "solution": "monety = 5\nprint(f\"Mam {monety} monet.\")",
    "tests": [
      {
        "input": [],
        "output": "Mam 5 monet."
      }
    ],
    "requirements": [
      {
        "feature": "JoinedStr",
        "label": "Wstaw zmienną do f-stringa."
      }
    ],
    "hints": [
      "Wiadomość zacznij od f\".",
      "W tekście użyj {monety}."
    ],
    "experiment": "Zwiększ liczbę monet. Wiadomość zmieni się automatycznie."
  },
  {
    "id": "detektyw-skladni",
    "group": "01 · Pierwsze kroki",
    "title": "Detektyw: zaginiony znak",
    "intro": "Błąd jest wskazówką, co poprawić. W konsoli zobaczysz numer wiersza. Cudzysłowy oraz nawiasy muszą tworzyć pary.",
    "example": "print(\"Działa!\")",
    "task": "Napraw program. Powinien wyświetlić: Misja wykonana!",
    "starter": "print(\"Misja wykonana!)",
    "solution": "print(\"Misja wykonana!\")",
    "tests": [
      {
        "input": [],
        "output": "Misja wykonana!"
      }
    ],
    "requirements": [
      {
        "feature": "call:print",
        "label": "Napraw wywołanie print()."
      }
    ],
    "hints": [
      "Sprawdź, gdzie zaczyna i kończy się tekst.",
      "Przed końcowym nawiasem brakuje zamknięcia tekstu."
    ],
    "experiment": "Usuń końcowy nawias. Uruchom kod i kliknij wskazany wiersz błędu."
  },
  {
    "id": "input",
    "group": "02 · Rozmowa i decyzje",
    "title": "Program pyta, Ty odpowiadasz",
    "intro": "input() odczytuje jedną odpowiedź jako tekst. W tej pracowni wpisujesz odpowiedzi pod edytorem, przed uruchomieniem. Każda odpowiedź zajmuje osobny wiersz.",
    "example": "kolor = input(\"Ulubiony kolor: \")\nprint(kolor)",
    "task": "Odczytaj imię przez input(). Wyświetl Cześć, IMIĘ! — w miejsce IMIĘ wstaw odpowiedź.",
    "starter": "imie = input(\"Jak masz na imię? \")\nprint(\"\")",
    "solution": "imie = input(\"Jak masz na imię? \")\nprint(f\"Cześć, {imie}!\")",
    "tests": [
      {
        "input": [
          "Ada"
        ],
        "output": "Cześć, Ada!"
      },
      {
        "input": [
          "Olek"
        ],
        "output": "Cześć, Olek!"
      }
    ],
    "requirements": [
      {
        "feature": "call:input",
        "label": "Odczytaj odpowiedź przez input()."
      }
    ],
    "hints": [
      "Wstaw odczytaną zmienną do wiadomości.",
      "Możesz użyć f\"Cześć, {imie}!\"."
    ],
    "experiment": "Zmień imię w polu danych. Nie zmieniaj programu."
  },
  {
    "id": "liczba-z-input",
    "group": "02 · Rozmowa i decyzje",
    "title": "Odpowiedź zamienia się w liczbę",
    "intro": "input() zwraca tekst. int() zamienia tekst na liczbę całkowitą. float() odczytuje liczbę z kropką, np. 2.5.",
    "example": "wiek = int(input(\"Ile masz lat? \"))\nprint(wiek + 1)",
    "task": "Odczytaj liczbę zeszytów. Każdy kosztuje 4 zł. Wyświetl sam koszt zakupu.",
    "starter": "zeszyty = input(\"Ile zeszytów? \")\n# Zamień tekst na liczbę i oblicz koszt\n",
    "solution": "zeszyty = int(input(\"Ile zeszytów? \"))\nprint(zeszyty * 4)",
    "tests": [
      {
        "input": [
          "3"
        ],
        "output": "12"
      },
      {
        "input": [
          "7"
        ],
        "output": "28"
      }
    ],
    "requirements": [
      {
        "feature": "call:input",
        "label": "Odczytaj liczbę zeszytów."
      },
      {
        "feature": "call:int",
        "label": "Zamień odpowiedź na liczbę przez int()."
      }
    ],
    "hints": [
      "Otocz input(...) wywołaniem int(...).",
      "Pomnóż liczbę zeszytów przez 4."
    ],
    "experiment": "Wpisz słowo zamiast liczby. Przeczytaj podpowiedź w konsoli."
  },
  {
    "id": "warunek-if",
    "group": "02 · Rozmowa i decyzje",
    "title": "Jeżeli, czyli if",
    "intro": "if sprawdza warunek. Po warunku dodaj dwukropek. Polecenia wewnątrz warunku wciśnij czterema spacjami.",
    "example": "punkty = 9\nif punkty > 5:\n    print(\"Bonus\")",
    "task": "Odczytaj temperaturę jako liczbę całkowitą. Gdy jest mniejsza od 0, wypisz Mróz. W przeciwnym razie nic nie wypisuj.",
    "starter": "temperatura = int(input(\"Temperatura: \"))\nif temperatura < 0:\n    pass",
    "solution": "temperatura = int(input(\"Temperatura: \"))\nif temperatura < 0:\n    print(\"Mróz\")",
    "tests": [
      {
        "input": [
          "-3"
        ],
        "output": "Mróz"
      },
      {
        "input": [
          "0"
        ],
        "output": ""
      },
      {
        "input": [
          "12"
        ],
        "output": ""
      }
    ],
    "requirements": [
      {
        "feature": "If",
        "label": "Sprawdź temperaturę za pomocą if."
      }
    ],
    "hints": [
      "Zastąp pass poleceniem wyświetlającym wiadomość.",
      "Zachowaj wcięcie pod linią z if."
    ],
    "experiment": "Co się zmieni, gdy użyjesz <= zamiast <?"
  },
  {
    "id": "if-else",
    "group": "02 · Rozmowa i decyzje",
    "title": "Dwie drogi: if i else",
    "intro": "else oznacza „w przeciwnym razie”. Wykonuje się, gdy warunek if jest fałszywy. Wcięcia pokazują, które polecenia należą do danej drogi.",
    "example": "wiek = 12\nif wiek >= 12:\n    print(\"Możesz wejść\")\nelse:\n    print(\"Jeszcze zaczekaj\")",
    "task": "Odczytaj punkty. Od 10 punktów wypisz Bonus, poniżej 10: Trenuj dalej.",
    "starter": "punkty = int(input(\"Punkty: \"))\n",
    "solution": "punkty = int(input(\"Punkty: \"))\nif punkty >= 10:\n    print(\"Bonus\")\nelse:\n    print(\"Trenuj dalej\")",
    "tests": [
      {
        "input": [
          "10"
        ],
        "output": "Bonus"
      },
      {
        "input": [
          "15"
        ],
        "output": "Bonus"
      },
      {
        "input": [
          "9"
        ],
        "output": "Trenuj dalej"
      }
    ],
    "requirements": [
      {
        "feature": "If",
        "label": "Użyj instrukcji warunkowej."
      }
    ],
    "hints": [
      "Pamiętaj, że 10 też daje bonus.",
      "Użyj >= 10 oraz else."
    ],
    "experiment": "Sprawdź wartości 9, 10 i 11. Dlaczego warto sprawdzać granicę?"
  },
  {
    "id": "elif",
    "group": "02 · Rozmowa i decyzje",
    "title": "Trzy możliwe odpowiedzi",
    "intro": "elif sprawdza kolejny warunek, gdy poprzedni nie pasował. Python wybiera pierwszą pasującą drogę.",
    "example": "n = 0\nif n > 0:\n    print(\"plus\")\nelif n == 0:\n    print(\"zero\")\nelse:\n    print(\"minus\")",
    "task": "Odczytaj liczbę. Wypisz dodatnia, zero lub ujemna. == porównuje wartości; = przypisuje wartość.",
    "starter": "n = int(input(\"Liczba: \"))\n",
    "solution": "n = int(input(\"Liczba: \"))\nif n > 0:\n    print(\"dodatnia\")\nelif n == 0:\n    print(\"zero\")\nelse:\n    print(\"ujemna\")",
    "tests": [
      {
        "input": [
          "4"
        ],
        "output": "dodatnia"
      },
      {
        "input": [
          "0"
        ],
        "output": "zero"
      },
      {
        "input": [
          "-2"
        ],
        "output": "ujemna"
      }
    ],
    "requirements": [
      {
        "feature": "If",
        "label": "Rozdziel trzy przypadki warunkami."
      }
    ],
    "hints": [
      "Zacznij od n > 0.",
      "W drugim warunku użyj n == 0."
    ],
    "experiment": "Odwróć kolejność: najpierw sprawdzaj liczby ujemne."
  },
  {
    "id": "dwa-warunki",
    "group": "02 · Rozmowa i decyzje",
    "title": "Czy liczba mieści się w zakresie?",
    "intro": "and oznacza „i”: oba warunki muszą być prawdziwe. >= oznacza „większe lub równe”, a <= „mniejsze lub równe”.",
    "example": "wiek = 13\nif wiek >= 12 and wiek <= 15:\n    print(\"Twoja grupa\")",
    "task": "Odczytaj godzinę. Od 8 do 15 włącznie wypisz Szkoła. Dla innych godzin wypisz Czas wolny. Użyj and.",
    "starter": "godzina = int(input(\"Godzina: \"))\n",
    "solution": "godzina = int(input(\"Godzina: \"))\nif godzina >= 8 and godzina <= 15:\n    print(\"Szkoła\")\nelse:\n    print(\"Czas wolny\")",
    "tests": [
      {
        "input": [
          "8"
        ],
        "output": "Szkoła"
      },
      {
        "input": [
          "15"
        ],
        "output": "Szkoła"
      },
      {
        "input": [
          "7"
        ],
        "output": "Czas wolny"
      },
      {
        "input": [
          "16"
        ],
        "output": "Czas wolny"
      }
    ],
    "requirements": [
      {
        "feature": "And",
        "label": "Połącz dwa warunki przez and."
      }
    ],
    "hints": [
      "Sprawdź jednocześnie dolną i górną granicę.",
      "Obie granice należą do zakresu."
    ],
    "experiment": "Zmień godziny otwarcia biblioteki na zakres 9–17."
  },
  {
    "id": "petla-for",
    "group": "03 · Powtarzanie i porządkowanie",
    "title": "Nie pisz pięć razy tego samego",
    "intro": "for powtarza polecenia. range(1, 4) daje liczby 1, 2, 3. Ostatnia podana granica nie wchodzi do wyniku.",
    "example": "for numer in range(1, 4):\n    print(numer)",
    "task": "Wypisz liczby od 1 do 5. Każdą w osobnym wierszu. Użyj for i range().",
    "starter": "for numer in range(1, 3):\n    print(numer)",
    "solution": "for numer in range(1, 6):\n    print(numer)",
    "tests": [
      {
        "input": [],
        "output": "1\n2\n3\n4\n5"
      }
    ],
    "requirements": [
      {
        "feature": "For",
        "label": "Użyj pętli for."
      },
      {
        "feature": "call:range",
        "label": "Ustal zakres przez range()."
      }
    ],
    "hints": [
      "Końcowa granica range() jest pomijana.",
      "Aby ostatnią liczbą było 5, granica musi być większa."
    ],
    "experiment": "Użyj range(2, 11, 2). Trzecia liczba to krok."
  },
  {
    "id": "suma-petla",
    "group": "03 · Powtarzanie i porządkowanie",
    "title": "Zbieramy punkty",
    "intro": "Zmienną można aktualizować: suma = suma + liczba. Przed pętlą zacznij od zera. Wynik wypisz dopiero po pętli.",
    "example": "suma = 0\nfor liczba in range(1, 4):\n    suma = suma + liczba\nprint(suma)",
    "task": "Odczytaj dodatnie n. Zsumuj liczby od 1 do n za pomocą pętli. Wyświetl sumę.",
    "starter": "n = int(input(\"Do jakiej liczby? \"))\nsuma = 0\n",
    "solution": "n = int(input(\"Do jakiej liczby? \"))\nsuma = 0\nfor liczba in range(1, n + 1):\n    suma = suma + liczba\nprint(suma)",
    "tests": [
      {
        "input": [
          "5"
        ],
        "output": "15"
      },
      {
        "input": [
          "1"
        ],
        "output": "1"
      },
      {
        "input": [
          "10"
        ],
        "output": "55"
      }
    ],
    "requirements": [
      {
        "feature": "For",
        "label": "Zsumuj liczby w pętli for."
      }
    ],
    "hints": [
      "Zakres powinien obejmować n.",
      "Przesuń print(suma) do lewej, poza pętlę."
    ],
    "experiment": "Porównaj wynik dla n=3 z obliczeniem 1+2+3."
  },
  {
    "id": "petla-while",
    "group": "03 · Powtarzanie i porządkowanie",
    "title": "Odliczanie do startu",
    "intro": "while powtarza kod, dopóki warunek jest prawdziwy. Zmieniaj licznik w pętli, aby mogła się zakończyć. Przycisk Stop zatrzyma zbyt długi program.",
    "example": "licznik = 2\nwhile licznik > 0:\n    print(licznik)\n    licznik = licznik - 1",
    "task": "Odczytaj dodatnie n. Odliczaj od n do 1. Na końcu wypisz Start!",
    "starter": "n = int(input(\"Odliczanie od: \"))\n",
    "solution": "n = int(input(\"Odliczanie od: \"))\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint(\"Start!\")",
    "tests": [
      {
        "input": [
          "3"
        ],
        "output": "3\n2\n1\nStart!"
      },
      {
        "input": [
          "1"
        ],
        "output": "1\nStart!"
      }
    ],
    "requirements": [
      {
        "feature": "While",
        "label": "Użyj pętli while."
      }
    ],
    "hints": [
      "Po wyświetleniu liczby zmniejsz n o 1.",
      "Start! wypisz poza pętlą."
    ],
    "experiment": "Co się stanie, jeśli pominiesz zmniejszanie n? Najpierw przewidź."
  },
  {
    "id": "listy",
    "group": "03 · Powtarzanie i porządkowanie",
    "title": "Plecak pełen danych",
    "intro": "Lista przechowuje kilka elementów w nawiasach []. Ich pozycje, czyli indeksy, liczymy od zera. Elementy oddzielamy przecinkami.",
    "example": "kolory = [\"czerwony\", \"zielony\", \"niebieski\"]\nprint(kolory[0])",
    "task": "Utwórz listę plecak: mapa, woda, latarka. Wyświetl drugi element listy.",
    "starter": "plecak = []\n",
    "solution": "plecak = [\"mapa\", \"woda\", \"latarka\"]\nprint(plecak[1])",
    "tests": [
      {
        "input": [],
        "output": "woda"
      }
    ],
    "requirements": [
      {
        "feature": "List",
        "label": "Utwórz listę."
      },
      {
        "feature": "Subscript",
        "label": "Odczytaj element za pomocą indeksu."
      }
    ],
    "hints": [
      "Pierwszy element ma indeks 0.",
      "Drugi element ma indeks 1."
    ],
    "experiment": "Spróbuj odczytać plecak[3]. Co podpowie konsola?"
  },
  {
    "id": "petla-po-liscie",
    "group": "03 · Powtarzanie i porządkowanie",
    "title": "Każdy element ma swoją kolej",
    "intro": "for może przechodzić po elementach listy. W każdej rundzie zmienna przechowuje kolejny element.",
    "example": "owoce = [\"jabłko\", \"gruszka\"]\nfor owoc in owoce:\n    print(owoc)",
    "task": "Dla listy imion Ada, Olek, Ewa wypisz kolejno Cześć, Ada! i analogiczne powitania.",
    "starter": "imiona = [\"Ada\", \"Olek\", \"Ewa\"]\n",
    "solution": "imiona = [\"Ada\", \"Olek\", \"Ewa\"]\nfor imie in imiona:\n    print(f\"Cześć, {imie}!\")",
    "tests": [
      {
        "input": [],
        "output": "Cześć, Ada!\nCześć, Olek!\nCześć, Ewa!"
      }
    ],
    "requirements": [
      {
        "feature": "For",
        "label": "Przejdź przez listę w pętli."
      },
      {
        "feature": "List",
        "label": "Przechowaj imiona w liście."
      }
    ],
    "hints": [
      "Nie potrzebujesz tu range().",
      "W każdej rundzie użyj zmiennej imie."
    ],
    "experiment": "Dodaj kolejne imię. Pętla sama wykona jeszcze jedną rundę."
  },
  {
    "id": "funkcje",
    "group": "03 · Powtarzanie i porządkowanie",
    "title": "Własne polecenie",
    "intro": "def tworzy funkcję. Parametr to wartość, którą przekazujesz przy wywołaniu. return oddaje wynik, aby można go było dalej wykorzystać.",
    "example": "def podwoj(liczba):\n    return liczba * 2\n\nprint(podwoj(3))",
    "task": "Napisz funkcję kwadrat(liczba), która zwraca liczbę pomnożoną przez siebie. Odczytaj liczbę i wyświetl wynik funkcji.",
    "starter": "def kwadrat(liczba):\n    pass\n\nn = int(input(\"Liczba: \"))\nprint(kwadrat(n))",
    "solution": "def kwadrat(liczba):\n    return liczba * liczba\n\nn = int(input(\"Liczba: \"))\nprint(kwadrat(n))",
    "tests": [
      {
        "input": [
          "4"
        ],
        "output": "16"
      },
      {
        "input": [
          "-3"
        ],
        "output": "9"
      },
      {
        "input": [
          "0"
        ],
        "output": "0"
      }
    ],
    "requirements": [
      {
        "feature": "FunctionDef",
        "label": "Zdefiniuj funkcję."
      },
      {
        "feature": "Return",
        "label": "Zwróć jej wynik przez return."
      },
      {
        "feature": "call:kwadrat",
        "label": "Wywołaj funkcję kwadrat()."
      }
    ],
    "hints": [
      "Zastąp pass instrukcją return.",
      "Użyj parametru liczba po obu stronach mnożenia."
    ],
    "experiment": "Wywołaj funkcję dwa razy dla różnych liczb."
  },
  {
    "id": "minimum",
    "group": "04 · Algorytmy i własne projekty",
    "title": "Znajdź najmniejszą wartość",
    "intro": "Algorytm to uporządkowane kroki rozwiązania. Zapamiętaj pierwszą liczbę. Porównuj kolejne i aktualizuj najmniejszą znalezioną wartość.",
    "example": "liczby = [8, 3, 6]\nnajmniejsza = liczby[0]\n# Porównuj po kolei",
    "task": "Odczytaj trzy liczby do listy. Znajdź najmniejszą przy pomocy for i if. Wyświetl ją. Nie potrzebujesz funkcji min().",
    "starter": "liczby = [int(input()), int(input()), int(input())]\nnajmniejsza = liczby[0]\n",
    "solution": "liczby = [int(input()), int(input()), int(input())]\nnajmniejsza = liczby[0]\nfor liczba in liczby:\n    if liczba < najmniejsza:\n        najmniejsza = liczba\nprint(najmniejsza)",
    "tests": [
      {
        "input": [
          "8",
          "3",
          "6"
        ],
        "output": "3"
      },
      {
        "input": [
          "-2",
          "4",
          "-5"
        ],
        "output": "-5"
      },
      {
        "input": [
          "7",
          "7",
          "7"
        ],
        "output": "7"
      }
    ],
    "requirements": [
      {
        "feature": "For",
        "label": "Porównaj elementy w pętli."
      },
      {
        "feature": "If",
        "label": "Aktualizuj wynik warunkowo."
      }
    ],
    "hints": [
      "Pierwsza liczba jest początkowym kandydatem.",
      "Gdy liczba jest mniejsza od najmniejsza, zapamiętaj liczbę."
    ],
    "experiment": "Sprawdź trzy liczby ujemne. Dlaczego start od zera byłby ryzykowny?"
  },
  {
    "id": "wyszukiwanie",
    "group": "04 · Algorytmy i własne projekty",
    "title": "Szukamy w plecaku",
    "intro": "Wyszukiwanie liniowe sprawdza elementy po kolei. Zmienna logiczna przechowuje True albo False: prawdę albo fałsz.",
    "example": "znaleziono = False\nfor element in [\"mapa\", \"woda\"]:\n    if element == \"mapa\":\n        znaleziono = True",
    "task": "Odczytaj nazwę przedmiotu. Przeszukaj listę mapa, woda, latarka pętlą. Wypisz Jest albo Brak.",
    "starter": "plecak = [\"mapa\", \"woda\", \"latarka\"]\nszukany = input(\"Czego szukasz? \")\n",
    "solution": "plecak = [\"mapa\", \"woda\", \"latarka\"]\nszukany = input(\"Czego szukasz? \")\nznaleziono = False\nfor przedmiot in plecak:\n    if przedmiot == szukany:\n        znaleziono = True\nif znaleziono:\n    print(\"Jest\")\nelse:\n    print(\"Brak\")",
    "tests": [
      {
        "input": [
          "woda"
        ],
        "output": "Jest"
      },
      {
        "input": [
          "latarka"
        ],
        "output": "Jest"
      },
      {
        "input": [
          "kompas"
        ],
        "output": "Brak"
      }
    ],
    "requirements": [
      {
        "feature": "For",
        "label": "Sprawdź kolejne elementy w pętli."
      },
      {
        "feature": "If",
        "label": "Porównaj element z szukaną nazwą."
      }
    ],
    "hints": [
      "Najpierw ustaw znaleziono na False.",
      "Komunikat wypisz po zakończeniu szukania."
    ],
    "experiment": "Sprawdź Woda oraz woda. Python rozróżnia wielkość liter."
  },
  {
    "id": "sortowanie",
    "group": "04 · Algorytmy i własne projekty",
    "title": "Ustawiamy liczby w kolejności",
    "intro": "Sortowanie porządkuje dane. Metoda lista.sort() zmienia kolejność elementów listy na rosnącą. To gotowe narzędzie Pythona.",
    "example": "wyniki = [8, 2, 5]\nwyniki.sort()\nprint(wyniki)",
    "task": "Odczytaj trzy liczby do listy. Posortuj je rosnąco i wypisz listę, np. [1, 3, 7].",
    "starter": "liczby = [int(input()), int(input()), int(input())]\n",
    "solution": "liczby = [int(input()), int(input()), int(input())]\nliczby.sort()\nprint(liczby)",
    "tests": [
      {
        "input": [
          "7",
          "1",
          "3"
        ],
        "output": "[1, 3, 7]"
      },
      {
        "input": [
          "-2",
          "4",
          "0"
        ],
        "output": "[-2, 0, 4]"
      },
      {
        "input": [
          "2",
          "2",
          "1"
        ],
        "output": "[1, 2, 2]"
      }
    ],
    "requirements": [
      {
        "feature": "List",
        "label": "Przechowaj liczby w liście."
      }
    ],
    "hints": [
      "Wywołaj liczby.sort() przed print().",
      "Nie przypisuj wyniku sort() do listy — metoda zmienia ją na miejscu."
    ],
    "experiment": "Sprawdź liczby.sort(reverse=True). Jaka jest teraz kolejność?"
  },
  {
    "id": "projekt-budzet",
    "group": "04 · Algorytmy i własne projekty",
    "title": "Projekt: mój budżet",
    "intro": "Połącz odczyt danych, obliczenia i decyzję. Najpierw ustal wejście, potem obliczenie, na końcu wynik.",
    "example": "przychod → odejmij wydatki → sprawdź bilans",
    "task": "Odczytaj dwie liczby całkowite: kieszonkowe i wydatki. Wypisz Bilans: X zł. W drugim wierszu: Oszczędzasz, jeśli bilans jest co najmniej 0; inaczej: Za duże wydatki.",
    "starter": "# 1. Odczytaj dane\n# 2. Oblicz bilans\n# 3. Pokaż wynik i komunikat\n",
    "solution": "kieszonkowe = int(input(\"Kieszonkowe: \"))\nwydatki = int(input(\"Wydatki: \"))\nbilans = kieszonkowe - wydatki\nprint(f\"Bilans: {bilans} zł\")\nif bilans >= 0:\n    print(\"Oszczędzasz\")\nelse:\n    print(\"Za duże wydatki\")",
    "tests": [
      {
        "input": [
          "100",
          "60"
        ],
        "output": "Bilans: 40 zł\nOszczędzasz"
      },
      {
        "input": [
          "50",
          "70"
        ],
        "output": "Bilans: -20 zł\nZa duże wydatki"
      },
      {
        "input": [
          "30",
          "30"
        ],
        "output": "Bilans: 0 zł\nOszczędzasz"
      }
    ],
    "requirements": [
      {
        "feature": "call:input",
        "label": "Odczytaj dane użytkownika."
      },
      {
        "feature": "If",
        "label": "Dobierz komunikat do bilansu."
      },
      {
        "feature": "Sub",
        "label": "Oblicz różnicę kwot."
      }
    ],
    "hints": [
      "Bilans to kieszonkowe minus wydatki.",
      "Sprawdź także przypadek, gdy bilans wynosi zero."
    ],
    "experiment": "Rozbuduj program o trzecią kwotę: cel oszczędzania."
  },
  {
    "id": "projekt-quiz",
    "group": "04 · Algorytmy i własne projekty",
    "title": "Projekt: quiz z punktami",
    "intro": "Twój quiz może sam liczyć punkty. Porównuj odpowiedzi z listą poprawnych odpowiedzi. Dodaj punkt tylko za trafienie.",
    "example": "odpowiedź → porównanie → punkt lub brak punktu",
    "task": "Zadaj trzy pytania: 2+2, 3*3, 10-5. Odczytaj trzy odpowiedzi jako tekst. Użyj pętli. Na końcu wypisz Wynik: X/3, gdzie X oznacza liczbę poprawnych odpowiedzi.",
    "starter": "# Poprawne odpowiedzi: \"4\", \"9\", \"5\"\n",
    "solution": "pytania = [\"2+2 = \", \"3*3 = \", \"10-5 = \"]\npoprawne = [\"4\", \"9\", \"5\"]\npunkty = 0\nfor numer in range(3):\n    wpis = input(pytania[numer])\n    if wpis == poprawne[numer]:\n        punkty = punkty + 1\nprint(f\"Wynik: {punkty}/3\")",
    "tests": [
      {
        "input": [
          "4",
          "9",
          "5"
        ],
        "output": "Wynik: 3/3"
      },
      {
        "input": [
          "4",
          "0",
          "5"
        ],
        "output": "Wynik: 2/3"
      },
      {
        "input": [
          "0",
          "0",
          "0"
        ],
        "output": "Wynik: 0/3"
      }
    ],
    "requirements": [
      {
        "feature": "For",
        "label": "Przeprowadź quiz w pętli."
      },
      {
        "feature": "If",
        "label": "Przyznawaj punkty za poprawną odpowiedź."
      }
    ],
    "hints": [
      "Zacznij z wynikiem 0.",
      "Porównuj tekst z tekstem, np. \"4\"."
    ],
    "experiment": "Dodaj pytania do osobnej listy i wyświetlaj je podczas quizu."
  },
  {
    "id": "projekt-przygoda",
    "group": "04 · Algorytmy i własne projekty",
    "title": "Projekt: wyprawa po skarb",
    "intro": "Gra tekstowa reaguje na decyzje gracza. Najpierw zaplanuj warunki. Sprawdź wszystkie zakończenia, także nietypową odpowiedź.",
    "example": "droga → czy masz klucz? → zakończenie",
    "task": "Odczytaj drogę (las albo jaskinia) i liczbę kluczy. Dla las wypisz Docierasz do obozu. Dla jaskinia z co najmniej 1 kluczem: Znajdujesz skarb! Dla jaskinia bez klucza: Drzwi są zamknięte. Dla innej drogi: Nieznana droga.",
    "starter": "# Wybierz drogę i podaj liczbę kluczy.\n",
    "solution": "droga = input(\"Las czy jaskinia? \")\nklucze = int(input(\"Ile kluczy? \"))\nif droga == \"las\":\n    print(\"Docierasz do obozu.\")\nelif droga == \"jaskinia\":\n    if klucze >= 1:\n        print(\"Znajdujesz skarb!\")\n    else:\n        print(\"Drzwi są zamknięte.\")\nelse:\n    print(\"Nieznana droga.\")",
    "tests": [
      {
        "input": [
          "jaskinia",
          "1"
        ],
        "output": "Znajdujesz skarb!"
      },
      {
        "input": [
          "las",
          "0"
        ],
        "output": "Docierasz do obozu."
      },
      {
        "input": [
          "jaskinia",
          "0"
        ],
        "output": "Drzwi są zamknięte."
      },
      {
        "input": [
          "rzeka",
          "2"
        ],
        "output": "Nieznana droga."
      }
    ],
    "requirements": [
      {
        "feature": "If",
        "label": "Zaplanuj różne zakończenia przez warunki."
      },
      {
        "feature": "call:input",
        "label": "Odczytaj decyzje gracza."
      }
    ],
    "hints": [
      "Najpierw sprawdź wybraną drogę.",
      "Liczbę kluczy sprawdzaj wewnątrz drogi jaskinia."
    ],
    "experiment": "Przenieś grę do swobodnej pracowni. Dodaj własną drogę i zakończenie."
  }
];
