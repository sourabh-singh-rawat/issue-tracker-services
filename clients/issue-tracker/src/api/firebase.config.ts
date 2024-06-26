import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDm_H6GkkUh5DuXCwyMHmZLrIeLWn3iaE0",
  authDomain: "issue-tracker-66803.firebaseapp.com",
  projectId: "issue-tracker-66803",
  storageBucket: "issue-tracker-66803.appspot.com",
  messagingSenderId: "579560355104",
  appId: "1:579560355104:web:f5e6fdb13570f3dfffd345",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
