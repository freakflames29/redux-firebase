// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBDhYcdNxFNwQ5OF_nCMYs-4tTO1ZNUFvg",
  authDomain: "reduxlogin-90a07.firebaseapp.com",
  projectId: "reduxlogin-90a07",
  storageBucket: "reduxlogin-90a07.firebasestorage.app",
  messagingSenderId: "643631933918",
  appId: "1:643631933918:web:78a8ff5cc62c33a334d54f",
};

// Initialize Firebase
const FireApp = initializeApp(firebaseConfig);
export const FireAuth = getAuth(FireApp);
export const FireDB = getFirestore(FireApp);
