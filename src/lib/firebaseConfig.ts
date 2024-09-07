import { getApp, initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browser } from "$app/environment";
import { getAuth } from 'firebase/auth';
import { getFirestore }  from 'firebase/firestore';
import { getStorage }  from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0nKoWPwXYbfY-P4kC_q2X_ZIovDNvx44",
  authDomain: "novastrato-a253c.firebaseapp.com",
  projectId: "novastrato-a253c",
  storageBucket: "novastrato-a253c.appspot.com",
  messagingSenderId: "969469376909",
  appId: "1:969469376909:web:2e7abc477d3117878de5c4",
  measurementId: "G-W7GKZEYHYP"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
if(browser){
    getAnalytics(app);
}
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app);

export { auth, db, storage };