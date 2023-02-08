// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAJFffj09fTNQtShddH_4C2JdWBlTl5S4c",
  authDomain: "project-2814602599416604581.firebaseapp.com",
  projectId: "project-2814602599416604581",
  storageBucket: "project-2814602599416604581.appspot.com",
  messagingSenderId: "245332593669",
  appId: "1:245332593669:web:56c28d783c169ee580a06c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()