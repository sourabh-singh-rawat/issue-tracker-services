import dotenv from "dotenv/config";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

const firebaseConfig = {
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
};

const firebaseApp = initializeApp(firebaseConfig);

export const adminAuth = getAuth(firebaseApp);
export const adminStorage = getStorage(firebaseApp);

export default firebaseConfig;
