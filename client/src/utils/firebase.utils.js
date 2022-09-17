import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { storeUserInfoInDatabase } from "./database.utils.js";
import { auth } from "../app/services/auth.service";

export const signInWithGoogle = async (inviteToken) => {
  const provider = new GoogleAuthProvider();

  // if token exist then the user needs to signin and add to project member list
  if (inviteToken) {
    try {
      // verifying token
      const response = await fetch(
        `http://localhost:4000/api/auth/verifyToken`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inviteToken }),
        }
      );
      const decodedToken = await response.json();

      const { user } = await signInWithPopup(auth, provider);

      if (user) {
        // store the user in the database
        await storeUserInfoInDatabase(user);
        const { uid } = user;

        // user signed in so add the user to project_member
        const { toProject } = decodedToken;
        const response = await fetch(
          `http://localhost:4000/api/projects/${toProject}/members`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...decodedToken, uid }),
          }
        );
      } else {
        console.log("Error signing in user");
      }
    } catch (error) {}
  } else {
    try {
      const { user } = await signInWithPopup(auth, provider);

      await storeUserInfoInDatabase(user);
    } catch (error) {}
  }
};

export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {}
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    window.localStorage.clear();
  } catch (error) {
    console.log("Cannot sign out");
  }
};
