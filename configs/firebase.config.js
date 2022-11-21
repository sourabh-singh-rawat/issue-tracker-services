import dotenv from "dotenv/config";
import { cert } from "firebase-admin/app";

const firebaseConfig = {
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  storageBucket: process.env.STORAGE_BUCKET,
};

export default firebaseConfig;
