// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyEaPAca6Kw_syMFZuTXa5inhpFGLf8yE",
  authDomain: "todoapp-56886.firebaseapp.com",
  projectId: "todoapp-56886",
  storageBucket: "todoapp-56886.appspot.com",
  messagingSenderId: "162587183186",
  appId: "1:162587183186:web:2cc9f3813b8f5eae38378b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
