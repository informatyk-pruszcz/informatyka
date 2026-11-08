let auth,db,fs,au,ref;
export async function connectCloud(onData,onStatus,onTeacherChanged){
 if(!window.FIREBASE_CONFIG)return null;
 const [app,f,a]=await Promise.all([import('https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js'),import('https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js')]);
 fs=f;au=a;const instance=app.initializeApp(window.FIREBASE_CONFIG);db=f.getFirestore(instance);auth=a.getAuth(instance);await a.setPersistence(auth,a.browserSessionPersistence);ref=f.doc(db,'school','content');
 f.onSnapshot(ref,s=>{if(!s.metadata.hasPendingWrites)onData(s.exists()?s.data():{version:1,items:null,revision:0});},()=>onStatus('Chmura niedostępna — zachowano kopię lokalną'));
 const isTeacher = user => Boolean(user && window.TEACHER_UID && user.uid === window.TEACHER_UID);
 a.onAuthStateChanged(auth,user=>{
   const allowed=isTeacher(user);
   onStatus(allowed?'Zalogowano nauczyciela':'Chmura: dostęp ucznia');
   onTeacherChanged(allowed);
 });
 async function requireTeacher(result){
   if(isTeacher(result.user)) return;
   await a.signOut(auth);
   throw Error('To konto nie ma uprawnień nauczyciela.');
 }
 auth.languageCode='pl';
 return {login:async(email,password)=>requireTeacher(await a.signInWithEmailAndPassword(auth,email,password)),
 googleLogin:async()=>requireTeacher(await a.signInWithPopup(auth,new a.GoogleAuthProvider())),
 resetPassword:email=>a.sendPasswordResetEmail(auth,email),
 logout:()=>a.signOut(auth),isTeacher:()=>!!auth.currentUser&&auth.currentUser.uid===window.TEACHER_UID,
 publish:async(data,revision)=>{if(!auth.currentUser||auth.currentUser.uid!==window.TEACHER_UID)throw Error('Zaloguj się kontem nauczyciela.');await f.runTransaction(db,async tx=>{const snap=await tx.get(ref);const current=snap.exists()?(snap.data().revision||0):0;if(current!==revision)throw Error('Konflikt wersji. Wyeksportuj swoją kopię i pobierz aktualną bazę z chmury przed ponowną edycją.');tx.set(ref,{...data,revision:current+1,updatedAt:f.serverTimestamp()});});return revision+1;}
 };
}
