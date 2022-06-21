import { auth } from "./firebase-config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { storeUserInfoInDatabase } from "./db";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const response = await signInWithPopup(auth, provider);
    const { user } = response;

    // storing user in the database
    storeUserInfoInDatabase(user);
  } catch (error) {
    console.log(error);
  }
};

export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(credentials);
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    window.localStorage.clear();
  } catch (error) {
    console.log("Cannot sign out");
  }
};
