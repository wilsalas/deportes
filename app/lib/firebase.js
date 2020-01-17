
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCOn8LKNc66jUWNY-zuQ5sgk8bhubbVi34",
    authDomain: "deportes-b80a5.firebaseapp.com",
    databaseURL: "https://deportes-b80a5.firebaseio.com",
    projectId: "deportes-b80a5",
    storageBucket: "deportes-b80a5.appspot.com",
    messagingSenderId: "464563421830",
    appId: "1:464563421830:web:c3e55b3ab7f15dc5e8c707",
    measurementId: "G-VMJSR3RH5H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;  