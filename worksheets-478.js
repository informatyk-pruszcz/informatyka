import {vatCard, renderVat, bindVat} from './vat-worksheet.js';
// Interaktywne karty pracy dla klas 4, 7 i 8.
// Treść wszystkich zadań, kroków, tabel, wskazówek, kryteriów oceniania i notatki dla nauczyciela zachowana wiernie 1:1 z oryginałów.
import { downloadPrawoJazdyXlsx, PRAWO_JAZDY_STATS } from './prawo-jazdy-xlsx-data.js';

export const extraWorksheets = [vatCard,
  {
    id: 'karta-4-1-urzadzenia-pliki',
    type: 'task',
    grades: [4],
    title: 'KARTA PRACY: W świecie urządzeń cyfrowych • Programy, pliki i foldery',
    section: '1. Komputer i Ty',
    tags: ['Komputer', 'Urządzenia', 'Pliki', 'Foldery', 'KartaPracy'],
    summary: 'Rozdział 1: W świecie urządzeń cyfrowych oraz Rozdział 2 & 3: Programy, pliki i foldery • 9 interaktywnych zadań z automatycznym liczeniem punktów (25 pkt).',
    body: `<h2>KARTA PRACY: INFORMATYKA — Rozdział 1: W świecie urządzeń cyfrowych • Klasa 4</h2>
<p>Część 1: Urządzenia cyfrowe (Zadania 1–4) oraz Część 2: Programy, pliki i foldery (Zadania 5–9). Łącznie 25 punktów.</p>`,
    source: 'Karta pracy dla klasy 4 • Część 1: Urządzenia cyfrowe • Część 2: Programy, pliki i foldery • Strona 1–2 z 2'
  },
  {
    id: 'karta-7-2-1-pierwsza-strona',
    type: 'task',
    grades: [7],
    title: 'KARTA PRACY: MOJA PIERWSZA STRONA WWW — Zostań twórcą internetu!',
    section: '2. Strony WWW',
    tags: ['HTML', 'VS Code', 'Strony WWW', 'Lekcja 2.1', 'KartaPracy'],
    summary: 'Zostań twórcą internetu! • Karta pracy • 20 minut • Pierwszy kontakt z HTML w VS Code, analiza znaczników, eksperymenty na żywo oraz Notatka dla nauczyciela.',
    body: `<h2>MOJA PIERWSZA STRONA WWW — Zostań twórcą internetu! • Karta pracy • 20 minut</h2>
<p>Zbuduj stronę o swoim hobby: grach, sporcie, muzyce lub zwierzętach w Visual Studio Code (VS Code) i otwórz ją w przeglądarce.</p>`,
    source: 'HTML / KLASA VII • Moja pierwsza strona WWW • Pierwszy kontakt z HTML (Strony 1–3)'
  },
  {
    id: 'karta-8-1-kosztorys-balu',
    type: 'task',
    grades: [8],
    title: 'KARTA PRACY: MS EXCEL — Kosztorys Balu Ósmoklasisty',
    section: '1. Arkusz kalkulacyjny',
    tags: ['ArkuszKalkulacyjny', 'Excel', 'JEŻELI', 'SUMA', 'KartaPracy'],
    summary: 'Temat: Kosztorys Balu Ósmoklasisty – obliczenia i analiza danych • Formuły mnożenia, SUMA, funkcja logiczna JEŻELI, formatowanie warunkowe oraz ŚREDNIA i MAX.',
    body: `<h2>KARTA PRACY: MS EXCEL — Temat: Kosztorys Balu Ósmoklasisty – obliczenia i analiza danych</h2>
<p>Kontekst: Komitet organizacyjny Balu Ósmoklasisty planuje budżet na dekoracje, poczęstunek oraz sprzęt. Twoim zadaniem jest przygotowanie arkusza kalkulacyjnego, który zsumuje wydatki i wyłoni pozycje o wysokim koszcie.</p>`,
    source: 'Informatyka – Klasa VIII | Arkusz kalkulacyjny MS Excel • Strona 1 z 1'
  },
  {
    id: 'karta-8-1-rentownosc-excel',
    type: 'task',
    grades: [8],
    title: 'KARTA PRACY: RENTOWNOŚĆ W MS EXCEL — Warsztat „Auto-Centrum”',
    section: '1. Arkusz kalkulacyjny',
    tags: ['ArkuszKalkulacyjny', 'Excel', 'Adresowanie', 'LICZ.JEŻELI', 'SUMA.JEŻELI', 'KartaPracy'],
    summary: 'Klasa VIII • Warsztat Samochodowy „Auto-Centrum” • Analiza finansowa i formuły: adresowanie względne i bezwzględne ($), JEŻELI, ŚREDNIA, LICZ.JEŻELI oraz SUMA.JEŻELI.',
    body: `<h2>KARTA PRACY: RENTOWNOŚĆ W MS EXCEL</h2>
<p>Klasa VIII • Warsztat Samochodowy „Auto-Centrum” • Analiza finansowa i formuły. Scenariusz biznesowy (25 minut): Kierujesz serwisem pojazdów w Pruszczu Gdańskim.</p>`,
    source: 'MS Excel • Analiza rentowności warsztatu mechanicznego • Klasa VIII • Strona 1–2 z 2'
  },
  {
    id: 'karta-8-1-tabele-przestawne',
    type: 'task',
    grades: [8],
    title: 'KARTA PRACY: 3 Misje Detektywistyczne – Tabele Przestawne w Excelu 2016',
    section: '1. Arkusz kalkulacyjny',
    tags: ['ArkuszKalkulacyjny', 'Excel2016', 'TabelePrzestawne', 'AnalizaDanych', 'KartaPracy'],
    summary: 'Plik: prawo-jazdy.xlsx • 3 Misje Detektywistyczne w tabelach przestawnych (sumowanie, zliczanie wpisów Liczba z Miasto, filtrowanie województw) + interaktywna Karta odpowiedzi.',
    body: `<h2>3 Misje Detektywistyczne – Tabele Przestawne w Excelu 2016</h2>
<p>KARTA PRACY UCZNIA – ZADANIE PRAKTYCZNE • INFORMATYKA – KLASA 8 • Plik: prawo-jazdy.xlsx.</p>`,
    source: 'Zadanie Praktyczne: Tabele Przestawne w Excelu 2016 (prawo-jazdy.xlsx) • Strona 1–2 z 2'
  }
];

const EXTRA_IDS = new Set(extraWorksheets.map(w => w.id));
export function isExtraWorksheet(id) {
  return EXTRA_IDS.has(id);
}

const STARTER_HTML_CODE = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Moje hobby</title>
</head>
<body>
  <h1>Świat gier</h1>
  <p>Lubię gry przygodowe.</p>
</body>
</html>`;

const BAL_TSV = `Pozycja\tCena jedn. (zł)\tIlość\tRazem (zł)\tStatus
Balony z helem (paczka)\t35,00\t4\t\t
Fotobudka (godz.)\t250,00\t3\t\t
Napoje i soki (zgrzewka)\t28,00\t6\t\t
Przekąski słone (kg)\t22,50\t8\t\t
Wynajem nagłośnienia (zestaw)\t450,00\t1\t\t
SUMA:\t\t\t\t`;

const RENTOWNOSC_MAIN_TSV = `ID\tDział\tNazwa usługi\tWykonano\tCena netto\tWartość netto
1\tMechanika\tWymiana klocków hamulcowych\t6\t120,00\t
2\tEksploatacja\tSerwis olejowo-filtrowy\t8\t150,00\t
3\tMechanika\tWymiana rozrządu\t2\t650,00\t
4\tDiagnostyka\tDiagnostyka komputerowa OBD\t5\t100,00\t
5\tMechanika\tWymiana pompy paliwa\t3\t250,00\t
6\tZawieszenie\tGeometria zawieszenia 3D\t4\t180,00\t
\t\tSUMA DZIENNA:\t\t\t`;

const RENTOWNOSC_PARAMS_TSV = `PAR\tWskaźnik finansowy\tWartość w arkuszu\tWyjaśnienie / Formuła
VAT\tStawka podatku VAT\t23%\tFormat Procentowy (0,23)
KOSZT\tDzienny koszt stały warsztatu\t5500\tCzynsz, prąd, pensje mechaników
BRUTTO\tŁączny przychód warsztatu brutto\t\tPrzychód netto F8 × (1 + VAT)
WYNIK\tWynik finansowy netto/dzień\t\tPrzychód brutto (C13) − Koszt (C12)
STATUS\tOcena rentowności (czy wynik >= 0)\t\tWyświetla "RENTOWNY" lub "STRATA"`;

function renderToolbar(activeId, gradeGroup) {
  const groupTabs = gradeGroup === 8
    ? [
        { id: 'karta-8-1-kosztorys-balu', icon: '🎈', label: 'Kosztorys Balu', sub: 'SUMA, JEŻELI, Formatowanie' },
        { id: 'karta-8-1-rentownosc-excel', icon: '🚗', label: 'Rentowność Warsztatu', sub: 'Adresowanie $, LICZ/SUMA.JEŻELI' },
        { id: vatCard.id, icon: '🛒', label: 'Misja VAT', sub: 'Zakupy nastolatków' },
        { id: 'karta-8-1-tabele-przestawne', icon: '🔎', label: '3 Misje Detektywistyczne', sub: 'Tabele Przestawne (prawo-jazdy.xlsx)' }
      ]
    : gradeGroup === 7
    ? [
        { id: 'karta-7-2-1-pierwsza-strona', icon: '🌐', label: 'Moja pierwsza strona WWW', sub: 'Karta pracy + Notatka nauczyciela' }
      ]
    : [
        { id: 'karta-4-1-urzadzenia-pliki', icon: '🖥️', label: 'Urządzenia, programy, pliki i foldery', sub: 'Karta pracy (Zadania 1–9 · 25 pkt)' }
      ];

  return `
  <div class="ws-toolbar" role="region" aria-label="Narzędzia karty pracy">
    <div class="ws-switcher" role="navigation" aria-label="Karty pracy w tym dziale">
      ${groupTabs.map(t => `
        <a href="#item/${t.id}" class="ws-switch-btn ${t.id === activeId ? 'active' : ''}" ${t.id === activeId ? 'aria-current="page"' : ''}>
          <span class="ws-switch-icon" aria-hidden="true">${t.icon}</span>
          <span>
            <strong>${t.label}</strong>
            <small>${t.sub}</small>
          </span>
        </a>
      `).join('')}
    </div>
    <div class="ws-actions">
      <button type="button" class="btn ws-action-btn" id="ws-toggle-large" aria-pressed="false">🔍 Powiększ tekst</button>
      <button type="button" class="btn ws-action-btn" id="ws-print">🖨️ Drukuj kartę</button>
    </div>
  </div>
  <div class="ws-progress-bar-wrap" aria-live="polite">
    <div class="ws-progress-meta">
      <span id="ws-progress-label">Twój postęp na karcie pracy: <strong>0%</strong></span>
      <button type="button" class="ws-reset-link" id="ws-reset-progress">Wyczyść zaznaczenia i odpowiedzi</button>
    </div>
    <div class="ws-progress-track"><div class="ws-progress-fill" id="ws-progress-fill" style="width:0%"></div></div>
  </div>`;
}

// ============================================================================
// 1. KLASA 4: W świecie urządzeń cyfrowych + Programy, pliki i foldery (25 pkt)
// ============================================================================
function renderGrade4DevicesWorksheet() {
  const z2Rows = [
    ['Klawiatura (wpisywanie tekstu)', 'in'],
    ['Monitor (wyświetlanie obrazu)', 'out'],
    ['Mikrofon (nagrywanie głosu)', 'in'],
    ['Drukarka (drukowanie na papierze)', 'out'],
    ['Ekran dotykowy w tablecie/smartfonie', 'both'],
    ['Słuchawki (odtwarzanie muzyki)', 'out']
  ];
  const z4Rows = [
    ['1. Monitor powinien znajdować się na wysokości oczu w odległości wyciągniętej ręki.', 'P'],
    ['2. Podczas pracy przy komputerze można stawiać otwarty kubek z herbatą na klawiaturze.', 'F'],
    ['3. Zużyte baterie i stary sprzęt komputerowy (elektrośmieci) wyrzucamy do zwykłego kosza.', 'F'],
    ['4. Odchodząc od komputera na dłużej, warto wyłączyć monitor, aby oszczędzać prąd.', 'P'],
    ['5. Co 45 minut pracy przy ekranie należy zrobić krótką przerwę na gimnastykę i odpoczynek wzroku.', 'P']
  ];

  return `
  ${renderToolbar('karta-4-1-urzadzenia-pliki', 4)}
  <div class="ws-sheet ws-theme-blue" id="ws-sheet">
    <header class="ws-header">
      <div>
        <h1>KARTA PRACY: INFORMATYKA</h1>
        <p class="ws-subtitle">Rozdział 1: W świecie urządzeń cyfrowych • Klasa 4</p>
      </div>
      <div class="ws-badges">
        <span class="ws-badge" id="g4-total-badge">Wynik: <strong id="g4-total-score">___</strong> / 25 pkt</span>
        <button type="button" class="btn primary" id="g4-check-all">✓ Sprawdź pracę i policz punkty</button>
      </div>
    </header>

    <div class="ws-student-bar">
      <label class="ws-student-field">
        <span>Imię i nazwisko:</span>
        <input type="text" id="ws-student-name" placeholder=".................................................." autocomplete="off">
      </label>
      <label class="ws-student-field ws-student-short">
        <span>Klasa:</span>
        <input type="text" id="ws-student-class" value="4" autocomplete="off">
      </label>
      <label class="ws-student-field ws-student-short">
        <span>Data:</span>
        <input type="text" id="ws-student-date" placeholder="dd.mm.rrrr" autocomplete="off">
      </label>
    </div>

    <!-- Zadanie 1 -->
    <section class="ws-card ws-step" data-step="1">
      <div class="ws-card-head">
        <h2>Zadanie 1. Co potrafi komputer?</h2>
        <span class="ws-badge" id="g4-score-1">___ / 3 pkt</span>
      </div>
      <p>Uzupełnij luki w zdaniach wyrazami z poniższego banku słów:</p>
      <div class="ws-word-bank">
        <strong>Bank słów:</strong>
        <button type="button" class="ws-chip" data-bank-word="informacje">informacje</button> •
        <button type="button" class="ws-chip" data-bank-word="jednostka centralna">jednostka centralna</button> •
        <button type="button" class="ws-chip" data-bank-word="elektronicznym">elektronicznym</button>
      </div>
      <p class="ws-gap-paragraph">
        Komputer jest urządzeniem
        <select class="ws-inline-select" data-g4-z1="elektronicznym" aria-label="Luka 1">
          <option value="">..................................................</option>
          <option value="informacje">informacje</option>
          <option value="jednostka centralna">jednostka centralna</option>
          <option value="elektronicznym">elektronicznym</option>
        </select>,
        które bardzo szybko przetwarza różne
        <select class="ws-inline-select" data-g4-z1="informacje" aria-label="Luka 2">
          <option value="">..................................................</option>
          <option value="informacje">informacje</option>
          <option value="jednostka centralna">jednostka centralna</option>
          <option value="elektronicznym">elektronicznym</option>
        </select>
        (takie jak tekst, dźwięk, obraz czy liczby). Najważniejszą częścią zestawu stacjonarnego, która zarządza pracą komputera, jest
        <select class="ws-inline-select" data-g4-z1="jednostka centralna" aria-label="Luka 3">
          <option value="">..................................................</option>
          <option value="informacje">informacje</option>
          <option value="jednostka centralna">jednostka centralna</option>
          <option value="elektronicznym">elektronicznym</option>
        </select>.
      </p>
    </section>

    <!-- Zadanie 2 -->
    <section class="ws-card ws-step" data-step="2">
      <div class="ws-card-head">
        <h2>Zadanie 2. Wejście, wyjście czy jedno i drugie?</h2>
        <span class="ws-badge" id="g4-score-2">___ / 6 pkt</span>
      </div>
      <p>Zaznacz znakiem <strong>X</strong> w tabeli, jakim urządzeniem jest każdy z wymienionych sprzętów <small class="muted">(kliknij odpowiednią kratkę w wierszu)</small>:</p>
      <div class="ws-table-wrap">
        <table class="ws-pattern-table ws-x-table">
          <thead>
            <tr>
              <th>Nazwa urządzenia</th>
              <th>Urządzenie wejścia<br><small>(wprowadza dane)</small></th>
              <th>Urządzenie wyjścia<br><small>(wyprowadza dane)</small></th>
              <th>Wejścia i wyjścia<br><small>(w obie strony)</small></th>
            </tr>
          </thead>
          <tbody>
            ${z2Rows.map(([label, correct], idx) => `
              <tr data-g4-z2-row="${idx}" data-correct="${correct}">
                <td><strong>${label.split(' (')[0]}</strong> (${label.split(' (')[1]}</td>
                <td class="ws-x-cell" data-col="in" role="button" tabindex="0" aria-label="${label} — Urządzenie wejścia"></td>
                <td class="ws-x-cell" data-col="out" role="button" tabindex="0" aria-label="${label} — Urządzenie wyjścia"></td>
                <td class="ws-x-cell" data-col="both" role="button" tabindex="0" aria-label="${label} — Wejścia i wyjścia"></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Zadanie 3 -->
    <section class="ws-card ws-step" data-step="3">
      <div class="ws-card-head">
        <h2>Zadanie 3. Zestaw komputerowy i urządzenia dodatkowe</h2>
        <span class="ws-badge" id="g4-score-3">___ / 3 pkt</span>
      </div>
      <p>Połącz linią nazwę urządzenia z rolą, jaką pełni w zestawie:</p>
      <div class="ws-match-grid">
        <div class="ws-match-row">
          <div class="ws-match-left"><span class="ws-dot-blue">●</span> <strong>1. Mysz komputerowa</strong></div>
          <select class="ws-inline-select" data-g4-z3="B" aria-label="Dopasuj dla: 1. Mysz komputerowa">
            <option value="">— wybierz literę (A, B lub C) —</option>
            <option value="A">A. Pamięć przenośna do bezpiecznego przenoszenia prac</option>
            <option value="B">B. Sterowanie kursorem i klikanie obiektów na ekranie</option>
            <option value="C">C. Rejestrowanie obrazu podczas lekcji online lub rozmów</option>
          </select>
        </div>
        <div class="ws-match-row">
          <div class="ws-match-left"><span class="ws-dot-blue">●</span> <strong>2. Kamera internetowa</strong></div>
          <select class="ws-inline-select" data-g4-z3="C" aria-label="Dopasuj dla: 2. Kamera internetowa">
            <option value="">— wybierz literę (A, B lub C) —</option>
            <option value="A">A. Pamięć przenośna do bezpiecznego przenoszenia prac</option>
            <option value="B">B. Sterowanie kursorem i klikanie obiektów na ekranie</option>
            <option value="C">C. Rejestrowanie obrazu podczas lekcji online lub rozmów</option>
          </select>
        </div>
        <div class="ws-match-row">
          <div class="ws-match-left"><span class="ws-dot-blue">●</span> <strong>3. Pendrive (pamięć USB)</strong></div>
          <select class="ws-inline-select" data-g4-z3="A" aria-label="Dopasuj dla: 3. Pendrive (pamięć USB)">
            <option value="">— wybierz literę (A, B lub C) —</option>
            <option value="A">A. Pamięć przenośna do bezpiecznego przenoszenia prac</option>
            <option value="B">B. Sterowanie kursorem i klikanie obiektów na ekranie</option>
            <option value="C">C. Rejestrowanie obrazu podczas lekcji online lub rozmów</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Zadanie 4 -->
    <section class="ws-card ws-step" data-step="4">
      <div class="ws-card-head">
        <h2>Zadanie 4. Bezpieczna i ekologiczna praca z komputerem</h2>
        <span class="ws-badge" id="g4-score-4">___ / 5 pkt</span>
      </div>
      <p>Oceń poniższe zdania. Wpisz znak <strong>X</strong> w polu <strong>P</strong> (Prawda) lub <strong>F</strong> (Fałsz):</p>
      <div class="ws-pf-list">
        ${z4Rows.map(([statement, correct], idx) => `
          <div class="ws-pf-row" data-g4-z4="${idx}" data-correct="${correct}">
            <span>${statement}</span>
            <div class="ws-pf-btns">
              <button type="button" class="ws-pf-btn" data-val="P">[ P ]</button>
              <button type="button" class="ws-pf-btn" data-val="F">[ F ]</button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <div class="ws-footer" style="margin-bottom:24px">
      <span>Karta pracy dla klasy 4 • Część 1: Urządzenia cyfrowe</span>
      <span>Strona 1 z 2</span>
    </div>

    <!-- STRONA 2 -->
    <div class="ws-section-banner">ROZDZIAŁ 2 &amp; 3: PROGRAMY, PLIKI I FOLDERY</div>

    <!-- Zadanie 5 -->
    <section class="ws-card ws-step" data-step="5">
      <div class="ws-card-head">
        <h2>Zadanie 5. System operacyjny – dyrygent komputera</h2>
        <span class="ws-badge" id="g4-score-5">___ / 2 pkt</span>
      </div>
      <p><strong>A) Zaznacz prawidłową odpowiedź:</strong> Czym jest system operacyjny?</p>
      <ul class="ws-checklist">
        <li><label><input type="radio" name="g4-z5a" value="wrong1"> <span>To gra komputerowa do nauki szybkiego pisania.</span></label></li>
        <li><label><input type="radio" name="g4-z5a" value="correct"> <span>To najważniejszy program, który zarządza pracą całego sprzętu i umożliwia uruchamianie innych programów.</span></label></li>
        <li><label><input type="radio" name="g4-z5a" value="wrong2"> <span>To specjalny kabel łączący monitor z gniazdkiem elektrycznym.</span></label></li>
      </ul>
      <p style="margin-top:12px"><strong>B) Wymień jeden znany Ci system operacyjny</strong> (np. na komputerze lub w smartfonie):</p>
      <label class="ws-student-field">
        <span>Odpowiedź:</span>
        <input type="text" id="g4-z5b" placeholder="np. Windows, Android, Linux, macOS, iOS..." autocomplete="off">
      </label>
    </section>

    <!-- Zadanie 6 -->
    <section class="ws-card ws-step" data-step="6">
      <div class="ws-card-head">
        <h2>Zadanie 6. Plik czy folder? Nie pomyl ich!</h2>
        <span class="ws-badge" id="g4-score-6">___ / 2 pkt</span>
      </div>
      <p>Wpisz słowo <strong>PLIK</strong> lub <strong>FOLDER</strong> przy odpowiednim opisie:</p>
      <div class="ws-pf-list">
        <div class="ws-pf-row">
          <span>1. Jest jak teczka w szafie. Służy do porządkowania i przechowywania innych elementów:</span>
          <select class="ws-inline-select" data-g4-z6="FOLDER" aria-label="Opis 1: Plik czy folder">
            <option value="">........................................</option>
            <option value="PLIK">PLIK</option>
            <option value="FOLDER">FOLDER</option>
          </select>
        </div>
        <div class="ws-pf-row">
          <span>2. To konkretna praca zapisana w pamięci (np. rysunek, wypracowanie, nagranie):</span>
          <select class="ws-inline-select" data-g4-z6="PLIK" aria-label="Opis 2: Plik czy folder">
            <option value="">........................................</option>
            <option value="PLIK">PLIK</option>
            <option value="FOLDER">FOLDER</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Zadanie 7 -->
    <section class="ws-card ws-step" data-step="7">
      <div class="ws-card-head">
        <h2>Zadanie 7. Detektyw rozszerzeń – co kryje nazwa pliku?</h2>
        <span class="ws-badge" id="g4-score-7">___ / 4 pkt</span>
      </div>
      <p>Pełna nazwa pliku składa się z <strong>nazwy właściwej</strong> oraz <strong>rozszerzenia</strong> po kropce (np. <em>piesek.jpg</em>). Połącz plik z jego zawartością:</p>
      <div class="ws-match-grid">
        ${[
          ['laurka_dla_mamy.png', 'C'],
          ['opowiadanie.docx', 'A'],
          ['piosenka_klasowa.mp3', 'B'],
          ['film_z_wycieczki.mp4', 'D']
        ].map(([file, correct]) => `
          <div class="ws-match-row">
            <div class="ws-match-left"><span class="ws-dot-blue">●</span> <code>${file}</code></div>
            <select class="ws-inline-select" data-g4-z7="${correct}" aria-label="Dopasuj zawartość dla ${file}">
              <option value="">— wybierz zawartość (A, B, C lub D) —</option>
              <option value="A">A. Dokument tekstowy (np. opowiadanie)</option>
              <option value="B">B. Plik dźwiękowy (np. piosenka)</option>
              <option value="C">C. Plik graficzny (obrazek, rysunek)</option>
              <option value="D">D. Film wideo</option>
            </select>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Zadanie 8 -->
    <section class="ws-card ws-step" data-step="8">
      <div class="ws-card-head">
        <h2>Zadanie 8. Kopiowanie czy przenoszenie?</h2>
        <span class="ws-badge" id="g4-score-8">___ / 2 pkt</span>
      </div>
      <p>Uzupełnij zdania słowami: <strong>SKOPIOWANO</strong> lub <strong>PRZENIESIONO</strong>:</p>
      <div class="ws-pf-list">
        <div class="ws-pf-row">
          <span>a) Ania skrótem klawiszowym przeniosła plik do nowego folderu, a ze starego folderu plik zniknął. Plik</span>
          <select class="ws-inline-select" data-g4-z8="PRZENIESIONO" aria-label="Zdanie a">
            <option value="">...................................................</option>
            <option value="SKOPIOWANO">SKOPIOWANO</option>
            <option value="PRZENIESIONO">PRZENIESIONO</option>
          </select>
        </div>
        <div class="ws-pf-row">
          <span>b) Bartek nagrał plik z komputera na pendrive. Plik znajduje się teraz i na komputerze, i na pendrivie. Plik</span>
          <select class="ws-inline-select" data-g4-z8="SKOPIOWANO" aria-label="Zdanie b">
            <option value="">...................................................</option>
            <option value="SKOPIOWANO">SKOPIOWANO</option>
            <option value="PRZENIESIONO">PRZENIESIONO</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Zadanie 9 -->
    <section class="ws-card ws-step" data-step="9">
      <div class="ws-card-head">
        <h2>Zadanie 9. Bezpieczeństwo i licencje programów</h2>
        <span class="ws-badge" id="g4-score-9">___ / 1 pkt</span>
      </div>
      <p>Zaznacz prawidłowe dokończenie zdania:<br><strong>Licencja programu komputerowego to:</strong></p>
      <ul class="ws-checklist">
        <li><label><input type="radio" name="g4-z9" value="correct"> <span>Umowa określająca zasady, na jakich możemy legalnie korzystać z programu (płatnie lub bezpłatnie).</span></label></li>
        <li><label><input type="radio" name="g4-z9" value="wrong"> <span>Pozwolenie na ściąganie dowolnych płatnych gier z internetu bez płacenia autorom.</span></label></li>
      </ul>
    </section>

    <!-- Podsumowanie -->
    <section class="ws-card ws-card-check">
      <div class="ws-card-head">
        <h2>Podsumowanie mistrza informatyki – oceń swoją pracę:</h2>
        <span class="muted" style="font-size:12px">Podpis nauczyciela: .......................................</span>
      </div>
      <div class="ws-self-eval">
        <label><input type="radio" name="g4-self" value="1" data-step-check="g4-eval"> <span>Poszło mi świetnie! (Wszystko rozumiem)</span></label>
        <label><input type="radio" name="g4-self" value="2" data-step-check="g4-eval2"> <span>Dobrze, ale muszę jeszcze poćwiczyć</span></label>
        <label><input type="radio" name="g4-self" value="3" data-step-check="g4-eval3"> <span>Potrzebuję pomocy z trudniejszymi pojęciami</span></label>
      </div>
      <div id="g4-feedback-box" role="status" aria-live="polite" style="margin-top:12px"></div>
    </section>

    <footer class="ws-footer">
      <span>Karta pracy dla klasy 4 • Część 2: Programy, pliki i foldery</span>
      <span>Strona 2 z 2</span>
    </footer>
  </div>`;
}

// ============================================================================
// 2. KLASA 7: MOJA PIERWSZA STRONA WWW (Strony 1-2 + Notatka dla nauczyciela)
// ============================================================================
function renderGrade7FirstPageWorksheet() {
  return `
  ${renderToolbar('karta-7-2-1-pierwsza-strona', 7)}
  <div class="ws-sheet ws-theme-green" id="ws-sheet">
    <header class="ws-header">
      <div>
        <h1>MOJA PIERWSZA STRONA WWW</h1>
        <p class="ws-subtitle">Zostań twórcą internetu! • Karta pracy • 20 minut • HTML / KLASA VII</p>
      </div>
      <div class="ws-badges">
        <span class="ws-badge">HTML / KLASA VII</span>
        <span class="ws-badge">20 minut</span>
      </div>
    </header>

    <div class="ws-student-bar">
      <label class="ws-student-field">
        <span>Imię:</span>
        <input type="text" id="ws-student-name" placeholder=".................................................." autocomplete="off">
      </label>
      <label class="ws-student-field ws-student-short">
        <span>Klasa:</span>
        <input type="text" id="ws-student-class" value="7" autocomplete="off">
      </label>
      <label class="ws-student-field ws-student-short">
        <span>Data:</span>
        <input type="text" id="ws-student-date" placeholder="................" autocomplete="off">
      </label>
    </div>

    <!-- 1. START -->
    <section class="ws-card ws-step" data-step="1">
      <div class="ws-card-head">
        <span class="ws-num ws-num-green">1</span>
        <h2>1. START: Twoja misja! [1 min]</h2>
        <label class="ws-done-toggle"><input type="checkbox" data-step-check="g7-step-1"> <span>Gotowe</span></label>
      </div>
      <p>Zbuduj stronę o swoim hobby: grach, sporcie, muzyce lub zwierzętach. Wybierz temat, który lubisz. Dziś strona będzie działać na Twoim komputerze; zapisanie pliku nie publikuje jej w internecie.</p>
      <p><strong>Po zadaniu potrafię:</strong> zapisać i otworzyć stronę; rozpoznać nagłówek i akapit; zmienić kod i sprawdzić efekt.</p>
    </section>

    <!-- 2. POZNAJ NARZĘDZIA -->
    <section class="ws-card ws-step" data-step="2">
      <div class="ws-card-head">
        <span class="ws-num ws-num-blue">2</span>
        <h2>2. POZNAJ NARZĘDZIA [2 min]</h2>
        <label class="ws-done-toggle"><input type="checkbox" data-step-check="g7-step-2"> <span>Gotowe</span></label>
      </div>
      <p><strong>Visual Studio Code (VS Code)</strong> to edytor: tu piszesz kod, czyli zapis budowy strony. <strong>HTML</strong> to język znaczników: oznacza, co jest nagłówkiem, a co akapitem. <strong>Przeglądarka</strong> (Edge lub Chrome) odczytuje kod i pokazuje stronę.</p>
      <p>Przykład: kod <code>&lt;h1&gt;Moje hobby&lt;/h1&gt;</code> daje duży nagłówek <strong>Moje hobby</strong>. Końcówka nazwy pliku <strong>.html</strong> wskazuje dokument HTML.</p>
    </section>

    <!-- 3. PIERWSZY KOD -->
    <section class="ws-card ws-step" data-step="3">
      <div class="ws-card-head">
        <span class="ws-num ws-num-green">3</span>
        <h2>3. PIERWSZY KOD [7 min]</h2>
        <div class="ws-card-tools">
          <button type="button" class="btn primary ws-copy-btn" data-copy-target="g7-html-code">📋 Skopiuj kod index.html</button>
          <button type="button" class="btn ws-copy-btn" id="g7-download-html">💾 Pobierz plik index.html</button>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="g7-step-3"> <span>Gotowe</span></label>
        </div>
      </div>
      <ol class="ws-list">
        <li>Naciśnij <strong>Win+E</strong> (Eksplorator plików). Otwórz <strong>Dokumenty</strong>, kliknij prawym przyciskiem puste miejsce → <strong>Nowy → Folder</strong>. Nazwij go <strong>MojaStrona</strong>.</li>
        <li>Otwórz VS Code z menu Start. Wybierz <strong>Plik → Otwórz folder (File → Open Folder)</strong>, wskaż Dokumenty → MojaStrona i kliknij <strong>Wybierz folder</strong>. Jeśli pojawi się pytanie o zaufanie, potwierdź dla tego własnego folderu.</li>
        <li>Naciśnij <strong>Ctrl+N</strong>, potem <strong>Ctrl+S</strong>. Zapisz w folderze MojaStrona jako <strong>index.html</strong>. Wpisz poniższy kod. Edytor może dopisywać końcówki znaczników - nie wpisuj ich drugi raz.</li>
      </ol>
      <div class="ws-mission" style="margin:12px 0">
        <strong>Zanim uruchomisz:</strong> przewidź, który tekst pokaże się na karcie przeglądarki, a który na samej stronie. Powiedz swoją odpowiedź osobie obok.
      </div>
      <pre class="ws-raw-box" id="g7-code-block">&lt;!DOCTYPE html&gt;
&lt;html lang="pl"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Moje hobby&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Świat gier&lt;/h1&gt;
  &lt;p&gt;Lubię gry przygodowe.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
      <p style="margin-top:12px"><strong>4. Zapisz Ctrl+S.</strong> Wróć do folderu MojaStrona w Eksploratorze (Win+E). Kliknij prawym przyciskiem <strong>index.html → Otwórz za pomocą → Microsoft Edge lub Google Chrome</strong>. Porównaj efekt z przewidywaniem.</p>
    </section>

    <!-- 4. ODKRYJ, JAK TO DZIAŁA -->
    <section class="ws-card ws-step" data-step="4">
      <div class="ws-card-head">
        <span class="ws-num ws-num-blue">4</span>
        <h2>4. ODKRYJ, JAK TO DZIAŁA [2 min]</h2>
        <label class="ws-done-toggle"><input type="checkbox" data-step-check="g7-step-4"> <span>Gotowe</span></label>
      </div>
      <p><strong>Znacznik</strong> to oznaczenie w nawiasach <code>&lt; &gt;</code>. W <code>&lt;p&gt;Cześć!&lt;/p&gt;</code> znacznik <code>&lt;p&gt;</code> otwiera akapit, a <code>&lt;/p&gt;</code> go zamyka. Tekst wpisujesz między nimi. Ukośnik <code>/</code> oznacza zamknięcie.</p>
      <div class="ws-table-wrap">
        <table class="ws-pattern-table">
          <thead>
            <tr>
              <th>Element</th>
              <th>Do czego służy?</th>
              <th>Przykład</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;!DOCTYPE html&gt;</code></td>
              <td>Wskazuje współczesny HTML.</td>
              <td>Pierwszy wiersz kodu</td>
            </tr>
            <tr>
              <td><code>html</code></td>
              <td>Obejmuje dokument; <code>lang="pl"</code> określa język polski.</td>
              <td><code>&lt;html lang="pl"&gt;</code></td>
            </tr>
            <tr>
              <td><code>head / title</code></td>
              <td><code>head</code>: ustawienia; <code>title</code>: tytuł karty przeglądarki.</td>
              <td><code>&lt;title&gt;Hobby&lt;/title&gt;</code></td>
            </tr>
            <tr>
              <td><code>meta charset</code></td>
              <td>UTF-8 obsługuje polskie litery. Ten element nie ma <code>&lt;/meta&gt;</code>.</td>
              <td><code>&lt;meta charset="UTF-8"&gt;</code></td>
            </tr>
            <tr>
              <td><code>body</code></td>
              <td>Zawiera widoczną treść strony.</td>
              <td><code>&lt;body&gt;…&lt;/body&gt;</code></td>
            </tr>
            <tr>
              <td><code>h1 / p</code></td>
              <td>Główny nagłówek / akapit.</td>
              <td><code>&lt;h1&gt;Gry&lt;/h1&gt;</code><br><code>&lt;p&gt;Lubię gry.&lt;/p&gt;</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="ws-subnote"><strong>Znajdź w kodzie:</strong> gdzie zmienisz tekst strony, a gdzie jej tytuł na karcie?</p>
    </section>

    <div class="ws-grid-2">
      <!-- 5. ZMIENIAJ I EKSPERYMENTUJ -->
      <section class="ws-card ws-step" data-step="5">
        <div class="ws-card-head">
          <span class="ws-num ws-num-orange">5</span>
          <h2>5. ZMIENIAJ I EKSPERYMENTUJ [4 min]</h2>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="g7-step-5"> <span>Gotowe</span></label>
        </div>
        <p><strong>Po każdej zmianie:</strong> Ctrl+S w VS Code → przejdź do przeglądarki → Ctrl+R (odśwież). Sprawdź dokładnie, co się zmieniło.</p>
        <ol class="ws-list">
          <li>Zmień <strong>Świat gier</strong> między <code>&lt;h1&gt;</code> i <code>&lt;/h1&gt;</code> na nazwę swojego hobby.</li>
          <li>Zmień <strong>Moje hobby</strong> między <code>&lt;title&gt;</code> i <code>&lt;/title&gt;</code> na własny tytuł. Obejrzyj kartę przeglądarki.</li>
          <li>Samodzielnie dodaj drugi akapit o sobie, w nowym wierszu <strong>przed <code>&lt;/body&gt;</code></strong>. Skorzystaj ze wzoru <code>&lt;p&gt;Twój tekst&lt;/p&gt;</code>.</li>
        </ol>
        <p class="ws-subnote"><strong>Co się stanie, jeśli</strong> naciśniesz Enter w środku tekstu akapitu w kodzie? Najpierw przewidź, potem sprawdź. Czy na stronie też powstanie nowy wiersz?</p>
      </section>

      <!-- 6. MISJA BONUSOWA & 7. SPRAWDŹ SWOJE UMIEJĘTNOŚCI -->
      <section class="ws-card ws-card-magic ws-step" data-step="6">
        <div class="ws-card-head">
          <span class="ws-num ws-num-green">6</span>
          <h2>6. MISJA BONUSOWA [do 2 min, opcjonalnie]</h2>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="g7-step-6"> <span>Gotowe</span></label>
        </div>
        <p>Masz czas? Dodaj drugi nagłówek, używając <code>&lt;h2&gt;Moje polecenie&lt;/h2&gt;</code>, oraz własny akapit pod nim. <code>h2</code> oznacza nagłówek niższego poziomu niż <code>h1</code>. Zapisz i odśwież.</p>

        <hr style="border:0;border-top:1px dashed #86efac;margin:14px 0">
        <div class="ws-card-head" style="margin-bottom:8px">
          <span class="ws-num ws-num-purple">7</span>
          <h2>7. SPRAWDŹ SWOJE UMIEJĘTNOŚCI [2 min]</h2>
        </div>
        <ul class="ws-checklist">
          <li><label><input type="checkbox" data-step-check="g7-check-1"> <span>Zapisuję index.html i otwieram go w przeglądarce.</span></label></li>
          <li><label><input type="checkbox" data-step-check="g7-check-2"> <span>Wyjaśniam, do czego służą h1, p i title.</span></label></li>
          <li><label><input type="checkbox" data-step-check="g7-check-3"> <span>Zmieniam kod, zapisuję go i odnajduję zmianę na stronie.</span></label></li>
        </ul>
      </section>
    </div>

    <!-- ZACHOWAJ! -->
    <section class="ws-card ws-tip-blue">
      <h2 style="margin:0 0 8px;font-size:17px">ZACHOWAJ! Przyda Ci się na następnych lekcjach</h2>
      <p><strong>Schemat:</strong> korzystaj z pełnego kodu na stronie 1. Ustawienia umieszczaj w <code>head</code>, a nagłówki <code>h1</code> i akapity <code>p</code> w <code>body</code>. Większość poznanych znaczników tworzy parę: <code>&lt;znacznik&gt;treść&lt;/znacznik&gt;</code>.</p>
      <ul class="ws-list" style="margin:0">
        <li><strong>Zawsze:</strong> Ctrl+S → otwórz index.html w Edge/Chrome → Ctrl+R po zmianach.</li>
        <li><strong>Brak zmian?</strong> Zapisz, odśwież i sprawdź, czy oglądasz plik z folderu MojaStrona.</li>
        <li><strong>Widać kod?</strong> Otwórz plik w przeglądarki; nazwa ma kończyć się <code>.html</code>, a nie <code>.html.txt</code>.</li>
        <li><strong>Dziwny układ?</strong> Sprawdź pary <code>&lt;h1&gt;…&lt;/h1&gt;</code>, <code>&lt;p&gt;…&lt;/p&gt;</code> i nawiasy <code>&lt; &gt;</code>.</li>
      </ul>
    </section>

    <!-- INTERAKTYWNY SYMULATOR VS CODE + PRZEGLĄDARKA -->
    <section class="ws-simulator" aria-label="Interaktywny symulator VS Code i przeglądarki">
      <div class="ws-sim-header">
        <div>
          <span class="ws-sim-eyebrow">💻 WYPRÓBUJ NA ŻYWO: VS CODE + PRZEGLĄDARKA</span>
          <h3>Zmieniaj kod HTML i obserwuj jednocześnie pasek karty przeglądarki (<code>&lt;title&gt;</code>) oraz treść strony (<code>&lt;body&gt;</code>)</h3>
        </div>
        <div class="ws-sim-tabs">
          <button type="button" class="ws-sim-tab active" data-g7-preset="start">Kod startowy (Etap 3)</button>
          <button type="button" class="ws-sim-tab" data-g7-preset="exp">Po zmianach (Etap 5)</button>
          <button type="button" class="ws-sim-tab" data-g7-preset="bonus">+Misja bonusowa (h2)</button>
        </div>
      </div>
      <div class="ws-grid-2" style="padding:18px;margin:0">
        <div>
          <div style="font-size:12px;font-weight:700;margin-bottom:6px;color:var(--muted)">Edytor VS Code — plik <code>MojaStrona/index.html</code>:</div>
          <textarea id="g7-live-editor" class="ws-code-textarea" spellcheck="false">${STARTER_HTML_CODE}</textarea>
        </div>
        <div>
          <div style="font-size:12px;font-weight:700;margin-bottom:6px;color:var(--muted)">Przeglądarka (Edge / Chrome) — efekt po zapisaniu i odświeżeniu:</div>
          <div class="ws-browser-mock">
            <div class="ws-browser-tabbar">
              <span class="ws-browser-dots"><i></i><i></i><i></i></span>
              <span class="ws-browser-tab">🌐 <strong id="g7-browser-title">Moje hobby</strong> <small>(to jest &lt;title&gt;)</small></span>
            </div>
            <div class="ws-browser-body" id="g7-browser-body"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- STRONA 3: NOTATKA DLA NAUCZYCIELA -->
    <details class="ws-card" style="margin-top:20px">
      <summary style="font-weight:800;font-size:16px;cursor:pointer">👩‍🏫 NOTATKA DLA NAUCZYCIELA — Moja pierwsza strona WWW • Klasa VII • Pierwszy kontakt z HTML (Strona 3)</summary>
      <div style="margin-top:14px">
        <h3>Cele i kryteria sukcesu</h3>
        <p>Uczeń tworzy lokalny dokument HTML5 w VS Code, zapisuje go jako index.html, otwiera w przeglądarce, rozróżnia kod i efekt oraz modyfikuje nagłówek, tytuł i akapity. Sukces: plik otwiera się, zawiera własny nagłówek i dwa akapity, a uczeń wskazuje rolę h1, p i title oraz demonstruje zapis i odświeżenie.</p>
        <h3>Powiązanie z czterema załączonymi dokumentami</h3>
        <p><strong>Podstawa programowa:</strong> II.3.d obejmuje tworzenie prezentacji oraz prostej strony z tekstem i grafiką. Karta realizuje wprowadzenie do części dotyczącej strony i tekstu; nie realizuje jeszcze grafiki. II.4: uczeń zapisuje efekt pracy w formacie HTML; inne formaty i wydruk pozostają poza zakresem tego ćwiczenia.</p>
        <p><strong>Rozkład „Lubię to!”:</strong> dział 2 „Strony WWW” ma 3 godziny, temat 2.1 „Zasady tworzenia stron internetowych” - 1 godzinę, z odniesieniami II.3.d i II.4. Karta jest 20-minutowym fragmentem tej lekcji, a nie realizacją całego działu.</p>
        <p><strong>Wymagania edukacyjne, temat 2.1:</strong> odpowiada omawianiu budowy znacznika, wymienianiu podstawowych znaczników oraz tworzeniu prostej strony HTML i zapisywaniu jej w pliku. Kolorowanie składni wspiera VS Code. Analiza kodu za pomocą narzędzi przeglądarki oraz szersze formatowanie są poza kartą. Nie przypisujemy ćwiczeniu realizacji wszystkich poziomów ocen.</p>
        <p><strong>Program nauczania 2024, rozdział 6.4.2:</strong> karta wprowadza narzędzia, kod źródłowy, składnię, znaczniki i tworzenie własnej strony. Projektowanie witryny oraz obiekty graficzne należą do dalszej pracy. VS Code jest wyborem środowiska dla tej karty, a nie wymaganiem podstawy.</p>
        <h3>Metody i organizacja pracy</h3>
        <p>Zastosowano adaptację sekwencji PRIMM: przewidywanie efektu, otwarcie strony, badanie znaczników, zmiany i stworzenie własnego akapitu. HTML jest językiem znaczników; jest to adaptacja metody nauczania programowania, a nie potwierdzona osobno skuteczność PRIMM dla HTML. Use-Modify-Create oraz pełny przykład stopniowo prowadzą do samodzielności. Krótkie etapy i sprawdzanie po każdej zmianie zapewniają szybką informację zwrotną. Własny temat daje uczniowi wybór.</p>
        <p><strong>Czas:</strong> 1 + 2 + 7 + 2 + 4 + 2 = 18 minut podstawy; bonus do 2 minut. Jest to szacunek projektowy, bez pilotażu w klasie. Zakłada sprawne komputery, zainstalowany VS Code i podstawową obsługę Windows. Przy wolnym przepisywaniu udostępnij uczniowi kod z karty do wklejenia, zachowując przewidywanie, analizę i samodzielne zmiany. Nie gwarantuj identycznego tempa wszystkim.</p>
        <h3>Trudności, odpowiedzi i następny krok</h3>
        <p>Najczęstsze trudności: podwójne zamknięcia dopisane przez edytor, pominięty ukośnik, niewłaściwy folder, brak zapisu lub odświeżenia. Pomoc: poproś ucznia o pokazanie konkretnej pary znaczników i przejście cyklu zapisz-odśwież. Enter w tekście akapitu zwykle nie daje podziału wiersza na stronie: białe znaki są scalane. title zmienia kartę przeglądarki; h1 - treść dokumentu.</p>
        <p><strong>Następna karta:</strong> „Moje hobby w punktach i na zdjęciu” - lista oraz lokalny obraz z opisem alternatywnym i poszanowaniem praw autorskich.</p>
        <h3>Źródła metodyczne i techniczne</h3>
        <p>Raspberry Pi Foundation: raspberrypi.org/teach/pedagogy (czytanie kodu, PRIMM, Use-Modify-Create).<br>
        Barefoot Computing: barefootcomputing.org/my-barefoot/research-zone/primm (etapy i zakres dowodów).<br>
        Microsoft: code.visualstudio.com/docs/languages/html (obsługa HTML).<br>
        Zgodność programową odniesiono do czterech załączników użytkownika. Dostęp do źródeł WWW: 29.10.2026.</p>
      </div>
    </details>

    <footer class="ws-footer">
      <span>HTML / KLASA VII</span>
      <span>Strony 1–3</span>
    </footer>
  </div>`;
}

// ============================================================================
// 3. KLASA 8: KOSZTORYS BALU ÓSMOKLASISTY (MS EXCEL)
// ============================================================================
function renderGrade8BalWorksheet() {
  return `
  ${renderToolbar('karta-8-1-kosztorys-balu', 8)}
  <div class="ws-sheet ws-theme-blue" id="ws-sheet">
    <header class="ws-header">
      <div>
        <h1>KARTA PRACY: MS EXCEL</h1>
        <p class="ws-subtitle">Temat: Kosztorys Balu Ósmoklasisty – obliczenia i analiza danych</p>
      </div>
      <div class="ws-badges">
        <span class="ws-badge">Klasa: VIII</span>
        <span class="ws-badge">MS Excel</span>
      </div>
    </header>

    <div class="ws-student-bar">
      <label class="ws-student-field">
        <span>Imię i nazwisko:</span>
        <input type="text" id="ws-student-name" placeholder=".................................................." autocomplete="off">
      </label>
      <label class="ws-student-field ws-student-short">
        <span>Klasa:</span>
        <input type="text" id="ws-student-class" value="VIII" autocomplete="off">
      </label>
      <label class="ws-student-field ws-student-short">
        <span>Data:</span>
        <input type="text" id="ws-student-date" placeholder="dd.mm.rrrr" autocomplete="off">
      </label>
    </div>

    <div class="ws-tip-blue">
      <strong>Kontekst:</strong> Komitet organizacyjny Balu Ósmoklasisty planuje budżet na dekoracje, poczęstunek oraz sprzęt. Twoim zadaniem jest przygotowanie arkusza kalkulacyjnego, który zsumuje wydatki i wyłoni pozycje o wysokim koszcie.
    </div>

    <!-- KROK 1 -->
    <section class="ws-card ws-step" data-step="1">
      <div class="ws-card-head">
        <span class="ws-badge" style="background:#1e3a8a;color:#fff">KROK 1</span>
        <h2>Przepisz dane do pustego arkusza (A1:C6) – czas: ok. 5–7 min</h2>
        <div class="ws-card-tools">
          <button type="button" class="btn primary ws-copy-btn" data-copy-target="bal-tsv">📋 Skopiuj tabelę A1:E7 do Excela</button>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="bal-step-1"> <span>Gotowe</span></label>
        </div>
      </div>
      <div class="ws-table-wrap">
        <table class="ws-excel-grid">
          <thead>
            <tr>
              <th class="ws-excel-corner"></th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
            </tr>
          </thead>
          <tbody>
            <tr class="ws-excel-row-head">
              <td class="ws-excel-rownum">1</td>
              <td><strong>Pozycja</strong></td>
              <td><strong>Cena jedn. (zł)</strong></td>
              <td><strong>Ilość</strong></td>
              <td><strong>Razem (zł)</strong></td>
              <td><strong>Status</strong></td>
            </tr>
            <tr>
              <td class="ws-excel-rownum">2</td>
              <td data-copy-cell="Balony z helem (paczka)">Balony z helem (paczka)</td>
              <td class="ws-num-cell" data-copy-cell="35,00">35,00</td>
              <td class="ws-center-cell" data-copy-cell="4">4</td>
              <td class="ws-formula-placeholder">[formuła]</td>
              <td class="ws-formula-placeholder">[funkcja]</td>
            </tr>
            <tr>
              <td class="ws-excel-rownum">3</td>
              <td data-copy-cell="Fotobudka (godz.)">Fotobudka (godz.)</td>
              <td class="ws-num-cell" data-copy-cell="250,00">250,00</td>
              <td class="ws-center-cell" data-copy-cell="3">3</td>
              <td class="ws-formula-placeholder">[formuła]</td>
              <td class="ws-formula-placeholder">[funkcja]</td>
            </tr>
            <tr>
              <td class="ws-excel-rownum">4</td>
              <td data-copy-cell="Napoje i soki (zgrzewka)">Napoje i soki (zgrzewka)</td>
              <td class="ws-num-cell" data-copy-cell="28,00">28,00</td>
              <td class="ws-center-cell" data-copy-cell="6">6</td>
              <td class="ws-formula-placeholder">[formuła]</td>
              <td class="ws-formula-placeholder">[funkcja]</td>
            </tr>
            <tr>
              <td class="ws-excel-rownum">5</td>
              <td data-copy-cell="Przekąski słone (kg)">Przekąski słone (kg)</td>
              <td class="ws-num-cell" data-copy-cell="22,50">22,50</td>
              <td class="ws-center-cell" data-copy-cell="8">8</td>
              <td class="ws-formula-placeholder">[formuła]</td>
              <td class="ws-formula-placeholder">[funkcja]</td>
            </tr>
            <tr>
              <td class="ws-excel-rownum">6</td>
              <td data-copy-cell="Wynajem nagłośnienia (zestaw)">Wynajem nagłośnienia (zestaw)</td>
              <td class="ws-num-cell" data-copy-cell="450,00">450,00</td>
              <td class="ws-center-cell" data-copy-cell="1">1</td>
              <td class="ws-formula-placeholder">[formuła]</td>
              <td class="ws-formula-placeholder">[funkcja]</td>
            </tr>
            <tr>
              <td class="ws-excel-rownum">7</td>
              <td colspan="3"><strong>SUMA:</strong></td>
              <td class="ws-formula-placeholder"><strong>[SUMA]</strong></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="ws-grid-2">
      <!-- KROK 2 -->
      <section class="ws-card ws-step" data-step="2">
        <div class="ws-card-head">
          <h2>KROK 2: Formatowanie tabeli</h2>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="bal-step-2"> <span>Gotowe</span></label>
        </div>
        <ol class="ws-list">
          <li>Zaznacz obszar <strong>A1:E6</strong> i dodaj <em>Wszystkie krawędzie</em>.</li>
          <li>Wyróżnij nagłówek (<strong>A1:E1</strong>) pogrubieniem i delikatnym tłem.</li>
          <li>Dla kolumn <strong>B</strong> oraz <strong>D</strong> ustaw format <strong>Walutowe (zł)</strong> z 2 miejscami po przecinku.</li>
        </ol>
      </section>

      <!-- KROK 3 -->
      <section class="ws-card ws-step" data-step="3">
        <div class="ws-card-head">
          <h2>KROK 3: Formuły i obliczenia</h2>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="bal-step-3"> <span>Gotowe</span></label>
        </div>
        <ol class="ws-list">
          <li>W komórce <strong>D2</strong> wpisz: <code data-copy-cell="=B2*C2">=B2*C2</code> i skopiuj ją w dół do komórki <strong>D6</strong> (uchwytem wypełniania).</li>
          <li>W komórce <strong>D7</strong> oblicz całkowity koszt balu za pomocą funkcji sumowania: <code data-copy-cell="=SUMA(D2:D6)">=SUMA(D2:D6)</code> .</li>
        </ol>
        <div class="ws-quick-chips">
          <button type="button" class="ws-chip" data-copy-cell="=B2*C2">📋 Kopiuj: =B2*C2</button>
          <button type="button" class="ws-chip" data-copy-cell="=SUMA(D2:D6)">📋 Kopiuj: =SUMA(D2:D6)</button>
        </div>
      </section>
    </div>

    <div class="ws-grid-2">
      <!-- KROK 4 -->
      <section class="ws-card ws-step" data-step="4">
        <div class="ws-card-head">
          <h2>KROK 4: Funkcja logiczna JEŻELI</h2>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="bal-step-4"> <span>Gotowe</span></label>
        </div>
        <p>Wydatki powyżej 200 zł wymagają zgody wychowawcy.<br>Wpisz w komórce <strong>E2</strong> formułę:</p>
        <div class="ws-insert-line">=JEŻELI(D2&gt;200; "Do akceptacji"; "Zatwierdzone")</div>
        <p>i skopiuj ją w dół do wiersza 6.</p>
        <div class="ws-quick-chips">
          <button type="button" class="ws-chip" data-copy-cell='=JEŻELI(D2>200; "Do akceptacji"; "Zatwierdzone")'>📋 Skopiuj formułę JEŻELI</button>
        </div>
      </section>

      <!-- KROK 5 -->
      <section class="ws-card ws-step" data-step="5">
        <div class="ws-card-head">
          <h2>KROK 5: Formatowanie warunkowe</h2>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="bal-step-5"> <span>Gotowe</span></label>
        </div>
        <ol class="ws-list">
          <li>Zaznacz zakres komórek <strong>E2:E6</strong>.</li>
          <li>Wybierz <em>Formatowanie warunkowe → Reguły wyróżniania komórek → Równe...</em> (lub <em>Tekst zawierający</em>).</li>
          <li>Dla tekstu <strong>"Do akceptacji"</strong> ustaw <strong>jasnoczerwone wypełnienie z ciemnoczerwonym tekstem</strong>.</li>
        </ol>
      </section>
    </div>

    <!-- Zadanie dodatkowe -->
    <div class="ws-mission ws-step" data-step="6">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
        <span>💡 <strong>Zadanie dodatkowe (na ocenę celującą):</strong> W komórce <strong>D8</strong> oblicz średni wydatek: <code data-copy-cell="=ŚREDNIA(D2:D6)">=ŚREDNIA(D2:D6)</code>, a w komórce <strong>D9</strong> wyznacz najdroższą pozycję: <code data-copy-cell="=MAX(D2:D6)">=MAX(D2:D6)</code>.</span>
        <label class="ws-done-toggle"><input type="checkbox" data-step-check="bal-step-6"> <span>Gotowe</span></label>
      </div>
    </div>

    <!-- Kryteria oceniania -->
    <section class="ws-card">
      <h2 style="margin:0 0 10px">Kryteria oceniania</h2>
      <div class="ws-table-wrap">
        <table class="ws-pattern-table">
          <thead>
            <tr>
              <th style="width:90px">Ocena</th>
              <th>Wymagania</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Dop (2)</strong></td><td>Przepisanie tabeli bez błędów w danych, proste obramowanie, próba zapisu formuły mnożenia.</td></tr>
            <tr><td><strong>Dst (3)</strong></td><td>Poprawne obliczenie kolumny <em>Razem</em> (<code>=B2*C2</code>) oraz sumy całkowitej (<code>=SUMA(D2:D6)</code>).</td></tr>
            <tr><td><strong>Db (4)</strong></td><td>Poprawny format walutowy (zł) oraz prawidłowe użycie funkcji logicznej <code>=JEŻELI(...)</code>.</td></tr>
            <tr><td><strong>Bdb (5)</strong></td><td>Bezbłędne wykonanie kroków 1–5, w tym poprawne formatowanie warunkowe (wyróżnienie „Do akceptacji”).</td></tr>
            <tr><td><strong>Cel (6)</strong></td><td>Wykonanie całego zadania oraz bezbłędne rozwiązanie zadania dodatkowego (<code>=ŚREDNIA</code> i <code>=MAX</code>).</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Symulator Excela dla Balu Ósmoklasisty -->
    <section class="ws-simulator" aria-label="Interaktywny podgląd arkusza Kosztorys Balu">
      <div class="ws-sim-header">
        <div>
          <span class="ws-sim-eyebrow">📊 PODGLĄD WZORU W MS EXCEL</span>
          <h3>Sprawdź, jakie wyniki powinny wyjść w Twoim arkuszu po każdym kroku</h3>
        </div>
        <div class="ws-sim-tabs">
          <button type="button" class="ws-sim-tab active" data-bal-sim="1">Krok 1–2: Dane i waluta</button>
          <button type="button" class="ws-sim-tab" data-bal-sim="3">Krok 3: Razem i SUMA</button>
          <button type="button" class="ws-sim-tab" data-bal-sim="4">Krok 4: Funkcja JEŻELI</button>
          <button type="button" class="ws-sim-tab" data-bal-sim="5">Krok 5: Formatowanie warunkowe</button>
          <button type="button" class="ws-sim-tab" data-bal-sim="6">★ Na 6: ŚREDNIA i MAX</button>
        </div>
      </div>
      <div class="ws-sim-ribbon" id="bal-sim-ribbon"></div>
      <div class="ws-sim-page" id="bal-sim-page"></div>
    </section>

    <footer class="ws-footer">
      <span>Informatyka – Klasa VIII | Arkusz kalkulacyjny MS Excel</span>
      <span>Strona 1 z 1</span>
    </footer>
  </div>`;
}

// ============================================================================
// 4. KLASA 8: RENTOWNOŚĆ W MS EXCEL (Warsztat Samochodowy „Auto-Centrum”)
// ============================================================================
function renderGrade8RentownoscWorksheet() {
  return `
  ${renderToolbar('karta-8-1-rentownosc-excel', 8)}
  <div class="ws-sheet ws-theme-blue" id="ws-sheet">
    <header class="ws-header">
      <div>
        <h1>KARTA PRACY: RENTOWNOŚĆ W MS EXCEL</h1>
        <p class="ws-subtitle">Klasa VIII • Warsztat Samochodowy „Auto-Centrum” • Analiza finansowa i formuły</p>
      </div>
      <div class="ws-badges">
        <span class="ws-badge">25 minut</span>
        <span class="ws-badge">Klasa: 8</span>
      </div>
    </header>

    <div class="ws-student-bar">
      <label class="ws-student-field">
        <span>Uczeń:</span>
        <input type="text" id="ws-student-name" placeholder=".................................................." autocomplete="off">
      </label>
      <label class="ws-student-field ws-student-short">
        <span>Klasa:</span>
        <input type="text" id="ws-student-class" value="8" autocomplete="off">
      </label>
      <label class="ws-student-field ws-student-short">
        <span>Data:</span>
        <input type="text" id="ws-student-date" placeholder="dd.mm.rrrr" autocomplete="off">
      </label>
    </div>

    <div class="ws-tip-blue">
      <strong>Scenariusz biznesowy (25 minut):</strong> Kierujesz serwisem pojazdów w Pruszczu Gdańskim. Aby nie tracić czasu na długie wprowadzanie danych, przepisujesz tylko <strong>6 pozycji z dziennika zleceń</strong>. Twoim zadaniem jest automatyzacja obliczeń z użyciem adresowania względnego i bezwzględnego ($) oraz weryfikacja rentowności dnia za pomocą funkcji logicznych i statystycznych.
    </div>

    <!-- Sekcja 1 -->
    <section class="ws-card ws-step" data-step="1">
      <div class="ws-card-head">
        <span class="ws-num ws-num-blue">1</span>
        <h2>Wprowadzenie danych do arkusza kalkulacyjnego (ok. 3 minuty)</h2>
        <div class="ws-card-tools">
          <button type="button" class="btn primary ws-copy-btn" data-copy-target="rent-main-tsv">📋 Skopiuj tabelę A1:F8 do Excela</button>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="rent-step-1"> <span>Gotowe</span></label>
        </div>
      </div>
      <p>Otwórz MS Excel i wprowadź do nowego arkusza poniższą tabelę usług (zakres <strong>A1:F8</strong>):</p>
      <div class="ws-table-wrap">
        <table class="ws-excel-grid">
          <thead>
            <tr><th class="ws-excel-corner"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr>
          </thead>
          <tbody>
            <tr class="ws-excel-row-head">
              <td class="ws-excel-rownum">1</td>
              <td><strong>ID</strong></td><td><strong>Dział</strong></td><td><strong>Nazwa usługi</strong></td><td><strong>Wykonano</strong></td><td><strong>Cena netto</strong></td><td><strong>Wartość netto</strong></td>
            </tr>
            <tr><td class="ws-excel-rownum">2</td><td class="ws-center-cell">1</td><td>Mechanika</td><td>Wymiana klocków hamulcowych</td><td class="ws-num-cell">6</td><td class="ws-num-cell">120,00 zł</td><td class="ws-formula-yellow">[Formuła 1]</td></tr>
            <tr><td class="ws-excel-rownum">3</td><td class="ws-center-cell">2</td><td>Eksploatacja</td><td>Serwis olejowo-filtrowy</td><td class="ws-num-cell">8</td><td class="ws-num-cell">150,00 zł</td><td class="ws-formula-yellow">[Formuła 1]</td></tr>
            <tr><td class="ws-excel-rownum">4</td><td class="ws-center-cell">3</td><td>Mechanika</td><td>Wymiana rozrządu</td><td class="ws-num-cell">2</td><td class="ws-num-cell">650,00 zł</td><td class="ws-formula-yellow">[Formuła 1]</td></tr>
            <tr><td class="ws-excel-rownum">5</td><td class="ws-center-cell">4</td><td>Diagnostyka</td><td>Diagnostyka komputerowa OBD</td><td class="ws-num-cell">5</td><td class="ws-num-cell">100,00 zł</td><td class="ws-formula-yellow">[Formuła 1]</td></tr>
            <tr><td class="ws-excel-rownum">6</td><td class="ws-center-cell">5</td><td>Mechanika</td><td>Wymiana pompy paliwa</td><td class="ws-num-cell">3</td><td class="ws-num-cell">250,00 zł</td><td class="ws-formula-yellow">[Formuła 1]</td></tr>
            <tr><td class="ws-excel-rownum">7</td><td class="ws-center-cell">6</td><td>Zawieszenie</td><td>Geometria zawieszenia 3D</td><td class="ws-num-cell">4</td><td class="ws-num-cell">180,00 zł</td><td class="ws-formula-yellow">[Formuła 1]</td></tr>
            <tr><td class="ws-excel-rownum">8</td><td colspan="3" style="text-align:right"><strong>SUMA DZIENNA:</strong></td><td class="ws-formula-yellow">[SUMA]</td><td class="ws-center-cell">—</td><td class="ws-formula-yellow">[SUMA]</td></tr>
          </tbody>
        </table>
      </div>
      <div class="ws-subcard">
        <div class="ws-subcard-head"><strong>Formatowanie komórek arkusza</strong> <span class="ws-badge">Format danych</span></div>
        <ul class="ws-list">
          <li>Ustaw dla kolumn <strong>E</strong> oraz <strong>F</strong> (wiersze 2:8) format <strong>Walutowy (zł)</strong> z 2 miejscami po przecinku.</li>
          <li>Wyróżnij nagłówek <strong>A1:F1</strong> szarym lub niebieskim wypełnieniem i pogrubieniem tekstu.</li>
        </ul>
      </div>
    </section>

    <!-- Sekcja 2 -->
    <section class="ws-card ws-step" data-step="2">
      <div class="ws-card-head">
        <span class="ws-num ws-num-blue">2</span>
        <h2>Obliczenia podstawowe i adresowanie względne</h2>
        <label class="ws-done-toggle"><input type="checkbox" data-step-check="rent-step-2"> <span>Gotowe</span></label>
      </div>
      <div class="ws-subcard">
        <div class="ws-subcard-head"><strong>Wartość netto pozycji (Adresowanie względne)</strong> <span class="ws-badge">Względne</span></div>
        <p>W komórce <strong>F2</strong> pomnóż liczbę wykonanych usług przez ich cenę jednostkową netto. Przeciągnij uchwyt autouzupełniania w dół do <strong>F7</strong>.</p>
        <div class="ws-formula-input-row">
          <label><code>Formuła wpisana w komórce F2: =</code>
            <input type="text" class="ws-formula-entry" data-rent-formula="F2" placeholder="np. D2*E2" autocomplete="off" spellcheck="false">
          </label>
        </div>
      </div>

      <div class="ws-subcard" style="margin-top:12px">
        <div class="ws-subcard-head"><strong>Podsumowania funkcją SUMA</strong> <span class="ws-badge">Funkcja SUMA</span></div>
        <ul class="ws-list">
          <li>W komórce <strong>D8</strong> zsumuj liczbę zrealizowanych napraw za pomocą funkcji SUMA.</li>
          <li>W komórce <strong>F8</strong> zsumuj łączny dzienny przychód netto serwisu.</li>
        </ul>
        <div class="ws-grid-2" style="margin-top:10px;margin-bottom:0">
          <label class="ws-formula-input-row"><code>Formuła w D8: =</code>
            <input type="text" class="ws-formula-entry" data-rent-formula="D8" placeholder="np. SUMA(D2:D7)" autocomplete="off" spellcheck="false">
          </label>
          <label class="ws-formula-input-row"><code>Formuła w F8: =</code>
            <input type="text" class="ws-formula-entry" data-rent-formula="F8" placeholder="np. SUMA(F2:F7)" autocomplete="off" spellcheck="false">
          </label>
        </div>
      </div>
    </section>

    <!-- Sekcja 3 -->
    <section class="ws-card ws-step" data-step="3">
      <div class="ws-card-head">
        <span class="ws-num ws-num-blue">3</span>
        <h2>Parametry rentowności i adresowanie bezwzględne ($)</h2>
        <div class="ws-card-tools">
          <button type="button" class="btn ws-copy-btn" data-copy-target="rent-params-tsv">📋 Skopiuj tabelę A10:D15 do Excela</button>
          <label class="ws-done-toggle"><input type="checkbox" data-step-check="rent-step-3"> <span>Gotowe</span></label>
        </div>
      </div>
      <p>Poniżej tabeli głównej (od wiersza 10) wprowadź parametry finansowe i panel analityczny:</p>
      <div class="ws-table-wrap">
        <table class="ws-excel-grid">
          <thead>
            <tr><th class="ws-excel-corner"></th><th>A</th><th>B</th><th>C</th><th>D</th></tr>
          </thead>
          <tbody>
            <tr class="ws-excel-row-head">
              <td class="ws-excel-rownum">10</td>
              <td><strong>PAR</strong></td><td><strong>Wskaźnik finansowy</strong></td><td><strong>Wartość w arkuszu</strong></td><td><strong>Wyjaśnienie / Formuła</strong></td>
            </tr>
            <tr><td class="ws-excel-rownum">11</td><td class="ws-center-cell">VAT</td><td>Stawka podatku VAT</td><td class="ws-num-cell"><strong>23%</strong></td><td>Format Procentowy (0,23)</td></tr>
            <tr><td class="ws-excel-rownum">12</td><td class="ws-center-cell">KOSZT</td><td>Dzienny koszt stały warsztatu</td><td class="ws-num-cell"><strong>5 500,00 zł</strong></td><td>Czynsz, prąd, pensje mechaników</td></tr>
            <tr><td class="ws-excel-rownum">13</td><td class="ws-center-cell">BRUTTO</td><td>Łączny przychód warsztatu brutto</td><td class="ws-formula-yellow">[Formuła z $]</td><td>Przychód netto F8 × (1 + VAT)</td></tr>
            <tr><td class="ws-excel-rownum">14</td><td class="ws-center-cell">WYNIK</td><td>Wynik finansowy netto/dzień</td><td class="ws-formula-yellow">[Różnica]</td><td>Przychód brutto (C13) − Koszt (C12)</td></tr>
            <tr><td class="ws-excel-rownum">15</td><td class="ws-center-cell">STATUS</td><td>Ocena rentowności (czy wynik &gt;= 0)</td><td class="ws-formula-yellow"><strong>[Funkcja JEŻELI]</strong></td><td>Wyświetla "RENTOWNY" lub "STRATA"</td></tr>
          </tbody>
        </table>
      </div>

      <div class="ws-subcard" style="margin-top:12px">
        <div class="ws-subcard-head"><strong>Krok A: Przychód brutto i adresowanie bezwzględne ($)</strong> <span class="ws-badge">Adresowanie $</span></div>
        <p>W komórce <strong>C13</strong> oblicz przychód brutto: łączny obrót netto (<strong>F8</strong>) pomnóż przez <code>(1 + $C$11)</code>. Zastosuj znak <strong>$</strong>, aby zablokować komórkę stawki VAT. W <strong>C14</strong> odejmij koszt (<code>=C13-C12</code>).</p>
        <label class="ws-formula-input-row"><code>Formuła w C13: =</code>
          <input type="text" class="ws-formula-entry" data-rent-formula="C13" placeholder="np. F8*(1+$C$11)" autocomplete="off" spellcheck="false">
        </label>
      </div>

      <div class="ws-subcard" style="margin-top:12px">
        <div class="ws-subcard-head"><strong>Krok B: Badanie rentowności (Funkcja logiczna JEŻELI)</strong> <span class="ws-badge">Funkcja JEŻELI</span></div>
        <p>W komórce <strong>C15</strong> wstaw warunek: jeżeli wynik finansowy (<strong>C14</strong>) jest większy lub równy <strong>0</strong>, ma pojawić się napis <code>"RENTOWNY"</code>, a w przeciwnym razie <code>"STRATA"</code>.</p>
        <label class="ws-formula-input-row"><code>Formuła w C15: =</code>
          <input type="text" class="ws-formula-entry" data-rent-formula="C15" placeholder='np. JEŻELI(C14>=0;"RENTOWNY";"STRATA")' autocomplete="off" spellcheck="false">
        </label>
      </div>

      <div class="ws-subcard" style="margin-top:12px">
        <div class="ws-subcard-head"><strong>Krok C: Analityka działu mechaniki – LICZ.JEŻELI, SUMA.JEŻELI i ŚREDNIA</strong> <span class="ws-badge">LICZ.JEŻELI / SUMA.JEŻELI</span></div>
        <p>W wolnych komórkach (np. <strong>C17:C19</strong>) wykonaj zaawansowane zestawienie:</p>
        <ol class="ws-list">
          <li>Średnia cena katalogowa usługi (komórki E2:E7): <code>ŚREDNIA</code>.</li>
          <li>Liczba zrealizowanych zleceń z działu "Mechanika": funkcja <code>LICZ.JEŻELI</code> z zakresu B2:B7.</li>
          <li>Łączny przychód netto wypracowany przez dział "Mechanika": funkcja <code>SUMA.JEŻELI</code>.</li>
        </ol>
        <div class="ws-grid-2" style="margin-top:10px;margin-bottom:0">
          <label class="ws-formula-input-row"><code>LICZ.JEŻELI (ile usług mechaniki): =</code>
            <input type="text" class="ws-formula-entry" data-rent-formula="LICZ" placeholder='np. LICZ.JEŻELI(B2:B7;"Mechanika")' autocomplete="off" spellcheck="false">
          </label>
          <label class="ws-formula-input-row"><code>SUMA.JEŻELI (przychód mechaniki): =</code>
            <input type="text" class="ws-formula-entry" data-rent-formula="SUMAJ" placeholder='np. SUMA.JEŻELI(B2:B7;"Mechanika";F2:F7)' autocomplete="off" spellcheck="false">
          </label>
        </div>
      </div>

      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn primary" id="rent-check-formulas">✓ Sprawdź wpisane formuły</button>
        <button type="button" class="btn" id="rent-fill-sample">💡 Pokaż wzorcowe formuły</button>
      </div>
      <div id="rent-formula-feedback" role="status" aria-live="polite"></div>
    </section>

    <!-- Sekcja 4: Karta oceny -->
    <section class="ws-card ws-step" data-step="4">
      <div class="ws-card-head">
        <span class="ws-num ws-num-blue">4</span>
        <h2>Karta oceny pracy ucznia (10 punktów)</h2>
      </div>
      <div class="ws-table-wrap">
        <table class="ws-pattern-table">
          <thead>
            <tr><th>Sprawdzana umiejętność w arkuszu kalkulacyjnym</th><th style="width:90px">Punkty</th><th style="width:90px">Ocena</th></tr>
          </thead>
          <tbody>
            <tr><td>Prawidłowe wpisanie tabeli oraz poprawne formatowanie danych (Walutowe zł, Procentowe %)</td><td class="ws-center-cell"><strong>2 pkt</strong></td><td><input type="checkbox" data-step-check="rent-rubric-1"></td></tr>
            <tr><td>Zastosowanie adresowania względnego w kolumnie F oraz funkcji SUMA i ŚREDNIA</td><td class="ws-center-cell"><strong>2 pkt</strong></td><td><input type="checkbox" data-step-check="rent-rubric-2"></td></tr>
            <tr><td>Użycie adresowania bezwzględnego ze znakiem $ przy kalkulacji VAT w komórce C13</td><td class="ws-center-cell"><strong>2 pkt</strong></td><td><input type="checkbox" data-step-check="rent-rubric-3"></td></tr>
            <tr><td>Prawidłowa konstrukcja algorytmu rentowności za pomocą funkcji JEŻELI (komórka C15)</td><td class="ws-center-cell"><strong>2 pkt</strong></td><td><input type="checkbox" data-step-check="rent-rubric-4"></td></tr>
            <tr><td>Zastosowanie zaawansowanych funkcji analitycznych <strong>LICZ.JEŻELI</strong> oraz <strong>SUMA.JEŻELI</strong></td><td class="ws-center-cell"><strong>2 pkt</strong></td><td><input type="checkbox" data-step-check="rent-rubric-5"></td></tr>
            <tr><td><strong>ŁĄCZNA LICZBA PUNKTÓW</strong></td><td class="ws-center-cell"><strong>/ 10 pkt</strong></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Symulator wyników Rentowności -->
    <section class="ws-simulator" aria-label="Podgląd obliczonych wartości w arkuszu Rentowność">
      <div class="ws-sim-header">
        <div>
          <span class="ws-sim-eyebrow">📊 WERYFIKATOR OBLICZEŃ W MS EXCEL</span>
          <h3>Porównaj swoje wyniki liczbowe w Excelu z wzorcowym arkuszem „Auto-Centrum”</h3>
        </div>
        <div class="ws-sim-tabs">
          <button type="button" class="ws-sim-tab active" data-rent-sim="main">Tabela główna (A1:F8)</button>
          <button type="button" class="ws-sim-tab" data-rent-sim="params">Parametry i rentowność (A10:D15)</button>
          <button type="button" class="ws-sim-tab" data-rent-sim="analytics">Krok C: Analityka Mechaniki (C17:C19)</button>
        </div>
      </div>
      <div class="ws-sim-page" id="rent-sim-page"></div>
    </section>

    <footer class="ws-footer">
      <span>MS Excel • Karta Pracy: Rentowność Warsztatu • Klasa VIII</span>
      <span>Strona 1–2 z 2</span>
    </footer>
  </div>`;
}

// ============================================================================
// 5. KLASA 8: 3 MISJE DETEKTYWISTYCZNE – TABELE PRZESTAWNE W EXCELU 2016
// ============================================================================
function renderGrade8PivotWorksheet() {
  return `
  ${renderToolbar('karta-8-1-tabele-przestawne', 8)}
  <div class="ws-sheet ws-theme-green" id="ws-sheet">
    <header class="ws-header" style="background:#14532d;color:#fff;padding:22px;border-radius:12px;border-bottom:4px solid #f59e0b">
      <div>
        <small style="color:#86efac;font-weight:700;letter-spacing:.08em">KARTA PRACY UCZNIA – ZADANIE PRAKTYCZNE • INFORMATYKA – KLASA 8</small>
        <h1 style="color:#fff;margin:6px 0 8px">3 Misje Detektywistyczne – Tabele Przestawne w Excelu 2016</h1>
        <p class="ws-subtitle" style="color:#dcfce7">Plik: <code>prawo-jazdy.xlsx</code></p>
      </div>
      <div class="ws-badges">
        <span class="ws-badge">Excel 2016</span>
        <span class="ws-badge">Klasa 8</span>
      </div>
    </header>

    <div class="ws-student-bar">
      <label class="ws-student-field">
        <span>Imię i nazwisko:</span>
        <input type="text" id="ws-student-name" placeholder="....................................................." autocomplete="off">
      </label>
      <label class="ws-student-field ws-student-short">
        <span>Klasa:</span>
        <input type="text" id="ws-student-class" value="8" autocomplete="off">
      </label>
    </div>

    <!-- Załącznik do pobrania: prawo-jazdy.xlsx -->
    <section class="ws-card" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:2px solid #22c55e">
      <div class="ws-card-head" style="margin-bottom:8px">
        <h2 style="color:#14532d;margin:0">📎 Załącznik do zadania: Baza danych <code>prawo-jazdy.xlsx</code> (500 raportów z egzaminów 2015–2019)</h2>
        <span class="ws-badge" style="background:#15803d;color:#fff">Arkusz1 • 500 wierszy</span>
      </div>
      <p style="margin:0 0 12px;color:#14532d">Pobierz oryginalny plik <code>prawo-jazdy.xlsx</code> na swój komputer i otwórz go w programie <strong>MS Excel</strong> (lub skopiuj wszystkie 500 wierszy jednym kliknięciem prosto do schowka):</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <button type="button" class="btn primary" id="piv-download-xlsx" style="background:#15803d;border-color:#15803d;font-weight:700">📥 Pobierz załącznik: prawo-jazdy.xlsx (MS Excel)</button>
        <a class="btn" href="./prawo-jazdy.csv" download="prawo-jazdy.csv">📥 Pobierz plik CSV (prawo-jazdy.csv)</a>
        <button type="button" class="btn" id="piv-copy-csv-tsv">📋 Skopiuj wszystkie 500 wierszy do Excela</button>
        <button type="button" class="btn" id="piv-toggle-raw">👁️ Podgląd bazy danych Arkusz1 na stronie (500 wierszy)</button>
      </div>
      <div id="piv-raw-preview" hidden style="margin-top:14px;background:var(--surface);color:var(--text);border:1px solid var(--line);border-radius:10px;padding:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <strong>📊 Podgląd arkusza <code>Arkusz1</code> z pliku <code>prawo-jazdy.xlsx</code> (16 województw, 24 miasta, 500 wierszy):</strong>
          <input type="search" id="piv-raw-search" placeholder="Filtruj podgląd (np. małopolskie, Toruń, 2018)..." style="max-width:320px;padding:6px 10px;border:1px solid #cbd5e1;border-radius:8px">
        </div>
        <div class="ws-table-wrap" style="max-height:280px;overflow-y:auto" id="piv-raw-table-wrap"></div>
      </div>
    </section>

    <section class="ws-card">
      <h2 style="color:#15803d;margin:0 0 10px">Praktyczne zadanie dla Ciebie – 3 Misje Detektywistyczne</h2>
      <p>Czas sprawdzić nasz „magiczny sorter” w praktyce! Otwórz plik <code>prawo-jazdy.xlsx</code>, wstaw tabelę przestawną na nowym arkuszu (<strong>Wstawianie → Tabela przestawna → Nowy arkusz → OK</strong>) i odpowiedz na poniższe 3 pytania badawcze, układając odpowiednio klocki w panelu <strong>Pola tabeli przestawnej</strong>. Zapisz swoje odpowiedzi w tabeli na kolejnej stronie.</p>
      <div class="ws-mission" style="margin:12px 0 0">
        💡 <strong>Zanim zaczniesz kolejną misję:</strong> Aby wyczyścić tabelę przestawną przed nowym zadaniem, po prostu <strong>odznacz ptaszki (✓)</strong> przy polach na górnej liście panelu bocznego (lub wyciągnij pola myszką poza białe okienka).
      </div>
    </section>

    <!-- Misja 1 -->
    <section class="ws-card ws-step" data-step="1" style="border-left:5px solid #16a34a">
      <div class="ws-card-head">
        <h2>🏆 Misja 1: Wielki pojedynek województw (Sumowanie danych)</h2>
        <label class="ws-done-toggle"><input type="checkbox" data-step-check="piv-step-1"> <span>Gotowe</span></label>
      </div>
      <p><strong>Pytanie badawcze:</strong> <em>W którym województwie w latach 2015–2019 egzamin na prawo jazdy zdało łącznie <strong>najwięcej kobiet</strong>, a w którym <strong>najmniej</strong>? Jak wygląda to w przypadku <strong>mężczyzn</strong>? Ile łącznie egzaminów zdano w całej Polsce?</em></p>
      <p><strong>Jak to wyklikać krok po kroku:</strong></p>
      <ul class="ws-list">
        <li><strong>Krok 1:</strong> Chwyć lewym przyciskiem myszy pole <code>Województwo</code> na górnej liście i przeciągnij je do okienka <strong>Wiersze</strong> na dole. (Zobaczysz listę 16 województw!).</li>
        <li><strong>Krok 2:</strong> Chwyć pole <code>Liczba zdanych egzaminów (kobiety)</code> i przeciągnij je do okienka <strong>Wartości</strong>.</li>
        <li><strong>Krok 3:</strong> Chwyć pole <code>Liczba zdanych egzaminów (mężczyźni)</code> i również przeciągnij je do okienka <strong>Wartości</strong> (tuż pod kobietami).</li>
        <li><strong>Krok 4 (Ułatwienie!):</strong> Aby nie szukać największej liczby wzrokiem, kliknij prawym przyciskiem myszy dowolną liczbę w kolumnie z wynikami kobiet, wybierz <strong>Sortuj → Sortuj od największych do najmniejszych</strong>. Odczytaj wyniki z samej góry i z samego dołu tabeli (oraz wiersz <strong>Suma końcowa</strong> na dole)!</li>
      </ul>
    </section>

    <!-- Misja 2 -->
    <section class="ws-card ws-step" data-step="2" style="border-left:5px solid #16a34a">
      <div class="ws-card-head">
        <h2>🏙️ Misja 2: Najbardziej zapracowane miasta (Zliczanie wpisów i sumowanie)</h2>
        <label class="ws-done-toggle"><input type="checkbox" data-step-check="piv-step-2"> <span>Gotowe</span></label>
      </div>
      <p><strong>Pytanie badawcze:</strong> <em>1. Z którego <strong>miasta</strong> spłynęło najwięcej pojedynczych raportów (czyli które miasto pojawia się w wierszach naszej bazy danych najczęściej)? Ile razy? 2. W którym <strong>mieście</strong> egzamin zdało łącznie najwięcej kobiet, a w którym najwięcej mężczyzn?</em></p>
      <p><strong>Jak to wyklikać krok po kroku:</strong></p>
      <ul class="ws-list">
        <li><strong>Krok 1:</strong> Odznacz pole <code>Województwo</code> na liście pól, a zamiast niego przeciągnij pole <code>Miasto</code> do okienka <strong>Wiersze</strong>.</li>
        <li><strong>Krok 2:</strong> Aby policzyć, ile razy każde miasto pojawia się w tabeli, chwyć pole <code>Miasto</code> na górnej liście <strong>jeszcze raz</strong> i przeciągnij je do okienka <strong>Wartości</strong>! Ponieważ nazwy miast to tekst, Excel automatycznie ustawi opcję <strong>Liczba z Miasto</strong> (czyli policzy liczbę raportów dla każdego miasta).</li>
        <li><strong>Krok 3:</strong> Upewnij się, że w okienku <strong>Wartości</strong> masz także pola <code>Suma z Liczba zdanych egzaminów (kobiety)</code> oraz <code>Suma z Liczba zdanych egzaminów (mężczyźni)</code>.</li>
        <li><strong>Krok 4:</strong> Posortuj poszczególne kolumny (Prawy przycisk myszy na liczbie → <strong>Sortuj → Sortuj od największych do najmniejszych</strong>) i zanotuj zwycięzców!</li>
      </ul>
    </section>

    <!-- Misja 3 -->
    <section class="ws-card ws-step" data-step="3" style="border-left:5px solid #16a34a">
      <div class="ws-card-head">
        <h2>🔎 Misja 3: Pod lupą – Magiczny Filtr i rekordy województwa</h2>
        <label class="ws-done-toggle"><input type="checkbox" data-step-check="piv-step-3"> <span>Gotowe</span></label>
      </div>
      <p><strong>Pytanie badawcze:</strong> <em>Weźmy pod lupę wyłącznie województwo małopolskie oraz lubelskie: 1. Z jakich konkretnie miast pochodzą dane w województwie <strong>małopolskim</strong> i w którym z tych miast prawo jazdy zdało najwięcej kobiet? 2. W którym mieście województwa <strong>lubelskiego</strong> egzamin zdało najwięcej mężczyzn i jaki to był wynik?</em></p>
      <p><strong>Jak to wyklikać krok po kroku:</strong></p>
      <ul class="ws-list">
        <li><strong>Krok 1:</strong> Zostaw pole <code>Miasto</code> w okienku <strong>Wiersze</strong>, a w okienku <strong>Wartości</strong> zostaw sumę zdanych egzaminów kobiet i mężczyzn.</li>
        <li><strong>Krok 2:</strong> Chwyć pole <code>Województwo</code> z górnej listy i przeciągnij je do okienka <strong>Filtry</strong> (lewe górne okienko na dole panelu bocznego).</li>
        <li><strong>Krok 3:</strong> Spójrz na samą górę swojego arkusza (komórki <code>A1:B1</code> nad tabelą przestawną). Pojawił się tam nowy pasek filtru: <strong>Województwo | (Wszystko)</strong>.</li>
        <li><strong>Krok 4:</strong> Kliknij małą strzałkę obok słowa <strong>(Wszystko)</strong> w komórce <code>B1</code>, wybierz z listy <code>małopolskie</code> i kliknij <strong>OK</strong>.</li>
        <li><strong>Krok 5:</strong> Tabela natychmiast skurczyła się tylko do miast z Małopolski! Odczytaj odpowiedź, a następnie kliknij strzałkę filtru ponownie, zmień województwo na <code>lubelskie</code>, kliknij <strong>OK</strong> i odczytaj drugi wynik.</li>
      </ul>
    </section>

    <!-- Symulator Panelu Pól Tabeli Przestawnej -->
    <section class="ws-simulator" aria-label="Wizualny pomocnik ustawienia pól tabeli przestawnej">
      <div class="ws-sim-header">
        <div>
          <span class="ws-sim-eyebrow">🧭 POMOCNIK UKŁADU KLOCKÓW W PANELU BOCZNYM EXCELA</span>
          <h3>Zobacz, w których okienkach powinny znaleźć się pola w każdej z 3 Misji</h3>
        </div>
        <div class="ws-sim-tabs">
          <button type="button" class="ws-sim-tab active" data-piv-sim="1">🏆 Układ dla Misji 1</button>
          <button type="button" class="ws-sim-tab" data-piv-sim="2">🏙️ Układ dla Misji 2</button>
          <button type="button" class="ws-sim-tab" data-piv-sim="3">🔎 Układ dla Misji 3</button>
        </div>
      </div>
      <div class="ws-sim-page" id="piv-sim-page"></div>
    </section>

    <!-- Karta odpowiedzi Detektywa Danych -->
    <section class="ws-card" style="margin-top:20px">
      <h2 style="color:#15803d;margin:0 0 12px">Karta odpowiedzi Detektywa Danych – wpisz swoje wyniki</h2>
      <div class="ws-table-wrap">
        <table class="ws-pattern-table">
          <thead>
            <tr style="background:#15803d;color:#fff">
              <th style="background:#15803d;color:#fff;width:90px">Misja</th>
              <th style="background:#15803d;color:#fff">Szukana informacja</th>
              <th style="background:#15803d;color:#fff;width:42%">Twoja odpowiedź (nazwa i liczba)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Misja 1</strong></td>
              <td>Województwo z <strong>największą</strong> i <strong>najmniejszą</strong> liczbą zdanych egzaminów przez <strong>kobiety</strong>:</td>
              <td>
                <label class="ws-ans-line"><span>Najwięcej:</span> <input type="text" data-piv-ans="m1-k-max" placeholder="......................................."></label>
                <label class="ws-ans-line"><span>Najmniej:</span> <input type="text" data-piv-ans="m1-k-min" placeholder="......................................."></label>
              </td>
            </tr>
            <tr>
              <td><strong>Misja 1</strong></td>
              <td>Województwo z <strong>największą</strong> i <strong>najmniejszą</strong> liczbą zdanych egzaminów przez <strong>mężczyzn</strong>:</td>
              <td>
                <label class="ws-ans-line"><span>Najwięcej:</span> <input type="text" data-piv-ans="m1-m-max" placeholder="......................................."></label>
                <label class="ws-ans-line"><span>Najmniej:</span> <input type="text" data-piv-ans="m1-m-min" placeholder="......................................."></label>
              </td>
            </tr>
            <tr>
              <td><strong>Misja 1</strong></td>
              <td><strong>Suma końcowa</strong> zdanych egzaminów w całej Polsce (kobiety / mężczyźni):</td>
              <td>
                <label class="ws-ans-line"><span>Kobiety:</span> <input type="text" data-piv-ans="m1-sum-k" placeholder="........................................."></label>
                <label class="ws-ans-line"><span>Mężczyźni:</span> <input type="text" data-piv-ans="m1-sum-m" placeholder="....................................."></label>
              </td>
            </tr>
            <tr>
              <td><strong>Misja 2</strong></td>
              <td>Miasto z <strong>największą liczbą raportów</strong> (<code>Liczba z Miasto</code>) oraz liczba wystąpień:</td>
              <td>
                <label class="ws-ans-line"><span>Miasto:</span> <input type="text" data-piv-ans="m2-city" placeholder="..........................................."></label>
                <label class="ws-ans-line"><span>Liczba raportów:</span> <input type="text" data-piv-ans="m2-count" placeholder="............................"></label>
              </td>
            </tr>
            <tr>
              <td><strong>Misja 2</strong></td>
              <td>Miasto z największą sumą zdanych egzaminów (osobno dla <strong>kobiet</strong> i dla <strong>mężczyzn</strong>):</td>
              <td>
                <label class="ws-ans-line"><span>Kobiety:</span> <input type="text" data-piv-ans="m2-max-k" placeholder="........................................."></label>
                <label class="ws-ans-line"><span>Mężczyźni:</span> <input type="text" data-piv-ans="m2-max-m" placeholder="....................................."></label>
              </td>
            </tr>
            <tr>
              <td><strong>Misja 3</strong></td>
              <td>Woj. <strong>małopolskie</strong> – wszystkie miasta w bazie oraz miasto z największą liczbą kobiet:</td>
              <td>
                <label class="ws-ans-line"><span>Miasta:</span> <input type="text" data-piv-ans="m3-mal-cities" placeholder="..........................................."></label>
                <label class="ws-ans-line"><span>Rekord kobiet:</span> <input type="text" data-piv-ans="m3-mal-rec" placeholder="..............................."></label>
              </td>
            </tr>
            <tr>
              <td><strong>Misja 3</strong></td>
              <td>Woj. <strong>lubelskie</strong> – miasto, w którym egzamin zdało najwięcej mężczyzn (oraz wynik):</td>
              <td>
                <label class="ws-ans-line"><span>Miasto:</span> <input type="text" data-piv-ans="m3-lub-city" placeholder="..........................................."></label>
                <label class="ws-ans-line"><span>Wynik mężczyzn:</span> <input type="text" data-piv-ans="m3-lub-rec" placeholder="..........................."></label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
        <button type="button" class="btn primary" id="piv-check-answers" style="background:#15803d;border-color:#15803d">✓ Sprawdź moje odpowiedzi z bazą prawo-jazdy.xlsx</button>
        <button type="button" class="btn" id="piv-fill-sample">💡 Pokaż wzorcowe wyniki z bazy (do samokontroli)</button>
      </div>
      <div id="piv-check-feedback" style="margin-top:10px"></div>
    </section>

    <!-- Lista kontrolna Detektywa Danych -->
    <section class="ws-card ws-card-magic">
      <div class="ws-card-head">
        <h2>✅ Lista kontrolna Detektywa Danych – sprawdź przed oddaniem pracy!</h2>
      </div>
      <ul class="ws-checklist">
        <li><label><input type="checkbox" data-step-check="piv-check-1"> <span>Moja tabela przestawna znajduje się na <strong>nowym arkuszu</strong> i nie zmieniła oryginalnych danych w <code>Arkusz1</code>.</span></label></li>
        <li><label><input type="checkbox" data-step-check="piv-check-2"> <span>W Misji 2 użyto opcji <strong>Liczba z Miasto</strong> do policzenia raportów oraz <strong>Suma z...</strong> do zsumowania egzaminów.</span></label></li>
        <li><label><input type="checkbox" data-step-check="piv-check-3"> <span>Wszystkie pola w powyższej <strong>Karcie odpowiedzi</strong> zostały uzupełnione konkretnymi nazwami oraz liczbami.</span></label></li>
      </ul>
    </section>

    <footer class="ws-footer">
      <span>Zadanie Praktyczne: Tabele Przestawne w Excelu 2016 (prawo-jazdy.xlsx)</span>
      <span>Strona 1–2 z 2</span>
    </footer>
  </div>`;
}

export function renderExtraWorksheet(id) {
  if (id === vatCard.id) return renderVat(renderToolbar(id, 8));
  if (id === 'karta-4-1-urzadzenia-pliki') return renderGrade4DevicesWorksheet();
  if (id === 'karta-7-2-1-pierwsza-strona') return renderGrade7FirstPageWorksheet();
  if (id === 'karta-8-1-kosztorys-balu') return renderGrade8BalWorksheet();
  if (id === 'karta-8-1-rentownosc-excel') return renderGrade8RentownoscWorksheet();
  if (id === 'karta-8-1-tabele-przestawne') return renderGrade8PivotWorksheet();
  return '';
}

async function copyText(text, toast) {
  try {
    await navigator.clipboard.writeText(text);
    toast('✓ Skopiowano do schowka!');
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    toast('✓ Skopiowano do schowka!');
  }
}

export function bindExtraWorksheet(id, toast) {
  const sheet = document.getElementById('ws-sheet');
  if (!sheet) return;

  const STORAGE_KEY = 'informatyka-ws-extra-v1';
  let state = {};
  try {
    state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    state = {};
  }
  const saveState = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  };

  // Student header persistence
  const nameInput = document.getElementById('ws-student-name');
  if (nameInput) {
    nameInput.value = state.studentName || '';
    nameInput.addEventListener('input', () => {
      state.studentName = nameInput.value;
      saveState();
    });
  }

  // Copy buttons & cells
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.onclick = () => {
      const t = btn.dataset.copyTarget;
      if (t === 'g7-html-code') copyText(STARTER_HTML_CODE, toast);
      else if (t === 'bal-tsv') copyText(BAL_TSV, toast);
      else if (t === 'rent-main-tsv') copyText(RENTOWNOSC_MAIN_TSV, toast);
      else if (t === 'rent-params-tsv') copyText(RENTOWNOSC_PARAMS_TSV, toast);
    };
  });
  document.querySelectorAll('[data-copy-cell]').forEach(el => {
    el.onclick = () => copyText(el.dataset.copyCell, toast);
  });

  // Large text & Print
  const largeBtn = document.getElementById('ws-toggle-large');
  if (largeBtn) {
    largeBtn.onclick = () => {
      const active = sheet.classList.toggle('ws-large-text');
      largeBtn.setAttribute('aria-pressed', String(active));
      largeBtn.textContent = active ? '🔍 Zwykły rozmiar tekstu' : '🔍 Powiększ tekst';
    };
  }
  const printBtn = document.getElementById('ws-print');
  if (printBtn) printBtn.onclick = () => window.print();

  // Checkboxes & progress bar
  const checks = [...sheet.querySelectorAll('[data-step-check]')];
  const progressLabel = document.getElementById('ws-progress-label');
  const progressFill = document.getElementById('ws-progress-fill');

  function updateProgress() {
    if (!checks.length) return;
    const done = checks.filter(c => c.checked).length;
    const pct = Math.round((done / checks.length) * 100);
    if (progressLabel) progressLabel.innerHTML = `Twój postęp na karcie pracy: <strong>${done} / ${checks.length} (${pct}%)</strong>`;
    if (progressFill) progressFill.style.width = `${pct}%`;
    checks.forEach(c => {
      const stepCard = c.closest('.ws-step');
      if (stepCard) stepCard.classList.toggle('ws-step-done', c.checked);
    });
  }
  checks.forEach(c => {
    const k = c.dataset.stepCheck;
    c.checked = !!state[k];
    c.addEventListener('change', () => {
      state[k] = c.checked;
      saveState();
      updateProgress();
    });
  });
  updateProgress();

  // ==========================================================================
  if (id === vatCard.id) bindVat(sheet,state,saveState);
  // Logic for Grade 4 Worksheet (Auto-grading 25 points)
  // ==========================================================================
  if (id === 'karta-4-1-urzadzenia-pliki') {
    document.querySelectorAll('.ws-x-cell').forEach(cell => {
      const selectCell = () => {
        const row = cell.closest('tr');
        row.querySelectorAll('.ws-x-cell').forEach(c => {
          c.textContent = '';
          c.classList.remove('ws-x-selected', 'ws-good-cell', 'ws-bad-cell');
        });
        cell.textContent = 'X';
        cell.classList.add('ws-x-selected');
      };
      cell.onclick = selectCell;
      cell.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCell(); } };
    });

    document.querySelectorAll('.ws-pf-btn').forEach(btn => {
      btn.onclick = () => {
        const row = btn.closest('.ws-pf-row');
        row.querySelectorAll('.ws-pf-btn').forEach(b => b.classList.remove('active', 'ws-good-cell', 'ws-bad-cell'));
        btn.classList.add('active');
        row.dataset.selected = btn.dataset.val;
      };
    });

    const checkBtn = document.getElementById('g4-check-all');
    if (checkBtn) {
      checkBtn.onclick = () => {
        let total = 0;

        // Zad 1 (3 pkt)
        let s1 = 0;
        document.querySelectorAll('[data-g4-z1]').forEach(sel => {
          const ok = sel.value === sel.dataset.g4Z1;
          sel.classList.toggle('ws-good-cell', ok);
          sel.classList.toggle('ws-bad-cell', !ok);
          if (ok) s1++;
        });
        document.getElementById('g4-score-1').textContent = `${s1} / 3 pkt`;
        total += s1;

        // Zad 2 (6 pkt)
        let s2 = 0;
        document.querySelectorAll('[data-g4-z2-row]').forEach(row => {
          const chosen = row.querySelector('.ws-x-selected');
          const ok = chosen && chosen.dataset.col === row.dataset.correct;
          if (chosen) {
            chosen.classList.toggle('ws-good-cell', ok);
            chosen.classList.toggle('ws-bad-cell', !ok);
          }
          if (ok) s2++;
        });
        document.getElementById('g4-score-2').textContent = `${s2} / 6 pkt`;
        total += s2;

        // Zad 3 (3 pkt)
        let s3 = 0;
        document.querySelectorAll('[data-g4-z3]').forEach(sel => {
          const ok = sel.value === sel.dataset.g4Z3;
          sel.classList.toggle('ws-good-cell', ok);
          sel.classList.toggle('ws-bad-cell', !ok);
          if (ok) s3++;
        });
        document.getElementById('g4-score-3').textContent = `${s3} / 3 pkt`;
        total += s3;

        // Zad 4 (5 pkt)
        let s4 = 0;
        document.querySelectorAll('[data-g4-z4]').forEach(row => {
          const activeBtn = row.querySelector('.ws-pf-btn.active');
          const ok = activeBtn && activeBtn.dataset.val === row.dataset.correct;
          if (activeBtn) {
            activeBtn.classList.toggle('ws-good-cell', ok);
            activeBtn.classList.toggle('ws-bad-cell', !ok);
          }
          if (ok) s4++;
        });
        document.getElementById('g4-score-4').textContent = `${s4} / 5 pkt`;
        total += s4;

        // Zad 5 (2 pkt)
        let s5 = 0;
        const r5 = document.querySelector('input[name="g4-z5a"]:checked');
        if (r5 && r5.value === 'correct') s5++;
        const osVal = (document.getElementById('g4-z5b')?.value || '').trim().toLowerCase();
        const osOk = /(windows|linux|ubuntu|android|ios|macos|mac os|chrome\s*os|harmony)/i.test(osVal);
        const osInput = document.getElementById('g4-z5b');
        if (osInput) {
          osInput.classList.toggle('ws-good-cell', osOk);
          osInput.classList.toggle('ws-bad-cell', !osOk);
        }
        if (osOk) s5++;
        document.getElementById('g4-score-5').textContent = `${s5} / 2 pkt`;
        total += s5;

        // Zad 6 (2 pkt)
        let s6 = 0;
        document.querySelectorAll('[data-g4-z6]').forEach(sel => {
          const ok = sel.value === sel.dataset.g4Z6;
          sel.classList.toggle('ws-good-cell', ok);
          sel.classList.toggle('ws-bad-cell', !ok);
          if (ok) s6++;
        });
        document.getElementById('g4-score-6').textContent = `${s6} / 2 pkt`;
        total += s6;

        // Zad 7 (4 pkt)
        let s7 = 0;
        document.querySelectorAll('[data-g4-z7]').forEach(sel => {
          const ok = sel.value === sel.dataset.g4Z7;
          sel.classList.toggle('ws-good-cell', ok);
          sel.classList.toggle('ws-bad-cell', !ok);
          if (ok) s7++;
        });
        document.getElementById('g4-score-7').textContent = `${s7} / 4 pkt`;
        total += s7;

        // Zad 8 (2 pkt)
        let s8 = 0;
        document.querySelectorAll('[data-g4-z8]').forEach(sel => {
          const ok = sel.value === sel.dataset.g4Z8;
          sel.classList.toggle('ws-good-cell', ok);
          sel.classList.toggle('ws-bad-cell', !ok);
          if (ok) s8++;
        });
        document.getElementById('g4-score-8').textContent = `${s8} / 2 pkt`;
        total += s8;

        // Zad 9 (1 pkt)
        let s9 = 0;
        const r9 = document.querySelector('input[name="g4-z9"]:checked');
        if (r9 && r9.value === 'correct') s9 = 1;
        document.getElementById('g4-score-9').textContent = `${s9} / 1 pkt`;
        total += s9;

        const maxPossible = 25;
        const capped = Math.min(total, maxPossible);
        document.getElementById('g4-total-score').textContent = String(capped);
        if (progressFill) progressFill.style.width = `${Math.round((capped / maxPossible) * 100)}%`;
        if (progressLabel) progressLabel.innerHTML = `Twój wynik na karcie pracy: <strong>${capped} / 25 pkt</strong>`;
        const fb = document.getElementById('g4-feedback-box');
        if (fb) {
          fb.innerHTML = `<div class="feedback ${capped >= 20 ? '' : 'error'}">Zdobyte punkty: <strong>${capped} / 25 pkt</strong> (suma ze wszystkich 9 zadań: ${total} pkt). ${capped >= 23 ? '🎉 Wspaniale! Jesteś mistrzem informatyki!' : 'Sprawdź pola podświetlone na czerwono i spróbuj poprawić odpowiedzi.'}</div>`;
        }
        toast(`Sprawdzono kartę pracy: ${capped} / 25 pkt!`);
      };
    }
  }

  // ==========================================================================
  // Logic for Grade 7 HTML Worksheet (Live VS Code + Browser Preview)
  // ==========================================================================
  if (id === 'karta-7-2-1-pierwsza-strona') {
    const editor = document.getElementById('g7-live-editor');
    const titleEl = document.getElementById('g7-browser-title');
    const bodyEl = document.getElementById('g7-browser-body');
    const dlBtn = document.getElementById('g7-download-html');

    function updatePreview() {
      if (!editor || !titleEl || !bodyEl) return;
      const raw = editor.value;
      const titleMatch = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      titleEl.textContent = titleMatch ? titleMatch[1].trim() || 'index.html' : 'index.html';
      const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const bodyHtml = bodyMatch ? bodyMatch[1] : raw;
      const doc = new DOMParser().parseFromString(bodyHtml, 'text/html');
      const allowed = new Set(['H1', 'H2', 'H3', 'P', 'B', 'STRONG', 'I', 'EM', 'UL', 'OL', 'LI', 'BR']);
      bodyEl.innerHTML = '';
      for (const node of [...doc.body.childNodes]) {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.trim()) {
            const span = document.createElement('span');
            span.textContent = node.textContent;
            bodyEl.appendChild(span);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE && allowed.has(node.tagName)) {
          const el = document.createElement(node.tagName.toLowerCase());
          el.textContent = node.textContent;
          bodyEl.appendChild(el);
        }
      }
    }

    if (editor) {
      editor.addEventListener('input', updatePreview);
      updatePreview();
    }

    document.querySelectorAll('[data-g7-preset]').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('[data-g7-preset]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const p = btn.dataset.g7Preset;
        if (p === 'start') {
          editor.value = STARTER_HTML_CODE;
        } else if (p === 'exp') {
          editor.value = `<!DOCTYPE html>\n<html lang="pl">\n<head>\n  <meta charset="UTF-8">\n  <title>Piłka nożna i gry</title>\n</head>\n<body>\n  <h1>Moja pasja: Piłka nożna</h1>\n  <p>Lubię grać na boisku z przyjaciółmi.</p>\n  <p>Trenuję trzy razy w tygodniu i kibicuję ulubionej drużynie.</p>\n</body>\n</html>`;
        } else if (p === 'bonus') {
          editor.value = `<!DOCTYPE html>\n<html lang="pl">\n<head>\n  <meta charset="UTF-8">\n  <title>Piłka nożna i gry</title>\n</head>\n<body>\n  <h1>Moja pasja: Piłka nożna</h1>\n  <p>Lubię grać na boisku z przyjaciółmi.</p>\n  <p>Trenuję trzy razy w tygodniu.</p>\n  <h2>Moje polecenie</h2>\n  <p>Polecam każdemu ruch na świeżym powietrzu!</p>\n</body>\n</html>`;
        }
        updatePreview();
      };
    });

    if (dlBtn && editor) {
      dlBtn.onclick = () => {
        const blob = new Blob([editor.value], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        toast('Pobrano plik index.html!');
      };
    }
  }

  // ==========================================================================
  // Logic for Grade 8 Kosztorys Balu Simulator
  // ==========================================================================
  if (id === 'karta-8-1-kosztorys-balu') {
    const page = document.getElementById('bal-sim-page');
    const ribbon = document.getElementById('bal-sim-ribbon');
    const tabs = [...document.querySelectorAll('[data-bal-sim]')];
    const items = [
      ['Balony z helem (paczka)', 35, 4],
      ['Fotobudka (godz.)', 250, 3],
      ['Napoje i soki (zgrzewka)', 28, 6],
      ['Przekąski słone (kg)', 22.5, 8],
      ['Wynajem nagłośnienia (zestaw)', 450, 1]
    ];
    const fmtZl = n => n.toFixed(2).replace('.', ',') + ' zł';

    function renderBalSim(step) {
      const s = Number(step);
      tabs.forEach(t => t.classList.toggle('active', t.dataset.balSim === String(s)));
      const ribbons = {
        1: '📍 <strong>Krok 1–2:</strong> Przepisane dane w A1:C6, obramowanie <em>Wszystkie krawędzie</em> oraz format <strong>Walutowy (zł)</strong>.',
        3: '📍 <strong>Krok 3:</strong> W D2 wpisano <code>=B2*C2</code> i skopiowano do D6. W D7 wpisano <code>=SUMA(D2:D6)</code> → wynik: <strong>1 688,00 zł</strong>.',
        4: '📍 <strong>Krok 4:</strong> W E2 wpisano <code>=JEŻELI(D2&gt;200; "Do akceptacji"; "Zatwierdzone")</code>. Dla Fotobudki (750 zł) i Nagłośnienia (450 zł) pojawia się „Do akceptacji”.',
        5: '📍 <strong>Krok 5:</strong> Formatowanie warunkowe wyróżniło komórki z tekstem <strong>„Do akceptacji”</strong> jasnoczerwonym tłem i ciemnoczerwonym tekstem.',
        6: '📍 <strong>★ Zadanie na 6:</strong> W D8 obliczona średnia <code>=ŚREDNIA(D2:D6)</code> → <strong>337,60 zł</strong>, a w D9 najdroższa pozycja <code>=MAX(D2:D6)</code> → <strong>750,00 zł</strong>.'
      };
      ribbon.innerHTML = ribbons[s];
      page.innerHTML = `
        <div class="ws-word-sheet">
          <table class="ws-excel-grid">
            <thead>
              <tr><th class="ws-excel-corner"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>
            </thead>
            <tbody>
              <tr class="ws-excel-row-head">
                <td class="ws-excel-rownum">1</td>
                <td><strong>Pozycja</strong></td><td><strong>Cena jedn. (zł)</strong></td><td><strong>Ilość</strong></td><td><strong>Razem (zł)</strong></td><td><strong>Status</strong></td>
              </tr>
              ${items.map(([name, price, qty], idx) => {
                const total = price * qty;
                const status = total > 200 ? 'Do akceptacji' : 'Zatwierdzone';
                const condClass = s >= 5 && status === 'Do akceptacji' ? 'ws-cond-red' : '';
                return `
                  <tr>
                    <td class="ws-excel-rownum">${idx + 2}</td>
                    <td>${name}</td>
                    <td class="ws-num-cell">${fmtZl(price)}</td>
                    <td class="ws-center-cell">${qty}</td>
                    <td class="ws-num-cell">${s >= 3 ? `<strong>${fmtZl(total)}</strong> <small class="muted">(=B${idx + 2}*C${idx + 2})</small>` : '—'}</td>
                    <td class="ws-center-cell ${condClass}">${s >= 4 ? status : '—'}</td>
                  </tr>`;
              }).join('')}
              <tr>
                <td class="ws-excel-rownum">7</td>
                <td colspan="3"><strong>SUMA:</strong></td>
                <td class="ws-num-cell">${s >= 3 ? '<strong>1 688,00 zł</strong> <small class="muted">(=SUMA(D2:D6))</small>' : '—'}</td>
                <td></td>
              </tr>
              ${s === 6 ? `
                <tr class="ws-sim-new-row">
                  <td class="ws-excel-rownum">8</td>
                  <td colspan="3"><strong>Średni wydatek (Zadanie na 6):</strong></td>
                  <td class="ws-num-cell"><strong>337,60 zł</strong> <small>(=ŚREDNIA(D2:D6))</small></td>
                  <td></td>
                </tr>
                <tr class="ws-sim-new-row">
                  <td class="ws-excel-rownum">9</td>
                  <td colspan="3"><strong>Najdroższa pozycja (Zadanie na 6):</strong></td>
                  <td class="ws-num-cell"><strong>750,00 zł</strong> <small>(=MAX(D2:D6))</small></td>
                  <td></td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>`;
    }
    tabs.forEach(t => { t.onclick = () => renderBalSim(t.dataset.balSim); });
    renderBalSim(1);
  }

  // ==========================================================================
  // Logic for Grade 8 Rentowność w MS Excel (Formula Checker + Simulator)
  // ==========================================================================
  if (id === 'karta-8-1-rentownosc-excel') {
    const cleanF = s => (s || '').trim().replace(/^=+/, '').replace(/\s+/g, '').toUpperCase();
    const validators = {
      F2: v => /^(D2\*E2|E2\*D2)$/.test(cleanF(v)),
      D8: v => /^SUMA\(D2:D7\)$/.test(cleanF(v)),
      F8: v => /^SUMA\(F2:F7\)$/.test(cleanF(v)),
      C13: v => /^(F8\*\(1\+\$C\$11\)|\(1\+\$C\$11\)\*F8)$/.test(cleanF(v)),
      C15: v => /^JE[ŻZ]ELI\(C14>=0;[""„”']RENTOWNY[""„”'];[""„”']STRATA[""„”']\)$/.test(cleanF(v)),
      LICZ: v => /^LICZ\.JE[ŻZ]ELI\(\$?B\$?2:\$?B\$?7;[""„”']MECHANIKA[""„”']\)$/.test(cleanF(v)),
      SUMAJ: v => /^SUMA\.JE[ŻZ]ELI\(\$?B\$?2:\$?B\$?7;[""„”']MECHANIKA[""„”'];\$?F\$?2:\$?F\$?7\)$/.test(cleanF(v))
    };

    const checkBtn = document.getElementById('rent-check-formulas');
    const sampleBtn = document.getElementById('rent-fill-sample');
    const fb = document.getElementById('rent-formula-feedback');

    if (checkBtn) {
      checkBtn.onclick = () => {
        const inputs = [...document.querySelectorAll('[data-rent-formula]')];
        let good = 0;
        inputs.forEach(inp => {
          const key = inp.dataset.rentFormula;
          const ok = validators[key]?.(inp.value);
          inp.classList.toggle('ws-good-cell', !!ok);
          inp.classList.toggle('ws-bad-cell', !ok);
          if (ok) good++;
        });
        if (fb) {
          fb.innerHTML = `<div class="feedback ${good === inputs.length ? '' : 'error'}">${good === inputs.length ? '✓ Brawo! Wszystkie 6 formuł zostało zapisanych bezbłędnie!' : `Poprawne formuły: <strong>${good} z ${inputs.length}</strong>. Pamiętaj o znaku <code>$</code> w <code>$C$11</code>, średnikach <code>;</code> oraz cudzysłowach wokół tekstów <code>"RENTOWNY"</code> i <code>"Mechanika"</code>.`}</div>`;
        }
      };
    }

    if (sampleBtn) {
      sampleBtn.onclick = () => {
        const samples = {
          F2: 'D2*E2',
          D8: 'SUMA(D2:D7)',
          F8: 'SUMA(F2:F7)',
          C13: 'F8*(1+$C$11)',
          C15: 'JEŻELI(C14>=0;"RENTOWNY";"STRATA")',
          LICZ: 'LICZ.JEŻELI(B2:B7;"Mechanika")',
          SUMAJ: 'SUMA.JEŻELI(B2:B7;"Mechanika";F2:F7)'
        };
        document.querySelectorAll('[data-rent-formula]').forEach(inp => {
          inp.value = samples[inp.dataset.rentFormula] || '';
          inp.classList.remove('ws-bad-cell');
          inp.classList.add('ws-good-cell');
        });
        toast('Wstawiono wzorcowe formuły — przeanalizuj ich budowę!');
      };
    }

    const simPage = document.getElementById('rent-sim-page');
    const simTabs = [...document.querySelectorAll('[data-rent-sim]')];
    function renderRentSim(mode) {
      simTabs.forEach(t => t.classList.toggle('active', t.dataset.rentSim === mode));
      if (mode === 'main') {
        simPage.innerHTML = `
          <div class="ws-word-sheet">
            <table class="ws-excel-grid">
              <thead><tr><th class="ws-excel-corner"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr></thead>
              <tbody>
                <tr class="ws-excel-row-head"><td class="ws-excel-rownum">1</td><td>ID</td><td>Dział</td><td>Nazwa usługi</td><td>Wykonano</td><td>Cena netto</td><td>Wartość netto</td></tr>
                <tr><td class="ws-excel-rownum">2</td><td>1</td><td>Mechanika</td><td>Wymiana klocków hamulcowych</td><td class="ws-num-cell">6</td><td class="ws-num-cell">120,00 zł</td><td class="ws-num-cell"><strong>720,00 zł</strong> <small class="muted">(=D2*E2)</small></td></tr>
                <tr><td class="ws-excel-rownum">3</td><td>2</td><td>Eksploatacja</td><td>Serwis olejowo-filtrowy</td><td class="ws-num-cell">8</td><td class="ws-num-cell">150,00 zł</td><td class="ws-num-cell"><strong>1 200,00 zł</strong> <small class="muted">(=D3*E3)</small></td></tr>
                <tr><td class="ws-excel-rownum">4</td><td>3</td><td>Mechanika</td><td>Wymiana rozrządu</td><td class="ws-num-cell">2</td><td class="ws-num-cell">650,00 zł</td><td class="ws-num-cell"><strong>1 300,00 zł</strong> <small class="muted">(=D4*E4)</small></td></tr>
                <tr><td class="ws-excel-rownum">5</td><td>4</td><td>Diagnostyka</td><td>Diagnostyka komputerowa OBD</td><td class="ws-num-cell">5</td><td class="ws-num-cell">100,00 zł</td><td class="ws-num-cell"><strong>500,00 zł</strong> <small class="muted">(=D5*E5)</small></td></tr>
                <tr><td class="ws-excel-rownum">6</td><td>5</td><td>Mechanika</td><td>Wymiana pompy paliwa</td><td class="ws-num-cell">3</td><td class="ws-num-cell">250,00 zł</td><td class="ws-num-cell"><strong>750,00 zł</strong> <small class="muted">(=D6*E6)</small></td></tr>
                <tr><td class="ws-excel-rownum">7</td><td>6</td><td>Zawieszenie</td><td>Geometria zawieszenia 3D</td><td class="ws-num-cell">4</td><td class="ws-num-cell">180,00 zł</td><td class="ws-num-cell"><strong>720,00 zł</strong> <small class="muted">(=D7*E7)</small></td></tr>
                <tr class="ws-sim-new-row"><td class="ws-excel-rownum">8</td><td colspan="3" style="text-align:right"><strong>SUMA DZIENNA:</strong></td><td class="ws-num-cell"><strong>28</strong> <small>(=SUMA(D2:D7))</small></td><td class="ws-center-cell">—</td><td class="ws-num-cell"><strong>5 190,00 zł</strong> <small>(=SUMA(F2:F7))</small></td></tr>
              </tbody>
            </table>
          </div>`;
      } else if (mode === 'params') {
        simPage.innerHTML = `
          <div class="ws-word-sheet">
            <table class="ws-excel-grid">
              <thead><tr><th class="ws-excel-corner"></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead>
              <tbody>
                <tr class="ws-excel-row-head"><td class="ws-excel-rownum">10</td><td>PAR</td><td>Wskaźnik finansowy</td><td>Wartość w arkuszu</td><td>Zastosowana formuła</td></tr>
                <tr><td class="ws-excel-rownum">11</td><td>VAT</td><td>Stawka podatku VAT</td><td class="ws-num-cell"><strong>23%</strong></td><td><code>0,23</code> (Format Procentowy)</td></tr>
                <tr><td class="ws-excel-rownum">12</td><td>KOSZT</td><td>Dzienny koszt stały warsztatu</td><td class="ws-num-cell"><strong>5 500,00 zł</strong></td><td>Stała wartość</td></tr>
                <tr><td class="ws-excel-rownum">13</td><td>BRUTTO</td><td>Łączny przychód warsztatu brutto</td><td class="ws-num-cell"><strong>6 383,70 zł</strong></td><td><code>=F8*(1+$C$11)</code></td></tr>
                <tr><td class="ws-excel-rownum">14</td><td>WYNIK</td><td>Wynik finansowy netto/dzień</td><td class="ws-num-cell"><strong>883,70 zł</strong></td><td><code>=C13-C12</code></td></tr>
                <tr class="ws-sim-new-row"><td class="ws-excel-rownum">15</td><td>STATUS</td><td>Ocena rentowności (czy wynik &gt;= 0)</td><td class="ws-center-cell"><strong>RENTOWNY</strong></td><td><code>=JEŻELI(C14&gt;=0;"RENTOWNY";"STRATA")</code></td></tr>
              </tbody>
            </table>
          </div>`;
      } else {
        simPage.innerHTML = `
          <div class="ws-word-sheet">
            <table class="ws-excel-grid">
              <thead><tr><th class="ws-excel-corner"></th><th>B</th><th>C</th><th>D</th></tr></thead>
              <tbody>
                <tr><td class="ws-excel-rownum">17</td><td>1. Średnia cena katalogowa usługi (E2:E7)</td><td class="ws-num-cell"><strong>241,67 zł</strong></td><td><code>=ŚREDNIA(E2:E7)</code></td></tr>
                <tr><td class="ws-excel-rownum">18</td><td>2. Liczba zrealizowanych pozycji z działu "Mechanika"</td><td class="ws-num-cell"><strong>3</strong></td><td><code>=LICZ.JEŻELI(B2:B7;"Mechanika")</code></td></tr>
                <tr><td class="ws-excel-rownum">19</td><td>3. Łączny przychód netto działu "Mechanika"</td><td class="ws-num-cell"><strong>2 770,00 zł</strong></td><td><code>=SUMA.JEŻELI(B2:B7;"Mechanika";F2:F7)</code></td></tr>
              </tbody>
            </table>
          </div>`;
      }
    }
    simTabs.forEach(t => { t.onclick = () => renderRentSim(t.dataset.rentSim); });
    renderRentSim('main');
  }

  // ==========================================================================
  // Logic for Grade 8 Pivot Tables Worksheet
  // ==========================================================================
  if (id === 'karta-8-1-tabele-przestawne') {
    const dlXlsxBtn = document.getElementById('piv-download-xlsx');
    if (dlXlsxBtn) {
      dlXlsxBtn.onclick = () => downloadPrawoJazdyXlsx(toast);
    }

    let cachedCsvRows = null;
    async function loadCsvRows() {
      if (cachedCsvRows) return cachedCsvRows;
      try {
        const res = await fetch('./prawo-jazdy.csv');
        const txt = await res.text();
        cachedCsvRows = txt.trim().split(/\r?\n/).map(line => line.split(','));
        return cachedCsvRows;
      } catch {
        return null;
      }
    }

    const copyCsvTsvBtn = document.getElementById('piv-copy-csv-tsv');
    if (copyCsvTsvBtn) {
      copyCsvTsvBtn.onclick = async () => {
        const rows = await loadCsvRows();
        if (rows && rows.length > 1) {
          const tsv = rows.map(r => r.join('\t')).join('\n');
          copyText(tsv, toast);
        } else {
          toast('Pobierz plik prawo-jazdy.xlsx przyciskiem obok!');
        }
      };
    }

    const toggleRawBtn = document.getElementById('piv-toggle-raw');
    const rawPreview = document.getElementById('piv-raw-preview');
    const rawTableWrap = document.getElementById('piv-raw-table-wrap');
    const rawSearch = document.getElementById('piv-raw-search');

    function renderRawTable(rows, query = '') {
      if (!rawTableWrap || !rows || !rows.length) return;
      const q = query.trim().toLowerCase();
      const bodyRows = rows.slice(1).filter(r => !q || r.some(c => c.toLowerCase().includes(q)));
      rawTableWrap.innerHTML = `
        <table class="ws-excel-grid">
          <thead>
            <tr>
              <th class="ws-excel-corner">Wiersz</th>
              <th>A: Województwo</th>
              <th>B: Miasto</th>
              <th>C: Data</th>
              <th>D: Liczba zdanych egzaminów (kobiety)</th>
              <th>E: Liczba zdanych egzaminów (mężczyźni)</th>
            </tr>
          </thead>
          <tbody>
            ${bodyRows.slice(0, 150).map((r, idx) => `
              <tr>
                <td class="ws-excel-rownum">${idx + 2}</td>
                <td>${r[0] || ''}</td>
                <td><strong>${r[1] || ''}</strong></td>
                <td class="ws-center-cell">${r[2] || ''}</td>
                <td class="ws-num-cell">${r[3] || ''}</td>
                <td class="ws-num-cell">${r[4] || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p class="ws-subnote" style="margin:6px 0 0">Wyświetlono ${Math.min(bodyRows.length, 150)} z ${bodyRows.length} pasujących rekordów (w całym pliku <code>prawo-jazdy.xlsx</code> jest 500 wierszy danych).</p>
      `;
    }

    if (toggleRawBtn && rawPreview) {
      toggleRawBtn.onclick = async () => {
        const isHidden = rawPreview.hasAttribute('hidden');
        if (isHidden) {
          rawPreview.removeAttribute('hidden');
          toggleRawBtn.textContent = '🙈 Ukryj podgląd bazy danych Arkusz1';
          const rows = await loadCsvRows();
          if (rows) renderRawTable(rows, rawSearch?.value || '');
        } else {
          rawPreview.setAttribute('hidden', '');
          toggleRawBtn.textContent = '👁️ Podgląd bazy danych Arkusz1 na stronie (500 wierszy)';
        }
      };
    }

    if (rawSearch) {
      rawSearch.oninput = async () => {
        const rows = await loadCsvRows();
        if (rows) renderRawTable(rows, rawSearch.value);
      };
    }

    document.querySelectorAll('[data-piv-ans]').forEach(inp => {
      const k = 'piv_' + inp.dataset.pivAns;
      inp.value = state[k] || '';
      inp.addEventListener('input', () => {
        state[k] = inp.value;
        saveState();
      });
    });

    // Walidacja Karty odpowiedzi Detektywa Danych na podstawie prawo-jazdy.xlsx
    const norm = s => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
    const hasNum = (s, n) => norm(s).replace(/\s/g, '').includes(String(n));
    const pivValidators = {
      'm1-k-max': v => norm(v).includes('lubelskie') && (hasNum(v, 5183) || !/\d/.test(v)),
      'm1-k-min': v => (norm(v).includes('świętokrzyskie') || norm(v).includes('swietokrzyskie')) && (hasNum(v, 841) || !/\d/.test(v)),
      'm1-m-max': v => norm(v).includes('lubelskie') && (hasNum(v, 5392) || !/\d/.test(v)),
      'm1-m-min': v => norm(v).includes('podlaskie') && (hasNum(v, 1181) || !/\d/.test(v)),
      'm1-sum-k': v => hasNum(v, 38546),
      'm1-sum-m': v => hasNum(v, 42053),
      'm2-city': v => norm(v).includes('toruń') || norm(v).includes('torun'),
      'm2-count': v => hasNum(v, 31),
      'm2-max-k': v => norm(v).includes('szczecin') && (hasNum(v, 2597) || !/\d/.test(v)),
      'm2-max-m': v => norm(v).includes('szczecin') && (hasNum(v, 2700) || !/\d/.test(v)),
      'm3-mal-cities': v => (norm(v).includes('kraków') || norm(v).includes('krakow')) && (norm(v).includes('tarnów') || norm(v).includes('tarnow')) && norm(v).includes('zakopane'),
      'm3-mal-rec': v => norm(v).includes('zakopane') || hasNum(v, 2038),
      'm3-lub-city': v => norm(v).includes('biała podlaska') || norm(v).includes('biala podlaska'),
      'm3-lub-rec': v => hasNum(v, 2699)
    };

    const checkAnsBtn = document.getElementById('piv-check-answers');
    const fillSampleBtn = document.getElementById('piv-fill-sample');
    const checkFb = document.getElementById('piv-check-feedback');

    if (checkAnsBtn) {
      checkAnsBtn.onclick = () => {
        const inputs = [...document.querySelectorAll('[data-piv-ans]')];
        let good = 0;
        inputs.forEach(inp => {
          const ok = pivValidators[inp.dataset.pivAns]?.(inp.value);
          inp.classList.toggle('ws-good-cell', !!ok);
          inp.classList.toggle('ws-bad-cell', !ok);
          if (ok) good++;
        });
        if (checkFb) {
          checkFb.innerHTML = `<div class="feedback ${good === inputs.length ? '' : 'error'}">${
            good === inputs.length
              ? '🎉 Brawo Detektywie Danych! Wszystkie 14 odpowiedzi zgadza się w 100% z bazą danych prawo-jazdy.xlsx!'
              : `Poprawne odpowiedzi: <strong>${good} z ${inputs.length}</strong>. Pola podświetlone na czerwono wymagają poprawy — możesz porównać swoją tabelę przestawną z podglądem wyników w Pomocniku powyżej.`
          }</div>`;
        }
        toast(`Sprawdzono Kartę Detektywa: ${good} / ${inputs.length} poprawnych!`);
      };
    }

    if (fillSampleBtn) {
      fillSampleBtn.onclick = () => {
        const samples = {
          'm1-k-max': 'lubelskie (5183)',
          'm1-k-min': 'świętokrzyskie (841)',
          'm1-m-max': 'lubelskie (5392)',
          'm1-m-min': 'podlaskie (1181)',
          'm1-sum-k': '38 546',
          'm1-sum-m': '42 053',
          'm2-city': 'Toruń',
          'm2-count': '31',
          'm2-max-k': 'Szczecin (2597)',
          'm2-max-m': 'Szczecin (2700)',
          'm3-mal-cities': 'Kraków, Tarnów, Zakopane',
          'm3-mal-rec': 'Zakopane (2038)',
          'm3-lub-city': 'Biała Podlaska',
          'm3-lub-rec': '2699'
        };
        document.querySelectorAll('[data-piv-ans]').forEach(inp => {
          const key = inp.dataset.pivAns;
          inp.value = samples[key] || '';
          state['piv_' + key] = inp.value;
          inp.classList.remove('ws-bad-cell');
          inp.classList.add('ws-good-cell');
        });
        saveState();
        toast('Wstawiono wzorcowe wyniki wyliczone z pliku prawo-jazdy.xlsx!');
      };
    }

    const pivPage = document.getElementById('piv-sim-page');
    const pivTabs = [...document.querySelectorAll('[data-piv-sim]')];
    function renderPivSim(mission) {
      const m = String(mission);
      pivTabs.forEach(t => t.classList.toggle('active', t.dataset.pivSim === m));
      const configs = {
        '1': {
          filtry: '— (puste)',
          kolumny: '∑ Wartości',
          wiersze: '🏷️ Województwo',
          wartosci: '∑ Suma z Liczba zdanych egzaminów (kobiety)<br>∑ Suma z Liczba zdanych egzaminów (mężczyźni)',
          tip: 'Kliknij PPM na liczbie w kolumnie kobiet → Sortuj → Sortuj od największych do najmniejszych.',
          tableHtml: `
            <h4 style="margin:14px 0 8px;color:#14532d">📊 Wynikowa Tabela Przestawna w Excelu dla Misji 1 (posortowana malejąco wg kobiet):</h4>
            <div class="ws-table-wrap" style="max-height:260px;overflow-y:auto">
              <table class="ws-excel-grid">
                <thead>
                  <tr><th>Etykiety wierszy (Województwo)</th><th>Suma z Liczba zdanych egzaminów (kobiety)</th><th>Suma z Liczba zdanych egzaminów (mężczyźni)</th></tr>
                </thead>
                <tbody>
                  ${PRAWO_JAZDY_STATS.byWoj.map(([woj, k, men], idx) => `
                    <tr class="${idx === 0 || idx === PRAWO_JAZDY_STATS.byWoj.length - 1 || woj === 'podlaskie' ? 'ws-sim-new-row' : ''}">
                      <td><strong>${woj}</strong> ${idx === 0 ? '🏆 (MAX kobiety i mężczyźni)' : woj === 'świętokrzyskie' ? '⬇️ (MIN kobiety)' : woj === 'podlaskie' ? '⬇️ (MIN mężczyźni)' : ''}</td>
                      <td class="ws-num-cell"><strong>${k}</strong></td>
                      <td class="ws-num-cell"><strong>${men}</strong></td>
                    </tr>
                  `).join('')}
                  <tr style="background:#dcfce7;font-weight:700">
                    <td><strong>Suma końcowa</strong></td>
                    <td class="ws-num-cell"><strong>${PRAWO_JAZDY_STATS.totalK}</strong></td>
                    <td class="ws-num-cell"><strong>${PRAWO_JAZDY_STATS.totalM}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>`
        },
        '2': {
          filtry: '— (puste)',
          kolumny: '∑ Wartości',
          wiersze: '🏷️ Miasto',
          wartosci: '🔢 <strong>Liczba z Miasto</strong> (przeciągnij Miasto drugi raz!)<br>∑ Suma z Liczba zdanych egzaminów (kobiety)<br>∑ Suma z Liczba zdanych egzaminów (mężczyźni)',
          tip: 'Ponieważ „Miasto” to tekst, po wrzuceniu do okienka Wartości Excel automatycznie ustawia „Liczba z Miasto” i zlicza raporty!',
          tableHtml: `
            <h4 style="margin:14px 0 8px;color:#14532d">📊 Wynikowa Tabela Przestawna w Excelu dla Misji 2 (24 miasta, posortowane wg Liczba z Miasto):</h4>
            <div class="ws-table-wrap" style="max-height:260px;overflow-y:auto">
              <table class="ws-excel-grid">
                <thead>
                  <tr><th>Etykiety wierszy (Miasto)</th><th>Liczba z Miasto (raporty)</th><th>Suma z Liczba zdanych egzaminów (kobiety)</th><th>Suma z Liczba zdanych egzaminów (mężczyźni)</th></tr>
                </thead>
                <tbody>
                  ${PRAWO_JAZDY_STATS.byCity.map(([city, cnt, k, men]) => `
                    <tr class="${city === 'Toruń' || city === 'Szczecin' ? 'ws-sim-new-row' : ''}">
                      <td><strong>${city}</strong> ${city === 'Toruń' ? '🏆 (Najwięcej raportów: 31)' : city === 'Szczecin' ? '🏆 (MAX kobiety: 2597 i MAX mężczyźni: 2700)' : ''}</td>
                      <td class="ws-center-cell"><strong>${cnt}</strong></td>
                      <td class="ws-num-cell"><strong>${k}</strong></td>
                      <td class="ws-num-cell"><strong>${men}</strong></td>
                    </tr>
                  `).join('')}
                  <tr style="background:#dcfce7;font-weight:700">
                    <td><strong>Suma końcowa</strong></td>
                    <td class="ws-center-cell"><strong>${PRAWO_JAZDY_STATS.totalRows}</strong></td>
                    <td class="ws-num-cell"><strong>${PRAWO_JAZDY_STATS.totalK}</strong></td>
                    <td class="ws-num-cell"><strong>${PRAWO_JAZDY_STATS.totalM}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>`
        },
        '3': {
          filtry: '🔎 <strong>Województwo</strong> (wybierz w B1: <code>małopolskie</code>, a potem <code>lubelskie</code>)',
          kolumny: '∑ Wartości',
          wiersze: '🏷️ Miasto',
          wartosci: '∑ Suma z Liczba zdanych egzaminów (kobiety)<br>∑ Suma z Liczba zdanych egzaminów (mężczyźni)',
          tip: 'W komórce B1 nad tabelą przestawną klikaj strzałkę filtru i przełączaj między województwem małopolskim a lubelskim.',
          tableHtml: `
            <div class="ws-grid-2" style="margin-top:14px">
              <div>
                <h4 style="margin:0 0 6px;color:#14532d">🔎 Filtr B1: Województwo = <code>małopolskie</code></h4>
                <table class="ws-excel-grid">
                  <thead><tr><th>Miasto</th><th>Suma (kobiety)</th><th>Suma (mężczyźni)</th></tr></thead>
                  <tbody>
                    <tr class="ws-sim-new-row"><td><strong>Zakopane</strong> 🏆</td><td class="ws-num-cell"><strong>2038</strong></td><td class="ws-num-cell">2353</td></tr>
                    <tr><td><strong>Tarnów</strong></td><td class="ws-num-cell">1461</td><td class="ws-num-cell">1556</td></tr>
                    <tr><td><strong>Kraków</strong></td><td class="ws-num-cell">1009</td><td class="ws-num-cell">1459</td></tr>
                    <tr style="background:#dcfce7;font-weight:700"><td>Suma końcowa</td><td class="ws-num-cell">4508</td><td class="ws-num-cell">5368</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h4 style="margin:0 0 6px;color:#14532d">🔎 Filtr B1: Województwo = <code>lubelskie</code></h4>
                <table class="ws-excel-grid">
                  <thead><tr><th>Miasto</th><th>Suma (kobiety)</th><th>Suma (mężczyźni)</th></tr></thead>
                  <tbody>
                    <tr class="ws-sim-new-row"><td><strong>Biała Podlaska</strong> 🏆</td><td class="ws-num-cell">1907</td><td class="ws-num-cell"><strong>2699</strong></td></tr>
                    <tr><td><strong>Zamość</strong></td><td class="ws-num-cell">1938</td><td class="ws-num-cell">1625</td></tr>
                    <tr><td><strong>Lublin</strong></td><td class="ws-num-cell">1338</td><td class="ws-num-cell">1068</td></tr>
                    <tr style="background:#dcfce7;font-weight:700"><td>Suma końcowa</td><td class="ws-num-cell">5183</td><td class="ws-num-cell">5392</td></tr>
                  </tbody>
                </table>
              </div>
            </div>`
        }
      }[m];

      pivPage.innerHTML = `
        <div class="ws-word-sheet">
          <p style="margin:0 0 12px;font-weight:700;color:#15803d">Układ 4 dolnych okienek w panelu „Pola tabeli przestawnej” (Misja ${m}):</p>
          <div class="ws-grid-2" style="margin-bottom:10px">
            <div class="ws-piv-box"><strong>🔽 FILTRY</strong><div>${configs.filtry}</div></div>
            <div class="ws-piv-box"><strong>📊 KOLUMNY</strong><div>${configs.kolumny}</div></div>
            <div class="ws-piv-box"><strong>📋 WIERSZE</strong><div>${configs.wiersze}</div></div>
            <div class="ws-piv-box"><strong>∑ WARTOŚCI</strong><div>${configs.wartosci}</div></div>
          </div>
          <p class="ws-subnote" style="margin:0">💡 <strong>Wskazówka:</strong> ${configs.tip}</p>
          ${configs.tableHtml}
        </div>`;
    }
    pivTabs.forEach(t => { t.onclick = () => renderPivSim(t.dataset.pivSim); });
    renderPivSim(1);
  }
}
