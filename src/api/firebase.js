import firebase from "firebase/app";
import "firebase/database";
// import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDYLkvOoJJCwW2uUeAUxBrJEb-kHOJ5CVc",
  authDomain: "kipboiz-app.firebaseapp.com",
  databaseURL: "https://kipboiz-app.firebaseio.com",
  projectId: "kipboiz-app",
  storageBucket: "kipboiz-app.appspot.com"
  // messagingSenderId: "912428603607"
};

const fb = firebase
  .initializeApp(firebaseConfig)
  .database()
  .ref();

// export const fbMessage = firebase.messaging();

// fbMessage
//   .requestPermission()
//   .then(() => {
//     console.log("have permission");
//     const token = fbMessage.getToken();
//     return token;
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//     console.log("break");
//     return;
//   });

// fbMessage.onMessage(payload => {
//   console.log("message: ", payload);
// });

export default fb;
