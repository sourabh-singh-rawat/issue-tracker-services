import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase.config";

export const logout = async () => {
  try {
    await signOut(auth);
    return window.localStorage.clear();
  } catch (error) {
    return error;
  }
};
