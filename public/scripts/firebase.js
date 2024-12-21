// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmkbq_NuuSJZFVuHKAigJl1-f4slYAlAk",
  authDomain: "spicy-chat-076506.firebaseapp.com",
  projectId: "spicy-chat-076506",
  storageBucket: "spicy-chat-076506.firebasestorage.app",
  messagingSenderId: "640260252739",
  appId: "1:640260252739:web:2134dee1e27d561176e0f6",
  measurementId: "G-TEVK0L02YK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

async function getDocument(db, collectionName, docID) {
  const ref = doc(db, collectionName, docID);
  const document = await getDoc(ref);

  if (document.exists()) {
    console.log(`Firebase Cloud Firestore Data from '${collectionName}': ${document.data()}`);
  } else {
    const e = `Firebase Cloud Firestore Document '${docID}' from collection '${collectionName}' does not exist.`;
    console.error(e);
    throw new FirebaseError('document-not-found', e);
  }
}