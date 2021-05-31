import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCsz_hACON1tbIDLzF1UMjjqvz-rJ9GqCI",
    authDomain: "bartersystem-3b237.firebaseapp.com",
    projectId: "bartersystem-3b237",
    storageBucket: "bartersystem-3b237.appspot.com",
    messagingSenderId: "21101555883",
    appId: "1:21101555883:web:96f248f21ae0afa29c07ee"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();