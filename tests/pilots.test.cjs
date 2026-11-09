'use strict';
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');

// Te same funkcje zasilają przyciski ucznia. Samo obliczenie nie wymaga interfejsu.
const ctx = vm.createContext({document:{addEventListener(){}},window:{}});
for (const file of ['shared','algorytmy','siec','dane','model','pliki','links']) {
  vm.runInContext(readFileSync(join(__dirname,'..','pilots',file+'.js'),'utf8'),ctx);
}
const evaluate = expression => JSON.parse(JSON.stringify(vm.runInContext(expression,ctx)));
test('Każda z 25 prób ma cel, powrót do lekcji, rozszerzenie i właściwy adres',()=>{
  const labs=evaluate('Object.entries(pilots).map(([id,m])=>[id,m.tasks])');
  assert.equal(labs.length,5);
  for (const [id,tasks] of labs) {
    assert.equal(tasks.length,5);
    for (const [n,t] of tasks.entries()) {
      assert.match(t.lesson,/^(topic|karta)-/);
      assert.ok(t.title && t.goal && t.transfer);
      assert.equal(evaluate('keyOf('+JSON.stringify(id)+','+n+')'),id+'/'+(n+1));
    }
  }
  assert.match(ctx.window.pilotLinks('topic-8-2-4'),/#algorytmy\/4/);
});
test('Algorytmy obsługują przypadki graniczne i błąd zakresu sortowania',()=>{
  const last=(i,arr,target,fix)=>evaluate('algorithmTrace('+[i,JSON.stringify(arr),target??0,fix??true].join(',')+').at(-1)');
  assert.equal(last(0,[19,6]).predict,1);
  assert.equal(last(0,[0,6]).predict,0);
  assert.match(last(1,[60]).data,/2 × 2 × 3 × 5/);
  assert.match(last(1,[1]).data,/Brak czynników/);
  assert.match(last(2,[48,18]).data,/NWD = 6$/);
  assert.match(last(2,[9,9]).data,/NWD = 9$/);
  assert.match(last(2,[9,0]).data,/NWD = 9$/);
  assert.match(last(3,[2,2],2).data,/wynik = 0$/);
  assert.match(last(3,[],2).data,/wynik = -1$/);
  assert.match(last(3,[2,2],3).data,/wynik = -1$/);
  assert.match(last(4,[9,2,2]).data,/2, 2, 9$/);
  assert.match(last(4,[1,2,3]).data,/1, 2, 3$/);
  assert.doesNotMatch(last(4,[9,2,1],0,false).data,/1, 2, 9$/);
  assert.throws(()=>evaluate("parseAlgInput(0,'18,0',1)"));
});
test('Zestawy i klucze Excela są powtarzalne, waluta i CSV mają polski separator',()=>{
  for(const seed of [0,17,18,100]){
    const d=evaluate('dataset(1,'+seed+')');
    const quantities=d.rows.map(r=>r[1]),rate=d.rows[0][4];
    assert.equal(d.answer,Math.round(100*rate*quantities.reduce((x,y)=>x+y))/100);
    assert.deepEqual(d,evaluate('dataset(1,'+seed+')'));
  }
  assert.notEqual(evaluate('dataset(0,17).answer'),evaluate('dataset(0,18).answer'));
  assert.equal(evaluate('csvCell(1.27)'),'"1,27"');
  assert.equal(evaluate('csvCell(0)'),'"0"');
});
test('Przy równych odległościach model wybiera pierwszy aktywny wiersz',()=>{
  const result=evaluate("nearest([[1,1,'A'],[3,1,'B']],['A','B'],[true,true],[[2,1,'B']])");
  assert.equal(result[0].from,0);
  assert.equal(result[0].guess,'A');
  assert.equal(evaluate("nearest([[1,1,'A'],[3,1,'B']],['A','B'],[false,true],[[2,1,'B']])[0].guess"),'B');
});
test('Foldery wymagają zachowania oryginału przy kopii oraz usunięcia przy przenoszeniu',()=>{
  const states=evaluate(`(()=>{const c=fileConfig(0),t=initialTree(1,c);t[c.dir].push(c.pic,c.doc);const copied=fileGoals(1,t,c)[0];const premature=fileGoals(2,t,c)[0];t[c.source]=t[c.source].filter(f=>f!==c.doc);return [copied,premature,fileGoals(2,t,c)[0],fileGoals(4,t,c)[0]]})()`);
  assert.deepEqual(states,[true,false,true,true]);
});
