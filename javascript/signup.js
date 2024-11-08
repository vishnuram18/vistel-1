// Import the Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJKSXv32xRhwfdEZPBl4h5NGKBV6PSBTo",
  authDomain: "vistel-aa166.firebaseapp.com",
  projectId: "vistel-aa166",
  storageBucket: "vistel-aa166.appspot.com",
  messagingSenderId: "866833870372",
  appId: "1:866833870372:web:968919efd2d0430672b2b1",
  measurementId: "G-SR4078H6SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle the signup form submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from refreshing the page

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Create a new user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("User signed up successfully!");
      console.log("User info:", user);
      // Redirect or perform other actions here
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});
