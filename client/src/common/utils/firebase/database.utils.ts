import { User } from "@firebase/auth";

/* eslint-disable object-curly-newline */
const storeUserInfoInDatabase = async (user: User) => {
  const { uid, email, photoURL } = user;

  try {
    return await fetch("http://localhost:5142/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: uid,
        email,
        uid,
        photoUrl: photoURL,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${11}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export default storeUserInfoInDatabase;
