// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwg07BAugBCYM6HvJN0keS5zTZSuSLx5Q",
  authDomain: "my-2nd-todoapp.firebaseapp.com",
  projectId: "my-2nd-todoapp",
  storageBucket: "my-2nd-todoapp.firebasestorage.app",
  messagingSenderId: "137193907158",
  appId: "1:137193907158:web:d4bb47bd8c2119a9cffa77",
  measurementId: "G-D6FSY8YN0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;