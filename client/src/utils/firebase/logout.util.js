import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";

export const logout = async () => {
  try {
    await signOut(auth);
    window.localStorage.clear();
  } catch (error) {
    console.log("Error signing out please try again");
  }
};
