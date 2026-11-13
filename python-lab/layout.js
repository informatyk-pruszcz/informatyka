// Preferencja widoku jest oddzielna od postępu ucznia. Zmiana szerokości
// lub ukrycie nawigacji nie przebudowuje edytora i nie przerywa programu.
const button = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');
const focusButton = document.querySelector('#focus');
const narrow = matchMedia('(max-width: 800px)');
const key = 'python-pracownia-sidebar-open';
let desktopOpen = true, mobileOpen = false, focusOverride = null;
try { desktopOpen = localStorage.getItem(key) !== 'false'; } catch {}

function isOpen() { return focusOverride ?? (narrow.matches ? mobileOpen : desktopOpen); }
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
  if (focusOverride !== null) focusOverride = open;
  else if (narrow.matches) mobileOpen = open;
  else {
    desktopOpen = open;
    try { localStorage.setItem(key, String(open)); } catch {}
  }
  apply();
});
focusButton.addEventListener('click', () => {
  const focused = document.body.classList.toggle('focus-mode');
  focusButton.setAttribute('aria-pressed', String(focused));
  focusOverride = focused ? false : null;
  apply();
});
// Na małym ekranie wybranie lekcji odsłania od razu jej treść.
function closeMobileMenu() {
  if (!narrow.matches) return;
  mobileOpen = false;
  if (focusOverride !== null) focusOverride = false;
  apply();
}
sidebar.addEventListener('click', event => {
  if (event.target.closest('a')) { closeMobileMenu(); if (narrow.matches) button.focus(); }
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
// Pasek górny może zawijać się przy powiększeniu tekstu i na telefonie.
new ResizeObserver(entries => {
  document.documentElement.style.setProperty('--top-height', entries[0].target.getBoundingClientRect().height + 'px');
}).observe(document.querySelector('.top'));
apply(); button.disabled = false;
