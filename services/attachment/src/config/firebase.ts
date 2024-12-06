import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

const firebaseApp = initializeApp({
  credential: cert("./firebase.service-account.json"),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const adminAuth = getAuth(firebaseApp);
export const adminStorage = getStorage(firebaseApp).bucket();
