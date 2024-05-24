// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
///////////////////add by me//////////////////////
import {getAuth} from "firebase/auth"
import { collection,getFirestore } from "firebase/firestore";
///////////////////////////////////////////////
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlg7AHbBeO_9LDfgJxHOAHuXYjzzjU9eg",
  authDomain: "videochat-a54f4.firebaseapp.com",
  projectId: "videochat-a54f4",
  storageBucket: "videochat-a54f4.appspot.com",
  messagingSenderId: "275629148061",
  appId: "1:275629148061:web:ade4bf9a903a5a75849174",
  measurementId: "G-HK937NB8JQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebaseAuth=getAuth(app);
export const firebaseDB=getFirestore(app);

export const userRef=collection(firebaseDB,"users");
export const meetingsRef=collection(firebaseDB,"meetings")