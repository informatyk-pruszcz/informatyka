let loading;
function script(url) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = new URL(url, import.meta.url).href; tag.onload = resolve;
    tag.onerror = () => { tag.remove(); reject(Error('Nie udało się wczytać edytora.')); };
    document.head.append(tag);
  });
}
async function prepare() {
  if (!globalThis.Blockly) await script('./vendor/blockly-12.3.1.min.js');
  await script('./vendor/blockly-pl-12.3.1.min.js');
  const B = globalThis.Blockly;
  const counts = Array.from({length:8}, (_, i) => [String(i+1), String(i+1)]);
  if (!B.Blocks.trasa_petla) B.common.defineBlocksWithJsonArray([
    {type:'trasa_petla',message0:'powtórz %1 razy',args0:[{type:'field_dropdown',name:'COUNT',options:counts}],
      message1:'wykonaj %1',args1:[{type:'input_statement',name:'BODY',check:'Step'}],colour:'#643a97'},
    {type:'trasa_ruch',message0:'idź o %1 kratek',args0:[{type:'field_dropdown',name:'VALUE',options:counts}],
      previousStatement:'Step',nextStatement:'Step',colour:'#184a87'},
    {type:'trasa_skret',message0:'obróć się %1',args0:[{type:'field_dropdown',name:'VALUE',options:[['w prawo','right'],['w lewo','left']]}],
      previousStatement:'Step',nextStatement:'Step',colour:'#694914'}
  ]);
  return B;
}
export function loadBlockly() {
  if (!loading) loading = prepare().catch(e => { loading = undefined; throw e; });
  return loading;
}
export function visualEditor(B, container, program, onChange) {
  const ws = B.inject(container, {toolbox:{kind:'flyoutToolbox',contents:[
    {kind:'block',type:'trasa_ruch'},{kind:'block',type:'trasa_skret'}]},
    maxBlocks:13, sounds:false, trashcan:false, comments:false, renderer:'zelos',
    zoom:{controls:false,wheel:false,startScale:0.85},move:{scrollbars:true,drag:true,wheel:false}});
  const first = program.steps.reduceRight((next, step) => {
    const block = {type:step.type === 'move' ? 'trasa_ruch' : 'trasa_skret',fields:{VALUE:String(step.value)}};
    if (next) block.next = {block:next};
    return block;
  },null);
  const state = {type:'trasa_petla',x:20,y:24,deletable:false,fields:{COUNT:String(program.repeat)}};
  if (first) state.inputs = {BODY:{block:first}};
  const root = B.serialization.blocks.append(state,ws);
  root.setDeletable(false);
  function read() {
    const steps = [];
    for (let b = root.getInputTargetBlock('BODY'); b; b = b.getNextBlock()) {
      const value = b.getFieldValue('VALUE');
      steps.push(b.type === 'trasa_ruch' ? {type:'move',value:Number(value)} : {type:'turn',value});
    }
    return {repeat:Number(root.getFieldValue('COUNT')), steps};
  }
  ws.addChangeListener(e => { if (!e.isUiEvent && !ws.isDisposed()) onChange(read()); });
  const resize = new ResizeObserver(() => B.svgResize(ws));
  resize.observe(container); B.svgResize(ws);
  return {read, close() { resize.disconnect(); ws.dispose(); }};
}
