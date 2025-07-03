// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsUsUgEeMOdHCE9ALBJOSkR7QNQhjoM9w",
  authDomain: "mindflare-quotegenerator.firebaseapp.com",
  projectId: "mindflare-quotegenerator",
  storageBucket: "mindflare-quotegenerator.firebasestorage.app",
  messagingSenderId: "93965804426",
  appId: "1:93965804426:web:a0832b0bf7155fe338de73",
  measurementId: "G-L3572D4LQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);