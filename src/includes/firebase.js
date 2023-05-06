import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGzZ9q08PmNtiJZv4MA72IrQB33DqArl8",
    authDomain: "music-vue-1b86e.firebaseapp.com",
    projectId: "music-vue-1b86e",
    storageBucket: "music-vue-1b86e.appspot.com",
    messagingSenderId: "8326726481",
    appId: "1:8326726481:web:e4e23242d4a0772592c970"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export { auth, db, usersCollection };