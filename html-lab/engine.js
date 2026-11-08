const PARK_SVG='<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="#dcefe8"/><circle cx="510" cy="78" r="38" fill="#f6d88a"/><path d="M0 255Q160 170 320 250T640 230V360H0" fill="#9fc3a2"/><path d="M290 360Q220 300 340 260T400 218" fill="none" stroke="#ecd9b0" stroke-width="52"/><g fill="#2b755b"><path d="M75 257h100L125 90z"/><path d="M160 246h105L212 66z"/><path d="M435 265h110L490 113z"/></g><g stroke="#786746" stroke-width="12"><path d="M125 225v65M212 215v62M490 234v53"/></g></svg>';
const PARK_DATA='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(PARK_SVG);
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function parseHTML(code){return new DOMParser().parseFromString(code,'text/html');}
function inspect(code,lesson){
 const doc=parseHTML(code);const scan=scanSource(code), notes=scan.problems.map(p=>p.msg);
 const results=lesson.rules.map(r=>{const els=[...doc.querySelectorAll(r.selector)].filter(el=>{
  if(!['IMG','META'].includes(el.tagName)&&!el.textContent.trim())return false;
  if(r.attr==='css-color')return !!el.style.color;
  if(r.attr){const actual=(el.getAttribute(r.attr)||'').trim();return r.value==='*'?!!actual:actual===r.value;}
  return true;
 });return {label:r.label,ok:els.length>=r.min};});
 if(lesson.full){results.push({label:'Dokument ma DOCTYPE HTML5, html lang="pl", head, body i UTF-8.',ok:/<!doctype\s+html\s*>/i.test(code)&&/<html\b/i.test(code)&&doc.documentElement.lang==='pl'&&/<head\b/i.test(code)&&/<body\b/i.test(code)&&!!doc.querySelector('meta[charset="UTF-8" i]')});}
 if(doc.querySelector('script,iframe,object,embed,form,base')||[...doc.querySelectorAll('*')].some(el=>[...el.attributes].some(a=>/^on/i.test(a.name))))notes.push('W tym ćwiczeniu używaj HTML i CSS bez skryptów, formularzy i osadzonych stron.');
 results.push({label:'Znaczniki mają poprawną kolejność i jawne zamknięcia.',ok:notes.length===0});
 return {results,notes,scan,ok:results.every(r=>r.ok)};
}
function cleanDocument(code,preview=true){
 const doc=parseHTML(code);
 doc.querySelectorAll('script,iframe,object,embed,base,link,form,input,button,textarea,select,template,svg,math,video,audio,source').forEach(el=>el.remove());
 doc.querySelectorAll('meta').forEach(el=>{if(!el.hasAttribute('charset'))el.remove();});
 for(const el of doc.querySelectorAll('*'))for(const a of [...el.attributes])if(/^on/i.test(a.name)||['srcdoc','srcset','action','formaction','ping','target','download','autofocus','contenteditable','is','background','xlink:href'].includes(a.name))el.removeAttribute(a.name);
 for(const img of doc.querySelectorAll('img')){const src=(img.getAttribute('src')||'').trim();if(src==='park.svg'||src==='./park.svg')img.setAttribute('src',PARK_DATA);else if(!/^data:image\/(png|jpeg|gif|webp);base64,[a-zA-Z0-9+/=]+$/.test(src))img.removeAttribute('src');}
 for(const a of doc.querySelectorAll('a')){const href=a.getAttribute('href')||'';if(!/^#[\w-]+$/.test(href)){if(preview||!/^https:\/\//i.test(href)){a.removeAttribute('href');a.setAttribute('title','Link zewnętrzny sprawdzisz po pobraniu HTML.');a.style.textDecoration='underline';a.style.color='#166b8a';}else a.setAttribute('rel','noopener noreferrer');}}
 const meta=doc.createElement('meta');meta.setAttribute('http-equiv','Content-Security-Policy');meta.setAttribute('content',"default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'");doc.head.prepend(meta);
 if(!doc.querySelector('meta[charset]')){const m=doc.createElement('meta');m.setAttribute('charset','utf-8');doc.head.prepend(m);}
 const viewport=doc.createElement('meta');viewport.name='viewport';viewport.content='width=device-width, initial-scale=1';doc.head.append(viewport);
 const style=doc.createElement('style');style.textContent='body{font-family:system-ui,sans-serif;line-height:1.6;margin:24px;color:#263e46;background:white;overflow-wrap:anywhere}img{max-width:100%;height:auto}table{border-collapse:collapse}td,th{border:1px solid #bdd0cc;padding:8px}h1{line-height:1.25}a{color:#167765}';doc.head.insertBefore(style,doc.head.querySelector('style'));
 return {html:'<!DOCTYPE html>\n'+doc.documentElement.outerHTML,title:doc.title.trim()||'index.html'};
}
