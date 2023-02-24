import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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

const fireBaseApp = firebase.initializeApp(firebaseConfig)
const db = fireBaseApp.firestore();
const auth = firebase.auth();


export { db, auth };