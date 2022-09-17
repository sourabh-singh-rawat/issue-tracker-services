import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import firebaseConfig from "../configs/firebase.config";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
