'use strict';
const pilots = {};
const $ = selector => document.querySelector(selector);
function escapeText(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function table(headers, rows) {
  return '<div class="scroll"><table><thead><tr>'+headers.map(h=>'<th scope="col">'+escapeText(h)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(v=>'<td>'+escapeText(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
}
function message(text) { $('#feedback').textContent = text; }
function downloadable(name, text, type) {
  const url = URL.createObjectURL(new Blob([text],{type}));
  const link = document.createElement('a');
  link.href=url; link.download=name; link.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function stored(key, defaultValue) { try { return JSON.parse(sessionStorage.getItem('inf-pilots:'+key)) ?? defaultValue; } catch { return defaultValue; } }
function remember(key, value) { try { sessionStorage.setItem('inf-pilots:'+key,JSON.stringify(value)); } catch {} }
function random(seed) { let k=seed; return () => (k=(Math.imul(k,1664525)+1013904223)>>>0)/4294967296; }
function shuffled(values,seed) {const arr=[...values],rng=random(seed); for(let i=arr.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr;}
function keyOf(id,index) { return id+'/'+(index+1); }
function refresh() { const draft = state(); remember(routeKey(),draft); show(false); }
let active = {id:'algorytmy', index:0}, currentDraft;
const state = () => currentDraft;
const routeKey = () => keyOf(active.id,active.index);
function saveDraft() { remember(routeKey(),currentDraft); }
function options(items, selected) { return items.map(([v,t])=>'<option value="'+escapeText(v)+'"'+(String(v)===String(selected)?' selected':'')+'>'+escapeText(t)+'</option>').join(''); }
function field(id,label,defaultValue='') {
  const value = state()[id] ?? defaultValue;
  return '<label>'+escapeText(label)+' <input id="'+id+'" data-field="'+id+'" value="'+escapeText(value)+'" autocomplete="off"></label>';
}
document.addEventListener('input',e=>{if(e.target.dataset.field){state()[e.target.dataset.field]=e.target.value;saveDraft()}});
