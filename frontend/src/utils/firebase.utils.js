import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm_H6GkkUh5DuXCwyMHmZLrIeLWn3iaE0",
  authDomain: "issue-tracker-66803.firebaseapp.com",
  projectId: "issue-tracker-66803",
  storageBucket: "issue-tracker-66803.appspot.com",
  messagingSenderId: "579560355104",
  appId: "1:579560355104:web:f5e6fdb13570f3dfffd345",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Sign up new users using email and password

// Continue with Google
const googleAuthProvider = new GoogleAuthProvider();
export const continueWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleAuthProvider);
  console.log("User signed in using google popup");

  storeUserInfoInDatabase(userCredential);

  return userCredential;
};

// Storing user information in the database
export const storeUserInfoInDatabase = async (userCredential) => {
  const { user } = userCredential;
  const { uid, email, displayName } = user;
  await fetch("http://localhost:4000/users", {
    method: "POST",
    body: JSON.stringify({ uid, email, displayName }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
