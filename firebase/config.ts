// Import the functions you need from the SDKs you need

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsEKOILoK2KVyFiOEvSghxdMrZ3tGkMWs",
  authDomain: "showcaseai-75e82.firebaseapp.com",
  projectId: "showcaseai-75e82",
  storageBucket: "showcaseai-75e82.appspot.com",
  messagingSenderId: "405966938321",
  appId: "1:405966938321:web:6b0567afce84e5f0d065f0",
  measurementId: "G-R1BWYY1GPB",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore();
export default firebase_app;

export const auth = getAuth(firebase_app);
