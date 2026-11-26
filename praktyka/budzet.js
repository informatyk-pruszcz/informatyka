// Współczynniki odwołań B1:B13. Inne sposoby rozwiązania kierujemy do próby w Excelu.
function coefficients(source) {
  if (typeof source !== 'string' || source.length > 250) return null;
  const text = source.toUpperCase().replace(/[\s$]/g, '').replace(/^=/, '');
  const tokens = text.match(/SUMA?|B\d+|\d+(?:\.\d+)?|[-+():,;]/g) || [];
  if (!tokens.length || tokens.join('') !== text) return null;
  const values = Array(14).fill(0);
  let i = 0;
  function row() {
    const address = tokens[i++] || '';
    if (!/^B(?:[1-9]|1[0-3])$/.test(address)) throw Error();
    return Number(address.slice(1));
  }
  function term(sign, allowRange) {
    const token = tokens[i];
    if (token === '+' || token === '-') {
      i++;
      term(token === '-' ? -sign : sign, allowRange);
    } else if (token === '(' || token === 'SUM' || token === 'SUMA') {
      const sum = token !== '(';
      if (sum) i++;
      if (tokens[i++] !== '(') throw Error();
      expression(sign, sum);
      while (sum && [',',';'].includes(tokens[i])) { i++; expression(sign, true); }
      if (tokens[i++] !== ')') throw Error();
    } else if (token?.startsWith('B')) {
      const first = row();
      let last = first;
      if (allowRange && tokens[i] === ':') {
        i++; last = row();
        if (![',',';',')'].includes(tokens[i])) throw Error();
      }
      for (let n = Math.min(first, last); n <= Math.max(first, last); n++) values[n] += sign;
    } else if (token && /^\d/.test(token)) values[0] += Number(tokens[i++]) * sign;
    else throw Error();
  }
  function expression(sign, allowRange) {
    term(sign, allowRange);
    while (tokens[i] === '+' || tokens[i] === '-') {
      const operator = tokens[i++];
      term(operator === '+' ? sign : -sign, false);
    }
  }
  try { expression(1, false); return i === tokens.length ? values : null; }
  catch { return null; }
}
function agrees(formula, plus, minus = []) {
  return formula.every((v, row) => v === Number(plus.includes(row)) - Number(minus.includes(row)));
}
function substitute(formula, row, inputs) {
  for (const input of inputs) formula[input] += formula[row];
  formula[row] = 0;
}
function result(code, message) { return {code, message}; }

export function inspectBudget(book) {
  const tab = book.SheetNames.map(n => book.Sheets[n]).find(s => String(s?.A1?.v || '').trim().toLowerCase() === 'budżet klubu');
  if (!tab) return result('file', 'Wybierz swoją kopię budżetu klubu z tej karty.');
  if (!tab.B11?.f) return result('constant', 'W B11 brakuje formuły. Spójrz na pasek formuły i połącz cztery wydatki z B7 do B10. Zapisz i spróbuj ponownie.');
  if (!tab.B5?.f || !tab.B13?.f) return result('balance', 'Sprawdź formuły w B5 i B13. Wpływy i saldo mają się zmieniać razem z kwotami.');
  const income = [2,3,4], costs = [7,8,9,10];
  const received = coefficients(tab.B5.f), spent = coefficients(tab.B11.f), balance = coefficients(tab.B13.f);
  if (!received || !spent || !balance) return result('manual', 'Ten zapis sprawdź w Excelu. Zwiększaj kolejno każdy wydatek o 1 zł i cofaj zmianę. Za każdym razem porównaj sumę i saldo. Pokaż swój sposób nauczycielowi.');
  if (!agrees(spent, costs)) return result('range', 'Sprawdź zakres w B11. Każda cena z B7, B8, B9 i B10 powinna wejść do sumy dokładnie raz.');
  if (!agrees(received, income)) return result('income', 'Wydatki są dobrze połączone. Sprawdź, czy B5 sumuje wszystkie trzy wpłaty.');
  substitute(balance, 5, income); substitute(balance, 11, costs);
  if (!agrees(balance, income, costs)) return result('balance', 'Sumy działają. Sprawdź w B13, czy od wpływów odejmujesz wydatki.');
  const cells = [...income, ...costs].map(row => tab['B' + row]);
  if (cells.some(c => c?.t !== 'n' || !Number.isFinite(c.v))) return result('data', 'Formuły są powiązane. Sprawdź, czy każda wpłata i cena jest liczbą.');
  const [fee, collection, bonus, materials, paper, tape, envelopes] = cells.map(c => c.v);
  if (fee !== 50 || collection !== 15 || bonus !== 5 || tape !== 12 || envelopes !== 8)
    return result('data', 'Formuły są powiązane. Porównaj wpłaty oraz ceny taśmy i kopert z plikiem startowym. W zadaniu zmieniasz materiały i papier.');
  if (materials !== 30) return result('first', 'Formuły działają. Podnieś cenę materiałów w B7 do 30 zł i odczytaj saldo. Czy wystarczy na bilet za 10 zł?');
  if (paper !== 8) return result('second', 'Pierwsza cena jest zmieniona. Odczytaj saldo, zmień cenę papieru w B8 na 8 zł, zapisz i sprawdź ponownie.');
  return result('ok', 'Gotowe. Formuły łączą wszystkie kwoty. Przy tych cenach saldo wynosi 12 zł. Wskaż lub wyjaśnij, dlaczego teraz wystarczy na bilet za 10 zł.');
}
