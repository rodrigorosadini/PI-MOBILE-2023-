import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// IMPLEMENTANDO FIREBASE

const firebaseConfig = {
  apiKey: "AIzaSyBA4JdPTY21NKnWkzEpcIcl-dgO5wr4_mA",
  authDomain: "mobile-a0b82.firebaseapp.com",
  projectId: "mobile-a0b82",
  storageBucket: "mobile-a0b82.appspot.com",
  messagingSenderId: "290051192512",
  appId: "1:290051192512:web:b169de5afe7e85905b9f25",
  measurementId: "G-NNKB7J180G",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

//database

const db = getFirestore();

export { auth, db };
