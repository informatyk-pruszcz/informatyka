import {esc} from '../core.js';
import {practicalCards} from './karty.js?v=wymagania2';

const otherSkills = {
  4: [['Kopiuję plik między folderami','#item/karta-4-1-urzadzenia-pliki','Pliki i foldery']],
  5: [['Tworzę czytelny slajd','#item/karta-5-2-1-prezentacja','PowerPoint']],
  6: [['Porównuję dane na wykresie','#item/karta-6-2-4-wykresy','Excel']],
  7: [['Buduję pierwszą stronę WWW','#item/karta-7-2-1-pierwsza-strona','HTML'],['Pracuję na warstwach obrazu','#item/karta-7-3-1-gimp','GIMP']],
  8: [['Kopiuję formuły ze stałym adresem','#item/karta-8-1-rentownosc-excel','Excel'],['Naprawiam błędy w Pythonie','./python-lab/index.html#naprawa','Napraw kod']]
};
export function skillChooser(grade) {
  const entries = practicalCards.filter(c => c.grades.includes(Number(grade))).map(c => [c.skill, '#item/' + c.id, c.minutes + ' min']);
  const links = entries.concat(otherSkills[grade] || []).map(([label, href, detail]) =>
    '<a href="' + esc(href) + '"><strong>' + esc(label) + '</strong><small>' + esc(detail) + '</small></a>');
  return '<section class="skill-choices" aria-labelledby="skill-question"><h2 id="skill-question">Co chcesz przećwiczyć?</h2><div>' + links.join('') + '</div></section>';
}
export function catalogTags(item, tool = '') {
  const tags = new Set();
  for (const tag of item.tags || []) {
    const name = tag.trim();
    const isExcel = /^(?:(?:ms|microsoft)\s*)?excel(?:\s*(?:20\d\d(?: pl)?|z tabelą przestawną))?$|^arkusz\s*kalkulacyjny$/i.test(name);
    if (name) tags.add(isExcel ? 'Excel' : name);
  }
  if (/\bexcel\b/i.test(tool)) tags.add('Excel');
  return [...tags];
}
export function catalogSection(section) {
  if (/^(?:\d+\.\s*)?arkusz kalkulacyjny(?: i analiza danych)?$/i.test(section)) return 'Arkusz kalkulacyjny';
  if (/^(?:\d+\.\s*)?programowanie w języku python$/i.test(section)) return 'Programowanie w języku Python';
  return section;
}
