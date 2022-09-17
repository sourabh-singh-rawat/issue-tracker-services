import { getAuth } from "firebase-admin/auth";
import { initializeApp } from "firebase-admin/app";
import firebaseConfig from "../configs/firebase.config.js";

initializeApp(firebaseConfig);

export const adminAuth = getAuth();
