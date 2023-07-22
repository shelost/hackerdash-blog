// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbY0CqxBtBhVyiFxtKAVslpO1MQpCgukU",
  authDomain: "hackerdash-io.firebaseapp.com",
  projectId: "hackerdash-io",
  storageBucket: "hackerdash-io.appspot.com",
  messagingSenderId: "1041444021793",
  appId: "1:1041444021793:web:444f4d67bbb08692b26560",
  measurementId: "G-FSZ5XVMV51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);