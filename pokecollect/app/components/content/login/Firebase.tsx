// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pokecollect-d3e1a.firebaseapp.com",
  projectId: "pokecollect-d3e1a",
  storageBucket: "pokecollect-d3e1a.appspot.com",
  messagingSenderId: "172498984403",
  appId: "1:172498984403:web:278c02ff29e95635eba326",
  measurementId: "G-690XPQBJ1B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
