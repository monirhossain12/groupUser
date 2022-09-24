import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAacLOKlCpTp_BvBnORtB9TlZrz7zV7hG0",
    authDomain: "grouping-b95a4.firebaseapp.com",
    projectId: "grouping-b95a4",
    storageBucket: "grouping-b95a4.appspot.com",
    messagingSenderId: "497578421581",
    appId: "1:497578421581:web:9b8d387c04ce5799f55b04",
    measurementId: "G-VKHZHMR782"
  };

  const app= initializeApp(firebaseConfig);
  export const auth= getAuth(app);

  export const db=getFirestore()