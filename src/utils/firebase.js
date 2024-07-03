// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, getRedirectResult, signInWithPopup} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDQTNBBQCb8rYF4URYqtzGE8iLgjy1bEVk",
  authDomain: "presente-c85c5.firebaseapp.com",
  projectId: "presente-c85c5",
  storageBucket: "presente-c85c5.appspot.com",
  messagingSenderId: "769680654603",
  appId: "1:769680654603:web:765ad879e9af460ba7e20e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider=new GoogleAuthProvider();

export {signInWithPopup, auth, provider, getRedirectResult, GoogleAuthProvider}
