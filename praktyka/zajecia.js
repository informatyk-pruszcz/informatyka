function stepControls(article) {
  const list = article.querySelector('ol');
  if (!list?.children.length) return;
  const steps = Array.from(list.children), controls = document.createElement('div');
  controls.className = 'practice-steps';
  controls.innerHTML = '<button type="button" class="btn" data-mode aria-pressed="false">Jeden krok na ekranie</button>' +
    '<div data-pages hidden><button type="button" class="btn" data-prev>Wstecz</button> <span data-count role="status"></span> <button type="button" class="btn" data-next>Dalej</button></div>';
  list.before(controls);
  const mode = controls.querySelector('[data-mode]'), pages = controls.querySelector('[data-pages]');
  const prev = controls.querySelector('[data-prev]'), next = controls.querySelector('[data-next]');
  let index = 0;
  function show() {
    const single = mode.getAttribute('aria-pressed') === 'true';
    pages.hidden = !single;
    steps.forEach((step, i) => { step.hidden = single && i !== index; step.value = i + 1; });
    prev.disabled = index === 0; next.disabled = index === steps.length - 1;
    controls.querySelector('[data-count]').textContent = single ? 'Krok ' + (index + 1) + ' z ' + steps.length : '';
  }
  mode.onclick = () => { mode.setAttribute('aria-pressed', String(mode.getAttribute('aria-pressed') !== 'true')); show(); };
  prev.onclick = () => { index--; show(); if (prev.disabled) next.focus(); };
  next.onclick = () => { index++; show(); if (next.disabled) prev.focus(); };
}

function budgetPanel(host) {
  host.innerHTML = '<section aria-labelledby="budget-title"><h2 id="budget-title">Sprawdź mój arkusz</h2>' +
    '<p>Zapisz swoją kopię w Excelu. Wybierz plik, aby dostać wskazówkę. Arkusz pozostaje na tym urządzeniu.</p>' +
    '<label for="budget-file">Moja kopia budżetu (.xlsx)</label><input type="file" id="budget-file" accept=".xlsx">' +
    '<p data-result role="status" aria-live="polite"></p><details><summary>Jak sprawdzić wynik w Excelu?</summary>' +
    '<p>Zwiększ jeden wydatek o 1 zł. Suma wydatków powinna wzrosnąć o 1 zł, a saldo spaść o 1 zł. Cofnij zmianę klawiszami Ctrl+Z. Wskaż wynik lub wyjaśnij go ustnie.</p></details></section>';
  const input = host.querySelector('input'), status = host.querySelector('[data-result]');
  let worker, timer, attempt = 0;
  function stop() { worker?.terminate(); worker = undefined; clearTimeout(timer); }
  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;
    const current = ++attempt;
    stop(); input.value = '';
    if (!/\.xlsx$/i.test(file.name) || file.size > 2 * 1024 * 1024) {
      status.textContent = 'Wybierz kopię budżetu w formacie XLSX (do 2 MB).'; return;
    }
    status.textContent = 'Odczytuję budżet…';
    function finish(message) { if (current === attempt) { stop(); status.textContent = message; } }
    try {
      const bytes = await file.arrayBuffer();
      if (current !== attempt || !host.isConnected) return;
      worker = new Worker(new URL('./budzet-worker.js', import.meta.url));
      worker.onmessage = e => finish(e.data);
      worker.onerror = () => finish('Odczyt się nie udał. Spróbuj ponownie lub wykonaj próbę w Excelu.');
      timer = setTimeout(() => finish('Odczyt trwał zbyt długo. Wybierz kopię pliku startowego lub wykonaj próbę w Excelu.'), 15000);
      worker.postMessage(bytes, [bytes]);
    } catch { finish('Zapisz dokument jako skoroszyt XLSX i wybierz go ponownie.'); }
  };
  return () => { attempt++; stop(); };
}

export function mountPractical(id, host) {
  stepControls(host.closest('article'));
  if (id === 'praktyka-budzet') return budgetPanel(host);
  if (!id.startsWith('praktyka-petla-')) return;
  let disposed = false, close;
  host.textContent = 'Otwieranie planszy…';
  import('./petla.js').then(module => {
    if (!disposed && host.isConnected) close = module.mountLoop(host, id);
  }).catch(() => { if (!disposed) host.textContent = 'Odśwież stronę, aby ponownie otworzyć planszę.'; });
  return () => { disposed = true; close?.(); };
}
