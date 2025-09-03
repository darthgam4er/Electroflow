
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "electroflow-74bzj",
  appId: "1:581265386004:web:75a5e025b338820aae1501",
  storageBucket: "electroflow-74bzj.appspot.com",
  apiKey: "AIzaSyCIYCXssMUNYJdlOr_NN7F-aZ43CUVxPw0",
  authDomain: "electroflow-74bzj.firebaseapp.com",
  messagingSenderId: "581265386004"
};


// Initialize Firebase client app if it doesn't already exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
