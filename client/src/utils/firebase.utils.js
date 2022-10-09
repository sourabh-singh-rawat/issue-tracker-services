import { auth } from "../app/services/auth.service";
import { storeUserInfoInDatabase } from "./database.utils.js";

import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { verifyToken } from "./auth.utils";

export const continueWithGoogle = async (inviteToken) => {
  const provider = new GoogleAuthProvider();

  // if token exist then the user needs to signin and add to project member list
  if (inviteToken) {
    try {
      // verifying toke
      const response = await verifyToken(inviteToken);

      // verification successfull
      const decodedToken = await response.json();

      // user sign in
      const { user } = await signInWithPopup(auth, provider);

      if (user) {
        // store the user in the database
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

        console.log(response);
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

export const signUpWithEmailAndPassword = async ({
  name,
  email,
  password,
  inviteToken,
}) => {
  if (inviteToken) {
    try {
      // verify
      const response = await verifyToken(inviteToken);

      const decodedToken = await response.json();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        // store the user in the database
        await storeUserInfoInDatabase({ name, ...user });
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
    } catch (error) {
      console.log(error);
    }
  } else {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (user) {
      await storeUserInfoInDatabase(user);
    }
  }
  // try {
  //     ;
  // } catch (error) {}
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    window.localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
