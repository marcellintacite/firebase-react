import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBX7cux5mujwFpVUFRHSIpX3fYjI24N1OQ",
  authDomain: "react-firebase-a-85d39.firebaseapp.com",
  databaseURL: "https://react-firebase-a-85d39-default-rtdb.firebaseio.com",
  projectId: "react-firebase-a-85d39",
  storageBucket: "react-firebase-a-85d39.appspot.com",
  messagingSenderId: "176141384855",
  appId: "1:176141384855:web:18045f4cc38beb66bc3dd2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const facePovider = new FacebookAuthProvider()