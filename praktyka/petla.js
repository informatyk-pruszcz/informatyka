import {goals, startingProgram, traceProgram, validProgram} from './trasa.js';

function numberOptions(selected) {
  return Array.from({length:8}, (_, i) => '<option' + (i+1 === selected ? ' selected' : '') + '>' + (i+1) + '</option>').join('');
}
function drawing(goal, points) {
  const xs = [0, goal.width, ...points.map(p=>p[0])], ys = [0, goal.height, ...points.map(p=>p[1])];
  const minX = Math.min(...xs)-1, minY = Math.min(...ys)-1;
  const box = [minX,minY,Math.max(...xs)-minX+1,Math.max(...ys)-minY+1].join(' ');
  const [endX,endY] = points[points.length-1];
  return '<svg viewBox="' + box + '" role="img" aria-label="Obrys figury i ślad robota. Opis trasy jest pod planszą.">' +
    '<defs><pattern id="loop-grid" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M 0 1 V 0 H 1" fill="none" stroke="var(--line)" stroke-width=".035"/></pattern></defs>' +
    '<rect x="' + minX + '" y="' + minY + '" width="100%" height="100%" fill="url(#loop-grid)"/>' +
    '<rect class="loop-goal" width="' + goal.width + '" height="' + goal.height + '" fill="none" stroke-dasharray=".21 .12" stroke-width=".13"/>' +
    '<polyline class="loop-trace" points="' + points.map(p=>p.join(',')).join(' ') + '" fill="none" stroke-width=".075"/>' +
    '<circle class="loop-start" r=".14"/><circle cx="' + endX + '" cy="' + endY + '" r=".23" fill="none" stroke="currentColor" stroke-width=".08"/></svg>';
}
export function mountLoop(host, id) {
  const key = 'informatyka-trasa-v1-' + id;
  let program = startingProgram(), goalId = 'square', visual, closed = false, opening = 0;
  try {
    const saved = JSON.parse(sessionStorage.getItem(key));
    if (validProgram(saved?.program) && Object.hasOwn(goals,saved.goal)) { program = saved.program; goalId = saved.goal; }
  } catch { /* Pamięć sesji jest opcjonalna. */ }
  host.innerHTML = '<section class="loop-lab" aria-labelledby="loop-title"><h2 id="loop-title">Plansza robota</h2>' +
    '<label for="loop-goal">Wybierz figurę</label> <select id="loop-goal"><option value="square">Kwadrat 3 × 3</option><option value="rectangle">Prostokąt 5 × 3</option></select>' +
    '<p data-plan></p><div class="loop-grid-layout"><div><h3>Twój program</h3>' +
    '<div class="loop-mode"><button class="btn" type="button" data-list-mode aria-pressed="true">Lista poleceń</button>' +
    '<button class="btn" type="button" data-block-mode aria-pressed="false">Bloczki</button></div>' +
    '<div data-form><label for="repeat-count">Ile razy powtórzyć polecenia?</label> <select id="repeat-count"></select>' +
    '<ol data-steps></ol><div class="actions"><button class="btn" type="button" data-add="move">Dodaj ruch</button>' +
    '<button class="btn" type="button" data-add="turn">Dodaj obrót</button></div></div>' +
    '<div data-visual hidden><p>Połącz ruchy i obroty wewnątrz pętli. Na liście te same zmiany wykonasz klawiaturą.</p><div class="loop-workspace" data-workspace></div></div></div>' +
    '<div><h3>Trasa robota</h3><div data-map></div><p class="loop-key">Linia przerywana wyznacza cel. Kropka to start, a kółko pokazuje położenie robota.</p></div></div>' +
    '<div class="actions"><button type="button" class="btn primary" data-run>Uruchom program</button> <button type="button" class="btn" data-reset>Nowa próba</button></div>' +
    '<p data-status role="status" aria-live="polite"></p><details data-trail hidden><summary>Odczytaj trasę krok po kroku</summary><ol></ol></details></section>';
  const get = s => host.querySelector(s);
  const count = get('#repeat-count'), goal = get('#loop-goal'), steps = get('[data-steps]');
  const listMode = get('[data-list-mode]'), blockMode = get('[data-block-mode]');
  const status = get('[data-status]'), trail = get('[data-trail]'), map = get('[data-map]');
  function save() { try { sessionStorage.setItem(key,JSON.stringify({goal:goalId,program})); } catch {} }
  function refresh() {
    goal.value = goalId;
    const {width,height} = goals[goalId];
    get('[data-plan]').textContent = 'Start w lewym górnym rogu. Robot patrzy w prawo. Boki mają kolejno ' +
      [width,height,width,height].join(', ') + ' kratek. Wróć do startu po jednym obwodzie.';
    map.innerHTML = drawing(goals[goalId],[[0,0]]); trail.hidden = true; status.textContent = '';
  }
  function change(message='') { save(); refresh(); status.textContent = message; }
  function renderList() {
    count.innerHTML = numberOptions(program.repeat);
    steps.innerHTML = program.steps.map((s,i) => {
      const name = s.type === 'move' ? 'Ruch o liczbę kratek' : 'Obrót o ćwierć obrotu';
      const choices = s.type === 'move' ? numberOptions(s.value) : '<option value="right">w prawo</option><option value="left"' +
        (s.value === 'left' ? ' selected' : '') + '>w lewo</option>';
      return '<li><label>' + name + ' <select data-at="' + i + '" aria-label="' + name + ', polecenie ' + (i+1) + '">' + choices + '</select></label>' +
        '<div class="loop-edits"><button type="button" class="btn" data-shift="-1" aria-label="Przesuń wyżej polecenie ' + (i+1) + '"' + (!i?' disabled':'') + '>Wyżej</button>' +
        '<button type="button" class="btn" data-shift="1" aria-label="Przesuń niżej polecenie ' + (i+1) + '"' + (i===program.steps.length-1?' disabled':'') + '>Niżej</button>' +
        '<button type="button" class="btn" data-remove aria-label="Usuń polecenie ' + (i+1) + '">Usuń</button></div></li>';
    }).join('');
    host.querySelectorAll('[data-add]').forEach(b => b.disabled = program.steps.length >= 12);
  }
  function focusStep(i) { (get('[data-at="' + i + '"]') || get('[data-add]')).focus(); }
  function showList() {
    opening++;
    if (visual) { program = visual.read(); visual.close(); visual = undefined; save(); }
    get('[data-form]').hidden = false; get('[data-visual]').hidden = true;
    listMode.setAttribute('aria-pressed','true'); blockMode.setAttribute('aria-pressed','false');
    blockMode.disabled = false; renderList();
  }
  listMode.onclick = showList;
  blockMode.onclick = async () => {
    if (visual) return;
    const ticket = ++opening;
    blockMode.disabled = true; status.textContent = 'Otwieranie bloczków…';
    try {
      const mod = await import('./bloczki.js'), B = await mod.loadBlockly();
      if (closed || ticket !== opening) return;
      get('[data-form]').hidden = true; get('[data-visual]').hidden = false;
      visual = mod.visualEditor(B,get('[data-workspace]'),program,next => {
        if (closed || !validProgram(next) || JSON.stringify(next) === JSON.stringify(program)) return;
        program = next; change();
      });
      listMode.setAttribute('aria-pressed','false'); blockMode.setAttribute('aria-pressed','true'); status.textContent = 'Bloczki gotowe.';
    } catch (error) {
      if (closed || ticket !== opening) return;
      console.error('Otwieranie Blockly:', error);
      showList(); status.textContent = 'Skorzystaj z listy poleceń. Pozwala zbudować ten sam program.';
    } finally { if (!closed && ticket === opening) blockMode.disabled = false; }
  };
  goal.onchange = () => { goalId = goal.value; change(); };
  count.onchange = () => { program.repeat = Number(count.value); change(); };
  steps.onchange = e => {
    const field = e.target.closest('select[data-at]');
    if (!field) return;
    const step = program.steps[Number(field.dataset.at)];
    step.value = step.type === 'move' ? Number(field.value) : field.value; change();
  };
  steps.onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    const i = Number(b.closest('li').querySelector('select').dataset.at);
    let next = i;
    if (b.hasAttribute('data-remove')) { program.steps.splice(i,1); next = Math.min(i,program.steps.length-1); }
    else { next = i + Number(b.dataset.shift); [program.steps[i],program.steps[next]] = [program.steps[next],program.steps[i]]; }
    renderList(); change('Zmieniono program. Liczba poleceń w pętli: ' + program.steps.length + '.'); focusStep(next);
  };
  host.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
    const type = b.dataset.add;
    program.steps.push({type,value:type === 'move' ? 1 : 'right'}); renderList(); change('Dodano polecenie.'); focusStep(program.steps.length-1);
  });
  get('[data-run]').onclick = () => {
    if (visual) program = visual.read();
    const result = traceProgram(program,goalId); save();
    map.innerHTML = drawing(goals[goalId],result.points);
    status.textContent = result.message + ' Długość trasy w kratkach: ' + result.distance + '. Obwód figury: ' + result.length + '.';
    trail.hidden = !result.segments.length; trail.querySelector('ol').innerHTML = result.segments.map(s=>'<li>' + s + '</li>').join('');
  };
  get('[data-reset]').onclick = () => {
    showList(); program = startingProgram(); goalId = 'square'; renderList(); change('Nowa próba. Robot czeka na starcie.'); goal.focus();
  };
  renderList(); refresh();
  return () => { closed = true; opening++; visual?.close(); };
}
