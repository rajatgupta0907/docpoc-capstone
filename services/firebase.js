
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3aSqxq4Z9xmBdxB4wFldc5NZYO5rbnIE",
  authDomain: "docpoc-3baf0.firebaseapp.com",
  projectId: "docpoc-3baf0",
  storageBucket: "docpoc-3baf0.appspot.com",
  messagingSenderId: "544261037149",
  appId: "1:544261037149:web:8e7c6be7e7bfec896dc1b4",
  measurementId: "G-ZZ63MY61WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const mystorage = getStorage(app);