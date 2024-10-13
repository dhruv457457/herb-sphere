// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Auth SDK

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoFQDW1-Bm-Ziy0i8PVuLWFDWdhQPiAnc",
  authDomain: "ayurherb-b8db6.firebaseapp.com",
  projectId: "ayurherb-b8db6",
  storageBucket: "ayurherb-b8db6.appspot.com",
  messagingSenderId: "267583134483",
  appId: "1:267583134483:web:521cdd00b1a41523f718e6",
  measurementId: "G-HPH8BYHRK7" // Optional, only needed for Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

// Now you can use the 'auth' object for authentication operations
export { auth };
