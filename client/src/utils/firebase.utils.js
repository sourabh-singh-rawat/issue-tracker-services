import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase.config.js";
import { storeUserInfoInDatabase } from "./database.utils.js";

// SIGN IN
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const response = await signInWithPopup(auth, provider);
    const { user } = response;

    await storeUserInfoInDatabase(user);
  } catch (error) {
    console.log(error);
  }
};

// SIGN UP
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

// SIGN OUT
export const signOutUser = async () => {
  try {
    await signOut(auth);
    window.localStorage.clear();
  } catch (error) {
    console.log("Cannot sign out");
  }
};
