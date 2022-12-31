// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth/cordova"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIhIS_GajhsHaoZASraoXMuSbcRiNGND0",
  authDomain: "odta-projet.firebaseapp.com",
  databaseURL: "https://odta-projet-default-rtdb.firebaseio.com",
  projectId: "odta-projet",
  storageBucket: "odta-projet.appspot.com",
  messagingSenderId: "696948107068",
  appId: "1:696948107068:web:0d27b439e4a9541e17a039",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)
const auth = getAuth(app)
export { db, storage, auth };
