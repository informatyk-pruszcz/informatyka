// W widoku projektora pracujemy na tych samych polach i checkboxach co uczeń.
const extensions = {
  'karta-4-1-urzadzenia-pliki':'Utwórz folder w Eksploratorze. Skopiuj do niego rysunek i pokaż, gdzie pozostał oryginał.',
  'karta-5-1-2-zupa':'Dopisz składnik i nowy krok przepisu. Sprawdź, czy numeracja zaktualizowała się sama.',
  'karta-5-1-2-tosty':'Dodaj czynność w środku przepisu. Porównaj numerację przed zmianą i po niej.',
  'karta-5-1-3-planer':'Dodaj do planu nowy dzień. Zadbaj o czytelny nagłówek i szerokości kolumn.',
  'karta-7-2-1-pierwsza-strona':'Dodaj drugi akapit i śródtytuł. Pokaż, jak odróżniasz tytuł karty od tytułu sekcji.',
  'karta-8-1-kosztorys-balu':'Podnieś jedną cenę o 10%. Przewidź nowy koszt, a potem sprawdź go w arkuszu.',
  'karta-8-1-rentownosc-excel':'Zmień koszt części dla jednej usługi. Wskaż dwie komórki, których wartości zależą od tej zmiany.',
  'karta-8-1-tabele-przestawne':'Wybierz dwa miasta i ten sam rok. Uzasadnij wniosek dwiema wartościami z raportu.',
  'karta-8-1-misja-vat':'Porównaj dwie kategorie zakupów jednej osoby. Podaj dwie kwoty VAT uzasadniające wniosek.'
};

export function bindWorksheetProjector(sheet, id) {
  const steps = [...sheet.querySelectorAll('.ws-step')];
  if (!steps.length || sheet.querySelector('.ws-projector-toolbar')) return;

  const key = 'worksheet-step:' + id;
  let index = 0;
  let active = false;
  try {
    const saved = JSON.parse(sessionStorage.getItem(key));
    if (saved && Number.isInteger(saved.index) && steps[saved.index]) {
      index = saved.index;
      active = saved.active === true;
    }
  } catch {}

  const address = new URL(location.href);
  const linkedStep = Number(address.searchParams.get('krok'));
  if (address.searchParams.get('karta') === id && Number.isInteger(linkedStep) && linkedStep > 0 && linkedStep <= steps.length) {
    index = linkedStep - 1;
    active = true;
    // Po otwarciu odsyłacza odświeżenie powinno wracać do najnowszego kroku.
    address.searchParams.delete('krok');
    address.searchParams.delete('karta');
    history.replaceState(history.state, '', address);
  }

  const bar = document.createElement('section');
  bar.className = 'ws-projector-toolbar';
  bar.setAttribute('aria-label','Widok kroków');
  bar.innerHTML = '<button type="button" class="btn" data-mode>Widok na projektor</button><button type="button" class="btn" data-resume></button><div class="ws-slide-controls" hidden><button type="button" class="btn" data-prev>← Poprzedni</button><label>Krok <select aria-label="Wybierz krok"></select></label><button type="button" class="btn" data-next>Następny →</button><button type="button" class="btn" data-copy>Kopiuj link do kroku</button><input aria-label="Link do tego kroku" readonly hidden></div><span data-status role="status"></span>';
  sheet.prepend(bar);
  const find = s => bar.querySelector(s);
  const select = find('select');
  const mode = find('[data-mode]');
  const resume = find('[data-resume]');

  steps.forEach((step,i) => {
    select.add(new Option(String(i + 1),String(i)));
    function rememberStep() {
      if (!active && index !== i) { index = i; remember(); sync(); }
    }
    step.addEventListener('focusin',rememberStep);
    step.addEventListener('click',rememberStep);
  });
  const challenge = document.createElement('details');
  challenge.className = 'ws-projector-extension';
  const summary = document.createElement('summary');
  summary.textContent = 'Zadanie dla chętnych';
  const instruction = document.createElement('p');
  instruction.textContent = extensions[id] || 'Pokaż drugiej osobie, jak sprawdzić efekt wykonanej pracy.';
  challenge.append(summary,instruction);
  steps.at(-1).append(challenge);

  function remember() {
    try { sessionStorage.setItem(key,JSON.stringify({index,active})); } catch {}
  }
  function sync() {
    sheet.querySelectorAll('[data-projector-hidden]').forEach(el=>el.removeAttribute('data-projector-hidden'));
    sheet.classList.toggle('ws-projecting',active);
    mode.textContent = active ? 'Zakończ pokaz' : 'Widok na projektor';
    mode.setAttribute('aria-pressed',String(active));
    resume.hidden = active || !index;
    resume.textContent = 'Wróć do kroku ' + (index + 1);
    find('.ws-slide-controls').hidden = !active;
    find('input').hidden = true;
    select.value = String(index);
    find('[data-prev]').disabled = index === 0;
    find('[data-next]').disabled = index === steps.length - 1;
    find('[data-status]').textContent = active ? 'Krok ' + (index + 1) + ' z ' + steps.length : '';
    if (!active) return;
    // Ukrywamy sąsiednie karty także wtedy, gdy stary materiał ma kroki w siatce.
    for(let node=steps[index]; node !== sheet; node=node.parentElement) {
      for(const sibling of node.parentElement.children) {
        if(sibling !== node && sibling !== bar) sibling.setAttribute('data-projector-hidden','');
      }
    }
  }
  function jump() { steps[index].scrollIntoView({block:'center'}); }
  function go(i) { index=i; remember(); sync(); bar.scrollIntoView({block:'start'}); }
  mode.onclick = () => { active=!active; go(index); };
  find('[data-copy]').onclick = async () => {
    const url = new URL(location.href);
    url.searchParams.set('karta',id);
    url.searchParams.set('krok',String(index + 1));
    try {
      await navigator.clipboard.writeText(url.href);
      find('[data-status]').textContent = 'Skopiowano link do kroku ' + (index + 1) + '.';
    } catch {
      const input = find('input');
      input.hidden = false;
      input.value = url.href;
      input.select();
      find('[data-status]').textContent = 'Skopiuj zaznaczony adres.';
    }
  };
  resume.onclick = jump;
  select.onchange = () => go(select.selectedIndex);
  find('[data-prev]').onclick = () => go(Math.max(0,index-1));
  find('[data-next]').onclick = () => go(Math.min(steps.length-1,index+1));
  sheet.querySelectorAll('[data-focus-step]').forEach(pill => {
    pill.addEventListener('click', () => {
      const i = steps.findIndex(step=>step.dataset.step===pill.dataset.focusStep);
      if(i>=0) { index=i; remember(); sync(); }
    });
  });
  sync();
  if (active) { remember(); bar.scrollIntoView({block:'start'}); }
}