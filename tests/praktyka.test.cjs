const {test} = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const XLSX = require('../praktyka/vendor/xlsx-0.20.3.min.js');

test('XLSX z karty: wskazówki dla liczby, zakresu, różnych formuł, zmian cen i innego pliku', async () => {
  const {inspectBudget} = await import('../praktyka/budzet.js');
  const book = XLSX.read(fs.readFileSync(path.join(__dirname,'../praktyka/budzet-start.xlsx')), {type:'buffer'});
  const tab = book.Sheets[book.SheetNames[0]];
  assert.equal(inspectBudget(book).code,'constant');
  assert.equal(inspectBudget({SheetNames:[],Sheets:{}}).code,'file');
  for (const formula of ['SUM(B7:B9)','SUM(B7:B10)+B10','B7+15+B9+B10']) {
    tab.B11.f = formula; assert.equal(inspectBudget(book).code,'range');
  }
  tab.B11.f = 'SUM(B7:B10)'; assert.equal(inspectBudget(book).code,'first');
  tab.B7.v = 30; assert.equal(inspectBudget(book).code,'second');
  tab.B8.v = 8;
  for (const formula of ['SUM(B7:B10)','$B$10+B9+B8+B7','SUM(B7:B8,B9:B10)']) {
    tab.B11.f = formula; assert.equal(inspectBudget(book).code,'ok');
  }
  tab.B13.f = 'B5+B11'; assert.equal(inspectBudget(book).code,'balance');
  tab.B13.f = 'SUM(B2:B4)-SUM(B7:B10)'; assert.equal(inspectBudget(book).code,'ok');
  tab.B11.f = 'SUMPRODUCT(B7:B10)'; assert.equal(inspectBudget(book).code,'manual');
});

test('Robot: pierwsza próba, pusty program, kwadrat, prostokąt i wielokrotny obwód', async () => {
  const {traceProgram,validProgram,startingProgram} = await import('../praktyka/trasa.js');
  const p = startingProgram();
  assert(!traceProgram(p,'square').complete);
  assert.equal(traceProgram({repeat:2,steps:[]},'square').distance,0);
  p.repeat = 4; p.steps[0].value = 3;
  assert(traceProgram(p,'square').complete);
  assert(!traceProgram(p,'rectangle').complete);
  p.repeat = 8; assert(!traceProgram(p,'square').complete);
  p.repeat = 2; p.steps[0].value = 5; p.steps.push({type:'move',value:3},{type:'turn',value:'right'});
  assert(traceProgram(p,'rectangle').complete);
  assert(!validProgram({repeat:1000,steps:[]}));
});

test('Każda karta dziedziczy metrykę swojego rocznika i prowadzi od właściwej notatki', async () => {
  const {practicalCards, practicalLink} = await import('../praktyka/karty.js?v=cele1');
  const {skillChooser,catalogTags,catalogSection} = await import('../praktyka/wybor.js');
  for (const c of practicalCards) {
    assert(c.minutes > 0 && c.minutes <= 25);
    assert(c.study.assessment && c.study.point && c.study.program && c.study.support);
    assert(c.study.basis.includes(c.grades[0] === 4 ? '2026' : 'dotychczasowa'));
    assert(practicalLink(c.topicId).includes('#item/'+c.id)); assert(skillChooser(c.grades[0]).includes(c.skill));
  }
  assert.deepEqual(catalogTags({tags:['EXCEL','Excel','Excel2016','Excel z tabelą przestawną','SUMA']}),['Excel','SUMA']);
  assert.equal(catalogSection('Arkusz Kalkulacyjny'),catalogSection('1. Arkusz kalkulacyjny'));
});
