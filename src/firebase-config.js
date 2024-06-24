// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK0c673AvGjKsnMssl-kNVhFMYkXe3Hsw",
  authDomain: "recer-habi.firebaseapp.com",
  projectId: "recer-habi",
  storageBucket: "recer-habi.appspot.com",
  messagingSenderId: "941307730514",
  appId: "1:941307730514:web:534149a075bc5256b99d8b",
  measurementId: "G-VQRRMHEGY1"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };