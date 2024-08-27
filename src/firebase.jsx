// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYfL3WNq2TR_HyyDPx2oci6BjGdueDyjI",
  authDomain: "todo-app-9a5db.firebaseapp.com",
  projectId: "todo-app-9a5db",
  storageBucket: "todo-app-9a5db.appspot.com",
  messagingSenderId: "681398300454",
  appId: "1:681398300454:web:134a251169c88179665be7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db