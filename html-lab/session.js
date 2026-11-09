// Osobny klucz prac dla każdego ucznia: stara karta nie zapisze do nowej sesji.
const labSession = (() => {
  const meta = 'html-pracownia-session-v2', prefix = 'html-pracownia-work:', ttl = 45 * 60000;
  let local = true, memory = null;
  function read() {
    if (!local) return memory;
    try { return JSON.parse(localStorage.getItem(meta)); } catch { return memory; }
  }
  function persist(s) {
    memory = s;
    try { localStorage.setItem(meta, JSON.stringify(s)); } catch { local = false; }
  }
  function fresh() {
    const s = {id: crypto.randomUUID(), end: Date.now() + ttl};
    persist(s); return s;
  }
  function erase(s) {
    try { if (s?.id) localStorage.removeItem(prefix + s.id); } catch {}
  }
  try { localStorage.removeItem('html-pracownia-v1'); } catch { local = false; }
  let session = read();
  function valid(s) { return s && typeof s.id === 'string' && Number.isFinite(s.end) && s.end > Date.now(); }
  const expiredAtOpen = session && !valid(session);
  if (!valid(session)) { erase(session); session = null; }
  if (!session && !expiredAtOpen) session = fresh();
  let inactive = !session;
  function restart() {
    erase(read()); fresh();
    location.replace(location.pathname + location.search + '#pierwszy-naglowek');
    location.reload();
  }
  function check() {
    const shared = read();
    if (session && shared?.id === session.id) session = shared;
    if (!shared || !session || shared.id !== session.id || shared.end !== session.end || Date.now() >= session.end) {
      if (!inactive) { inactive = true; erase(session); }
      if (shared && valid(shared) && shared.id !== session?.id) { location.reload(); return false; }
      const box = document.querySelector('#session-end');
      if (!box.open) {
        document.querySelector('#modal')?.close();
        document.querySelector('#code').value = '';
        document.querySelector('#preview').srcdoc = '';
        box.showModal();
      }
      return false;
    }
    const mins = Math.ceil((session.end - Date.now()) / 60000);
    document.querySelector('#session-time').textContent = 'Sesja: ' + mins + ' min';
    const warning = mins <= 5 ? 'Zostało do 5 minut. Zapisz postęp lub dodaj czas.' : '';
    const notice = document.querySelector('#expiry-notice');
    if (notice.textContent !== warning) notice.textContent = warning;
    return true;
  }
  // Sprawdzaj również po uśpieniu komputera i przed obsługą wejścia.
  for (const event of ['focus','pageshow','storage','visibilitychange']) window.addEventListener(event, check);
  for (const event of ['click','keydown','input']) document.addEventListener(event, e => {
    if (!e.target.closest?.('#session-end') && !check()) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  document.querySelector('#session-end').oncancel = e => e.preventDefault();
  document.querySelector('#begin-session').onclick = restart;
  document.querySelector('#extend-session').onclick = () => {
    if (!check()) return;
    session = {...session,end:session.end + 15 * 60000};
    persist(session);
    check();
  };
  setInterval(check, 1000);
  return {key:prefix + (session?.id ?? 'inactive'), check, restart};
})();