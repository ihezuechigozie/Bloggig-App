
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBYn1ohppOj1Eer_hg-Xgj5PccQsyDL4qc",
  authDomain: "blogpost-app-c3546.firebaseapp.com",
  projectId: "blogpost-app-c3546",
  // storageBucket: "blogpost-app-c3546.firebasestorage.app",
  storageBucket: "blogpost-app-c3546.appspot.com",
  messagingSenderId: "448408613479",
  appId: "1:448408613479:web:f0f41b8e30f5e75fa89ac2",
  measurementId: "G-S8NSJFB6VJ"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

