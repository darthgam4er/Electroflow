// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import admin from 'firebase-admin';

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


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
            storageBucket: firebaseConfig.storageBucket,
        });
        console.log("Firebase Admin SDK initialized.");
    } catch (error: any) {
        console.error("Firebase Admin SDK initialization error: ", error.message);
    }
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage();
