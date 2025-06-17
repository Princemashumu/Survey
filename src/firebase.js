// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTPXDbP0BNvrF6tYVesFn4HNU5weVNcYk",
  authDomain: "surveyform-30ad8.firebaseapp.com",
  projectId: "surveyform-30ad8",
  storageBucket: "surveyform-30ad8.firebasestorage.app",
  messagingSenderId: "1085070629755",
  appId: "1:1085070629755:web:f4c5e9f13703ac9cc0bbde",
  measurementId: "G-HH5TC5JJMV"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };