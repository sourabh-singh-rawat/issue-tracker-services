import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

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
export const auth = getAuth(app);

// TODO: Authenticated user

// Continue with Google
const googleAuthProvider = new GoogleAuthProvider();
export const continueWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleAuthProvider);
  console.log("User signed in using google popup");

  storeUserInfoInDatabase(userCredential);

  return userCredential;
};

// Sign up new users using email and password
export const signUpWithEmailAndPassword = async (
  displayName,
  email,
  password
) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      console.log("User signed up using email and password");

      // setting displayName to the user's name
      await updateProfile(userCredential.user, { displayName });
      await storeUserInfoInDatabase(userCredential);
      return userCredential;
    }
  );
};

// Storing user information in the database
export const storeUserInfoInDatabase = async ({ user }) => {
  const { uid, displayName, email } = user;

  await fetch("http://localhost:4000/api/users/create", {
    method: "POST",
    body: JSON.stringify({ name: displayName, email, uid }),
    headers: { "Content-Type": "application/json" },
  });
};
