import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDYLkvOoJJCwW2uUeAUxBrJEb-kHOJ5CVc",
  authDomain: "kipboiz-app.firebaseapp.com",
  databaseURL: "https://kipboiz-app.firebaseio.com",
  projectId: "kipboiz-app",
  storageBucket: "kipboiz-app.appspot.com",
  messagingSenderId: "912428603607"
};

const fb = firebase
  .initializeApp(firebaseConfig)
  .database()
  .ref();

export default fb;
