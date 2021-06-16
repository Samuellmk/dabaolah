import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLDKPM7jvgAgNgcDF-_ASSX2_2IkXCQGk",
    authDomain: "dabaolah-258a4.firebaseapp.com",
    projectId: "dabaolah-258a4",
    storageBucket: "dabaolah-258a4.appspot.com",
    messagingSenderId: "986383078340",
    appId: "1:986383078340:web:a67fa4803958ed38120a91",
    measurementId: "G-5NRJKK4V7N"
};

firebase.initializeApp(firebaseConfig);
export default firebase;

// to read firestore, just include this line in the file you want to read the db:
// import firebase from "pathToDatabaseFolder/database/firestoreDB"