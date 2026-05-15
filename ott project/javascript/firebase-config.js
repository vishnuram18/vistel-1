import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCJKSXv32xRhwfdEZPBl4h5NGKBV6PSBTo",
    authDomain: "vistel-aa166.firebaseapp.com",
    projectId: "vistel-aa166",
    storageBucket: "vistel-aa166.appspot.com",
    messagingSenderId: "866833870372",
    appId: "1:866833870372:web:968919efd2d0430672b2b1",
    measurementId: "G-SR4078H6SP"
};

// vistel-e74f6 — Realtime Database for live catalog, progress sync, and notifications
const rtdbConfig = {
    apiKey: "AIzaSyBXyDCoUP6Z6wfzzapjwm0DbjSkKXGnDlg",
    authDomain: "vistel-e74f6.firebaseapp.com",
    databaseURL: "https://vistel-e74f6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vistel-e74f6",
    storageBucket: "vistel-e74f6.firebasestorage.app",
    messagingSenderId: "383206483627"
};

export const app = initializeApp(firebaseConfig);

const rtdbApp = initializeApp(rtdbConfig, "vistel-rtdb");
export const rtdb = getDatabase(rtdbApp);
