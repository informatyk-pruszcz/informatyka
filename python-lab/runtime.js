// Izolacja: iframe bez allow-same-origin. Kod ucznia nie ma dostępu do
// localStorage, konta nauczyciela ani dokumentu portalu. Nie używamy eval w stronie.
export class PythonRuntime {
  constructor(status) { this.status=status; this.frame=null; this.pending=null; this.serial=0; this.generation=0; }
  stop() {
    this.generation++;
    clearTimeout(this.timer);
    if (this.listener) window.removeEventListener('message',this.listener);
    this.frame?.remove(); this.frame=null;
    const pending=this.pending; this.pending=null; this.ready=null;
    pending?.reject(new Error('STOP'));
  }
  async load() {
    if (this.ready) return this.ready;
    const generation=this.generation;
    this.status('Pobieranie Pythona… Pierwsze uruchomienie może potrwać około minuty.');
    this.ready = new Promise(async (resolve,reject) => {
      this.pending={reject};
      this.timer=setTimeout(()=>this.fail('LOAD'),120000);
      try {
        const response=await fetch('./worker.js');
        if (!response.ok) throw new Error('LOAD');
        const source=await response.text();
        if (!this.pending || generation!==this.generation) return;
        const frame=document.createElement('iframe');
        frame.hidden=true; frame.title='Izolowane środowisko Python'; frame.sandbox='allow-scripts';
        this.frame=frame;
        this.listener=event=>{
          if (event.source!==frame.contentWindow) return;
          const data=event.data;
          if (data?.type==='status') this.status(data.message);
          if (data?.type==='bridge') frame.contentWindow.postMessage({type:'init',source},'*');
          if (data?.type==='ready') { clearTimeout(this.timer); this.pending=null; this.status('Python gotowy'); resolve(); }
          if (data?.type==='failure') { console.error(data.message || 'Nie udało się uruchomić wątku Python.'); this.fail('LOAD'); }
          if (data?.type==='result' && this.pending?.id===data.id) {
            clearTimeout(this.timer); const p=this.pending; this.pending=null; p.resolve(data.results);
          }
        };
        window.addEventListener('message',this.listener);
        frame.srcdoc=`<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'wasm-unsafe-eval' blob: https://unpkg.com; worker-src blob:; connect-src https://unpkg.com;"><script>
          let worker;
          addEventListener('message',e=>{
            if(e.source!==parent) return;
            if(e.data.type==='init' && !worker){
              const url=URL.createObjectURL(new Blob([e.data.source],{type:'text/javascript'}));
              try {worker=new Worker(url);
                worker.onmessage=m=>parent.postMessage(m.data,'*');
                worker.onerror=e=>parent.postMessage({type:'failure',message:e.message},'*');
              } catch (e) {parent.postMessage({type:'failure',message:String(e)},'*');}
            } else if(e.data.type==='run') worker?.postMessage(e.data);
          });
          parent.postMessage({type:'bridge'},'*');
        <\/script>`;
        document.body.append(frame);
      } catch {if(generation===this.generation)this.fail('LOAD');}
    });
    return this.ready;
  }
  fail(reason) {
    const pending=this.pending; this.pending=null; this.stop();
    this.status(reason==='TIMEOUT'?'Program zatrzymany — przekroczony czas.':'Python nie jest jeszcze gotowy.');
    pending?.reject(new Error(reason));
  }
  async run(payload) {
    await this.load();
    return new Promise((resolve,reject)=>{
      const id=++this.serial;
      this.pending={id,resolve,reject};
      this.timer=setTimeout(()=>this.fail('TIMEOUT'),6000);
      this.frame.contentWindow.postMessage({type:'run',id,payload},'*');
    });
  }
}
