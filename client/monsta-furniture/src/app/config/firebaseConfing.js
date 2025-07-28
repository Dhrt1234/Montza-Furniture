// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1puCd1dVdqTt2ac3iJKbESvII14ggmBw",
  authDomain: "monsta-furniture.firebaseapp.com",
  projectId: "monsta-furniture",
  storageBucket: "monsta-furniture.firebasestorage.app",
  messagingSenderId: "941224989215",
  appId: "1:941224989215:web:24573546d99151b563fb2a",
  measurementId: "G-26374E39GV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
