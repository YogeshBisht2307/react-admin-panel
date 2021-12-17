import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDo8Zei6cvT6INAdA6Tt2AGZdveS0_zHb8",
    authDomain: "portfolio-application-25dc0.firebaseapp.com",
    projectId: "portfolio-application-25dc0",
    storageBucket: "portfolio-application-25dc0.appspot.com",
    messagingSenderId: "645878747041",
    appId: "1:645878747041:web:d8f685e6daa8ce524585e0",
    measurementId: "G-V9Q463Q118"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  Initialize authentication
const authentication = getAuth();

export {
    app,
    authentication
};