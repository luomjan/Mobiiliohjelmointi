// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAPRmjqyVkawmGxpcJyy29moa2m5QN1tA",
  authDomain: "mobiiliohjelmtointi.firebaseapp.com",
  databaseURL: "https://mobiiliohjelmtointi-default-rtdb.firebaseio.com",
  projectId: "mobiiliohjelmtointi",
  storageBucket: "mobiiliohjelmtointi.firebasestorage.app",
  messagingSenderId: "689975499407",
  appId: "1:689975499407:web:92846db009b7789a74eefa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);