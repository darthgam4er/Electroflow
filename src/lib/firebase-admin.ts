import { config } from 'dotenv';
config();
import admin from 'firebase-admin';

const firebaseConfig = {
  projectId: "electroflow-74bzj",
  appId: "1:581265386004:web:75a5e025b338820aae1501",
  storageBucket: "electroflow-74bzj.appspot.com",
  apiKey: "AIzaSyCIYCXssMUNYJdlOr_NN7F-aZ43CUVxPw0",
  authDomain: "electroflow-74bzj.firebaseapp.com",
  messagingSenderId: "581265386004"
};

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

let adminApp: admin.app.App | null = null;
let adminDb: admin.firestore.Firestore | null = null;
let adminStorage: admin.storage.Storage | null = null;

if (!admin.apps.length) {
  if (projectId && clientEmail && privateKey) {
    try {
      adminApp = admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
        }),
        storageBucket: firebaseConfig.storageBucket,
      });
      console.log("Firebase Admin SDK initialized successfully.");
      
      // Initialize services
      adminDb = admin.firestore();
      adminStorage = admin.storage();
      
    } catch (error) {
       console.error("Firebase Admin SDK initialization failed:", error);
    }
  } else {
     if (process.env.NODE_ENV !== 'production') {
        console.warn(
          '\x1b[31m%s\x1b[0m', // Red text
          'Firebase Admin SDK environment variables not set. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env file. Skipping Firebase Admin initialization.'
        );
      }
  }
} else {
  // Use existing app
  adminApp = admin.app();
  adminDb = admin.firestore();
  adminStorage = admin.storage();
}

export { adminDb, adminStorage, adminApp };
