// Wszystkie podstrony korzystają z ustawienia portalu, także w drugiej karcie.
(() => {
  const key = 'informatyka-theme';
  const button = document.getElementById('theme');
  if (!button) return;

  function apply(value) {
    const dark = value === 'dark';
    document.body.classList.toggle('dark',dark);
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label','Ciemny motyw');
    button.title = dark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw';
    button.textContent = button.dataset.compact !== undefined ? (dark ? '☀' : '☾') : 'Ciemny motyw';
  }
  let initial;
  try {
    initial = localStorage.getItem(key);
    if (!initial) {
      initial = localStorage.getItem('html-theme');
      if (initial) localStorage.setItem(key,initial);
    }
  } catch {}
  apply(initial);
  button.addEventListener('click', () => {
    const value = document.body.classList.contains('dark') ? 'light' : 'dark';
    apply(value);
    try { localStorage.setItem(key,value); } catch {}
  });
  window.addEventListener('storage', e => { if (e.key === key || e.key === null) apply(e.newValue); });
})();