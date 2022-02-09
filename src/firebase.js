// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0K1j5fkfTdxn3gOHop3nZw8I3Vta60uk",
  authDomain: "crud-react-a3f31.firebaseapp.com",
  projectId: "crud-react-a3f31",
  storageBucket: "crud-react-a3f31.appspot.com",
  messagingSenderId: "99094195327",
  appId: "1:99094195327:web:11e4eb45e5356e3bdca34a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)