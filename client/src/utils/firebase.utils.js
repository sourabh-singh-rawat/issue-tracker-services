import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../app/firebase.config.js";
import { storeUserInfoInDatabase } from "./database.utils.js";
import { verifyToken } from "./auth.utils";

export const continueWithGoogle = async (inviteToken) => {
  const provider = new GoogleAuthProvider();

  if (inviteToken) {
    try {
      const response = await verifyToken(inviteToken);
      const decodedToken = await response.json();

      const { user } = await signInWithPopup(auth, provider);

      if (user) {
        await storeUserInfoInDatabase(user);
        const { uid, accessToken } = user;

        // user signed in so add the user to project_member
        const { toProject } = decodedToken;
        const response = await fetch(
          `http://localhost:4000/api/projects/${toProject}/members`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
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

export const signOutUser = async () => {
  try {
    await signOut(auth);
    window.localStorage.clear();
  } catch (error) {}
};

export default { continueWithGoogle, signOutUser };
