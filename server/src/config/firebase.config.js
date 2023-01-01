/* eslint-disable import/no-unresolved */

import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

// Load environment variables from .env file
// eslint-disable-next-line import/newline-after-import
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const firebaseConfig = {
  storageBucket: process.env.STORAGE_BUCKET,
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH),
};

const firebaseApp = initializeApp(firebaseConfig);

export const adminAuth = getAuth(firebaseApp);
export const adminStorage = getStorage(firebaseApp).bucket();
