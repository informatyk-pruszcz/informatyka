// Układ menu jest niezależny od sesji i kodu ucznia.
// Zamknięcie panelu nie przebudowuje edytora ani podglądu.
(() => {
  const button = document.querySelector('#toggle-menu');
  const sidebar = document.querySelector('#sidebar');
  const narrow = matchMedia('(max-width: 850px)');
  const key = 'html-pracownia-sidebar-open';
  let desktopOpen = true, mobileOpen = false;
  try { desktopOpen = localStorage.getItem(key) !== 'false'; } catch {}

  function isOpen() { return narrow.matches ? mobileOpen : desktopOpen; }
  function apply() {
    const open = isOpen();
    if (!open && sidebar.contains(document.activeElement)) button.focus();
    sidebar.hidden = !open;
    document.body.classList.toggle('sidebar-collapsed', !open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Zwiń menu ćwiczeń' : 'Rozwiń menu ćwiczeń');
    document.querySelector('#menu-label').textContent = open ? 'Zwiń menu' : 'Rozwiń menu';
  }
  button.addEventListener('click', () => {
    const open = !isOpen();
    if (narrow.matches) mobileOpen = open;
    else {
      desktopOpen = open;
      try { localStorage.setItem(key, String(open)); } catch {}
    }
    apply();
  });
  function closeMobileMenu() {
    if (!narrow.matches) return;
    mobileOpen = false;
    apply();
  }
  sidebar.addEventListener('click', event => {
    if (event.target.closest('.lesson-link, #playground')) closeMobileMenu();
  });
  window.addEventListener('hashchange', closeMobileMenu);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && narrow.matches && isOpen() && !document.querySelector('dialog[open]')) {
      closeMobileMenu(); button.focus();
    }
  });
  narrow.addEventListener('change', () => { mobileOpen = false; apply(); });
  window.addEventListener('storage', event => {
    if (event.key === key) { desktopOpen = event.newValue !== 'false'; apply(); }
  });
  // Wysokość nagłówka zmienia się m.in. po powiększeniu tekstu.
  new ResizeObserver(entries => {
    document.documentElement.style.setProperty('--top-height', entries[0].target.getBoundingClientRect().height + 'px');
  }).observe(document.querySelector('.top'));
  apply(); button.disabled = false;
})();
