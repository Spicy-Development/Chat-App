// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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