// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRQglcu0sOQEcd1UPL-Zfp4_CmSB0B954",
  authDomain: "react-native-app-936f6.firebaseapp.com",
  projectId: "react-native-app-936f6",
  storageBucket: "react-native-app-936f6.appspot.com",
  messagingSenderId: "600488136818",
  appId: "1:600488136818:web:83b49b6eaa21b884e6b2eb",
  measurementId: "G-G8FYG1NGN9"
};

// Initialize Firebase

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); 
}

const auth = getAuth(app);

export { auth };

