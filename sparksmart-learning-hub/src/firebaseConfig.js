import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMsiL4J0x7cbie4Tm7QNkt7Cs6dpHFtZo",
  authDomain: "bright-sparks-22e8c.firebaseapp.com",
  projectId: "bright-sparks-22e8c",
  storageBucket: "bright-sparks-22e8c.appspot.com",
  messagingSenderId: "151742280856",
  appId: "1:151742280856:web:1886c4ef1042e16c87cced",
  measurementId: "G-HPEJEXS2G8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };