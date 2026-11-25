(() => {
  const poses = [
    "M146 39 Q165 43 181 62 Q196 40 217 36",
    "M143 52 Q164 49 181 62 Q201 51 220 50",
    "M147 71 Q166 56 181 62 Q201 58 217 73",
    "M152 84 Q165 63 181 62 Q199 66 214 86"
  ];
  const frames = document.querySelector(".frames");
  const play = document.querySelector("#play");
  let frame = 0;
  let timer = null;
  function show(index) {
    frame = index;
    document.querySelector("#wings").setAttribute("d", poses[index]);
    document.querySelector("#frame-count").textContent = "Klatka " + (index + 1) + " / 4";
    Array.from(frames.children).forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
  }
  function pause() {
    clearInterval(timer);
    timer = null;
    play.textContent = "▶ Odtwórz";
    play.setAttribute("aria-pressed", "false");
  }
  poses.forEach((pose, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = index + 1;
    button.setAttribute("aria-label", "Pokaż klatkę " + (index + 1));
    button.onclick = () => { pause(); show(index); };
    frames.append(button);
  });
  play.onclick = () => {
    if (timer !== null) { pause(); return; }
    play.textContent = "Ⅱ Pauza";
    play.setAttribute("aria-pressed", "true");
    timer = setInterval(() => show((frame + 1) % poses.length), 320);
  };
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  show(0);
})();
