import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { initializeApp } from "firebase-admin/app";
import firebaseConfig from "../configs/firebase.config.js";

const firebaseApp = initializeApp(firebaseConfig);

export const adminAuth = getAuth(firebaseApp);
export const adminStorage = getStorage(firebaseApp);
