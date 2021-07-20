 import firebase from "firebase";
 import "firebase/firebase-firestore"
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyC0Kc04JgYoORnvPmR9feUxOAPwB3nBya0",
    authDomain: "chapsnat-danny.firebaseapp.com",
    projectId: "chapsnat-danny",
    storageBucket: "chapsnat-danny.appspot.com",
    messagingSenderId: "497768479786",
    appId: "1:497768479786:web:bbf74c64ba22ee97711753"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let firestore = firebase.firestore();

  export default firestore;