import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../configs/firebase.config";
import verifyToken from "./verify-token.utils";
import storeUserInfoInDatabase from "./database.utils";

const provider = new GoogleAuthProvider();

const continueWithGoogle = async (inviteToken: string) => {
  if (inviteToken) {
    try {
      const response = await verifyToken(inviteToken);
      const decodedToken = await response.json();

      const { user } = await signInWithPopup(auth, provider);

      if (user) {
        await storeUserInfoInDatabase(user);
        const { uid } = user;

        // user signed in so add the user to project_member
        const { projectId } = decodedToken;
        const finalResponse = await fetch(
          `http://localhost:4000/api/projects/${projectId}/members`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${12}`,
            },
            body: JSON.stringify({ ...decodedToken, uid }),
          },
        );
        return finalResponse;
      }
      // eslint-disable-next-line consistent-return
      return;
    } catch (error) {
      return error;
    }
  } else {
    try {
      return await signInWithRedirect(auth, provider);
    } catch (error) {
      return error;
    }
  }
};

export default continueWithGoogle;
