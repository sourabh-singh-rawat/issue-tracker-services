import dotenv from "dotenv";
dotenv.config();

import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";

initializeApp({
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

export const adminAuth = getAuth();
