import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBkX18PD0SbYip0JlwvSg9g2pa-Pg2wjAM",
  authDomain: "coda-rn-test.firebaseapp.com",
  databaseURL: "https://coda-rn-test.firebaseio.com",
  projectId: "coda-rn-test",
  storageBucket: "coda-rn-test.appspot.com",
  messagingSenderId: "336379074307",
  appId: "1:336379074307:ios:5ac92f1a2905430c5e7b36",
};

initializeApp(firebaseConfig);

export default firebase;
