// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Auth SDK
import { getDatabase } from "firebase/database"; // Import Realtime Database SDK

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoFQDW1-Bm-Ziy0i8PVuLWFDWdhQPiAnc",
  authDomain: "ayurherb-b8db6.firebaseapp.com",
  projectId: "ayurherb-b8db6",
  storageBucket: "ayurherb-b8db6.appspot.com",
  messagingSenderId: "267583134483",
  appId: "1:267583134483:web:521cdd00b1a41523f718e6",
  measurementId: "G-HPH8BYHRK7", // Optional, only needed for Analytics
  databaseURL: "https://ayurherb-b8db6-default-rtdb.firebaseio.com/" // Add the Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Initialize Firebase Authentication
const database = getDatabase(app); // Initialize Firebase Realtime Database

// Export Firebase services
export { app, auth, database }; // Include app export if needed
