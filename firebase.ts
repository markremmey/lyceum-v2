// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX19s3QyfsVdYhsJP2kBrX6bJBsFtmdk0",
  authDomain: "lyceum-2.firebaseapp.com",
  projectId: "lyceum-2",
  storageBucket: "lyceum-2.appspot.com",
  messagingSenderId: "214435596409",
  appId: "1:214435596409:web:a431f497a7d107f9cdaca8"
};

// Initialize Firebase - this is singleton pattern
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };