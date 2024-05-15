// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'; // Importe a funÃ§Ã£o getFirestore para acessar o Firestore
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAosdSZIabk3OX5gK6QB6kPNl24ukw7l2k",
  authDomain: "book-match-596c1.firebaseapp.com",
  projectId: "book-match-596c1",
  storageBucket: "book-match-596c1.appspot.com",
  messagingSenderId: "665300322044",
  appId: "1:665300322044:web:a73e3403f95eb948b83979"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Obtenha uma instÃ¢ncia do Firestore
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore,auth }; // Exporte o objeto firestore para que ele possa ser importado em outros arquivos