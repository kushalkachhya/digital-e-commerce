// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "digital-e-commerce-e7093.firebaseapp.com",
  projectId: "digital-e-commerce-e7093",
  storageBucket: "digital-e-commerce-e7093.firebasestorage.app",
  messagingSenderId: "812541484167",
  appId: "1:812541484167:web:1f418bb071fb7af76b6c22",
  measurementId: "G-5MXEZ24GYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);