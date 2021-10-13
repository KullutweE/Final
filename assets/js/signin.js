// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuoID-FVQH3stFpUJhQuKFFjRMQuPKnE0",
  authDomain: "beauty-pageant-judging-system.firebaseapp.com",
  projectId: "beauty-pageant-judging-system",
  storageBucket: "beauty-pageant-judging-system.appspot.com",
  messagingSenderId: "327388870081",
  appId: "1:327388870081:web:7cc2a2ee298114ec4a6b40",
  measurementId: "G-RB3GBY1QL6"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();


const mailField = document.getElementById('signupemail');
const passwordField = document.getElementById('signuppassword');
const signin = document.getElementById('signin');
const logOut = document.getElementById('logout');

//Function wrapping all the signup parts including the email verification email
//triggered once the user clicks on the signup button
signin.addEventListener('click', e => {
    e.preventDefault();
    const email = mailField.value;
    const password = passwordField.value;
    //Built in firebase function responsible for signing up a user
    auth.signInWithEmailAndPassword(email, password) 
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.assign('./logged/adminscreen.html')
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      alert(errorMessage,errorCode)
    });
  });
// signUp.addEventListener('click', signUpFunction);
  
// document.getElementById('userInfo').addEventListener('click', () => {
//     console.log(auth.currentUser)
// })