// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "electroflow-74bzj",
  appId: "1:581265386004:web:75a5e025b338820aae1501",
  storageBucket: "electroflow-74bzj.firebasestorage.app",
  apiKey: "AIzaSyCIYCXssMUNYJdlOr_NN7F-aZ43CUVxPw0",
  authDomain: "electroflow-74bzj.firebaseapp.com",
  messagingSenderId: "581265386004"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
