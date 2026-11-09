'use strict';
const fileTasks=[
 ['Załóż folder projektu','Utwórz folder na gotowe materiały w katalogu Pracownia. Nadaj mu podaną nazwę.','W Eksploratorze utwórz taki sam folder na szkolnym dysku.'],
 ['Zachowaj oryginał','Skopiuj ilustrację z folderu Źródła do folderu projektu.','Wykonaj kopiowanie w Eksploratorze. Sprawdź oba foldery.'],
 ['Przenieś dokument','Przenieś dokument tekstowy do folderu projektu.','Użyj Wytnij i Wklej w Eksploratorze oraz sprawdź miejsce początkowe.'],
 ['Wybierz plik do edycji','Skopiuj do projektu plik, w którym można wygodnie zmienić treść plakatu.','Otwórz własny dokument w edytorze i wyeksportuj PDF. Porównaj przeznaczenie plików.'],
 ['Przygotuj pracę do oddania','W folderze projektu pozostaw tylko edytowalny dokument i ilustrację. Usuń zbędne kopie.','Powtórz te czynności na własnych plikach w szkolnym folderze. Pokaż nauczycielowi wynik.']
].map(([title,goal,transfer])=>({title,goal,transfer,lesson:'karta-4-1-urzadzenia-pliki'}));
function fileConfig(seed){
 const [dir,pic,doc]=seed%2?['Atlas','mapa.png','opis.odt']:['Gazetka','park.png','plakat.odt'];
 return {dir,pic,doc,pdf:doc.replace('.odt','.pdf'),source:'Źródła',copy:'kopia-'+doc};
}
function initialTree(i,c) {
 const tree={'':['Źródła/'],'Źródła':[c.pic,c.doc,c.pdf]};
 if(i>0){tree[''].push(c.dir+'/');tree[c.dir]=i===4?[c.copy]:[]}
 return tree;
}
function fileGoals(i,t,c){
 const dest=t[c.dir]||[],src=t[c.source]||[];
 if(i===0)return [Object.hasOwn(t,c.dir),'W katalogu głównym utwórz folder '+c.dir+'.'];
 if(i===1)return [src.includes(c.pic)&&dest.includes(c.pic),'Ilustracja '+c.pic+' powinna być w obu folderach.'];
 if(i===2)return [!src.includes(c.doc)&&dest.includes(c.doc),'Po przeniesieniu dokument powinien być tylko w folderze '+c.dir+'.'];
 if(i===3)return [src.includes(c.doc)&&dest.includes(c.doc)&&!dest.includes(c.pdf),'Wybierz oryginał z rozszerzeniem .odt. Sprawdź oba foldery.'];
 return [dest.length===2&&dest.includes(c.pic)&&dest.includes(c.doc),'Porównaj zawartość folderu z listą: '+c.pic+', '+c.doc+'.'];
}
pilots.pliki={name:'Porządek w plikach',tasks:fileTasks,render(i){
 const s=state();s.seed??=0;const c=fileConfig(s.seed);s.tree??=initialTree(i,c);s.history??=[];
 const tree=s.tree,rootName='Pracownia';
 const flat=Object.entries(tree).flatMap(([dir,items])=>items.filter(v=>!v.endsWith('/')).map(name=>({dir,name})));
 const dirOptions=Object.keys(tree).map(v=>[v,v||rootName]);
 $('#activity').innerHTML='<p class="data">Folder projektu: <strong>'+escapeText(c.dir)+'</strong> · ilustracja: '+escapeText(c.pic)+' · dokument: '+escapeText(c.doc)+'</p>'
 +table(['Folder','Zawartość'],Object.entries(tree).map(([dir,items])=>[dir?rootName+' / '+dir:rootName,items.join(', ')||'(pusty)']))
 +'<label>Plik źródłowy <select id="file">'+options(flat.map(v=>[v.dir+'/'+v.name,(v.dir||rootName)+' / '+v.name]),s.file)+'</select></label>'
 +'<label>Folder docelowy <select id="dest">'+options(dirOptions,s.dest??(i===0?'':c.dir))+'</select></label>'
 +field('folder','Nazwa nowego folderu','')
 +'<div class="actions"><button id="mkdir">Utwórz folder</button><button id="copy">Kopiuj do celu</button><button id="move">Przenieś do celu</button><button id="remove">Usuń wybrany plik</button><button id="undo" '+(s.history.length?'':'disabled')+'>Cofnij</button></div>'
 +'<p><button class="primary" id="checkTree">Sprawdź foldery</button> <button id="variant">Zacznij wariant z innymi nazwami</button></p>';
 s.file=$('#file').value;s.dest=$('#dest').value;
 $('#file').onchange=e=>{s.file=e.target.value;saveDraft()};$('#dest').onchange=e=>{s.dest=e.target.value;saveDraft()};
 const apply=(kind)=>{
  const draft=JSON.parse(JSON.stringify(tree));
  if(kind==='mkdir'){
    const name=String(s.folder||'').trim();
    if(!name||name.length>45||/[<>:"/\\|?*\x00-\x1F]/.test(name)||name==='.'||name==='..'||/[. ]$/.test(name)){message('Wpisz prostą nazwę folderu, bez ukośników i kropki na końcu.');return}
    const path=[s.dest,name].filter(Boolean).join('/');
    if(Object.hasOwn(draft,path)||Object.hasOwn(Object.prototype,path)||draft[s.dest].some(v=>v.replace(/\/$/,'').toLowerCase()===name.toLowerCase())){message('Taka nazwa już istnieje.');return}
    draft[path]=[];draft[s.dest].push(name+'/');
  }else{
    const row=flat.find(v=>v.dir+'/'+v.name===s.file);
    if(!row){message('Wybierz plik źródłowy.');return}
    if(kind!=='remove'){
      if(draft[s.dest].includes(row.name)){message('W folderze docelowym jest już ten plik.');return}
      draft[s.dest].push(row.name);
    }
    if(kind!=='copy')draft[row.dir]=draft[row.dir].filter(name=>name!==row.name);
  }
  s.history.push(tree);s.history=s.history.slice(-12);s.tree=draft;delete s.result;refresh();message('Zmieniono zawartość folderów. Sprawdź tabelę.');
 };
 for(const kind of ['mkdir','copy','move','remove'])$('#'+kind).onclick=()=>apply(kind);
 $('#undo').onclick=()=>{s.tree=s.history.pop();delete s.result;refresh();message('Przywrócono poprzedni stan.')};
 $('#checkTree').onclick=()=>{const [ok,hint]=fileGoals(i,tree,c);if(ok)outcome('Cel osiągnięty. '+Object.entries(tree).map(([dir,items])=>(dir||rootName)+' → '+(items.join(', ')||'pusty')).join(' | '));else message(hint)};
 $('#variant').onclick=()=>{s.seed++;s.tree=initialTree(i,fileConfig(s.seed));s.history=[];s.folder='';delete s.dest;delete s.result;refresh()};
}};