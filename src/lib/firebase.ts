import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj_RQp8I7hu_vQaNAZ73Or2xezVPkdNOE",
  authDomain: "simsem-admin-dashboard.firebaseapp.com",
  projectId: "simsem-admin-dashboard",
  storageBucket: "simsem-admin-dashboard.firebasestorage.app",
  messagingSenderId: "280723965248",
  appId: "1:280723965248:web:e2a2255de29c744d85e6a5",
  measurementId: "G-C62G8L2HQJ"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
