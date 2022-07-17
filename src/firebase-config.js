// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1SCuGJLTDpwGTSgk26VfcPqM9rsBOKaY",
  authDomain: "spotter-e8911.firebaseapp.com",
  projectId: "spotter-e8911",
  storageBucket: "spotter-e8911.appspot.com",
  messagingSenderId: "542771962630",
  appId: "1:542771962630:web:b213f8968c9af6e11a3487"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();