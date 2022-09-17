import dotenv from "dotenv/config";
import { cert } from "firebase-admin/app";

const firebaseConfig = {
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
};

export default firebaseConfig;
