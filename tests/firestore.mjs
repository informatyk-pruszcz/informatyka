// Wyłącznie lokalny emulator projektu demonstracyjnego, bez danych szkoły.
import assert from 'node:assert/strict';
const project = 'demo-informatyka';
const base = 'http://127.0.0.1:8194';
const root = 'projects/'+project+'/databases/(default)/documents';
const doc = root+'/school/content';
const uid = 'AGOOU43jEYaHaB5BCqw4wpWiqax1';
const part = obj => Buffer.from(JSON.stringify(obj)).toString('base64url');
function token(user) {
  const now = Math.floor(Date.now()/1000);
  return part({alg:'none',typ:'JWT'})+'.'+part({iss:'https://securetoken.google.com/'+project,aud:project,sub:user,user_id:user,iat:now,exp:now+3600,auth_time:now,firebase:{sign_in_provider:'google.com'}})+'.';
}
async function write(user, revision, title) {
  return fetch(base+'/v1/'+root+':commit', {method:'POST',headers:{
    'Content-Type':'application/json', ...(user?{Authorization:'Bearer '+token(user)}:{})
  }, body:JSON.stringify({writes:[{update:{name:doc,fields:{
    version:{integerValue:1},revision:{integerValue:revision},items:{arrayValue:{values:[{stringValue:title}]}}
  }},updateTransforms:[{fieldPath:'updatedAt',setToServerValue:'REQUEST_TIME'}]}]})});
}
await fetch(base+'/emulator/v1/'+root,{method:'DELETE'});
assert.equal((await write(null,1,'x')).status,403);
assert.equal((await write('inny-uid',1,'x')).status,403);
assert.equal((await write(uid,1,'start')).status,200);
const updates=await Promise.all(['A','B'].map(x=>write(uid,2,x)));
assert.deepEqual(updates.map(x=>x.status).sort(),[200,403]);
const saved=await (await fetch(base+'/v1/'+doc)).json();
assert.equal(saved.fields.revision.integerValue,'2');
assert.equal(saved.fields.items.arrayValue.values[0].stringValue,['A','B'][updates.findIndex(x=>x.ok)]);
console.log('OK: zapis nauczyciela, odmowa innemu UID i anonimowemu, konflikt rewizji.');
