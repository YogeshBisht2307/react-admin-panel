import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDo8Zei6cvT6INAdA6Tt2AGZdveS0_zHb8",
    authDomain: "portfolio-application-25dc0.firebaseapp.com",
    projectId: "portfolio-application-25dc0",
    storageBucket: "portfolio-application-25dc0.appspot.com",
    messagingSenderId: "645878747041",
    appId: "1:645878747041:web:d8f685e6daa8ce524585e0",
    measurementId: "G-V9Q463Q118",
    databaseURL: "https://portfolio-application-25dc0-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  Initialize authentication
const authentication = getAuth();
// Get a reference to the database service
const database = getDatabase(app);
// get a reference to the storage service
const storage = getStorage(app);

export {
    app,
    authentication,
    database as db,
    storage,
};