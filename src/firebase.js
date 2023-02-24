import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5iXIwU7xxKFX5rJnuz5LbMzPgYrxPH5I",
    authDomain: "seehawk-9b59d.firebaseapp.com",
    projectId: "seehawk-9b59d",
    storageBucket: "seehawk-9b59d.appspot.com",
    messagingSenderId: "1042898470919",
    appId: "1:1042898470919:web:958c5dcb9d36d9522602a2",
    measurementId: "G-CBM8311R0T"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };