export const storeUserInfoInDatabase = async (user) => {
  console.log(user);
  const { uid, name, displayName, email, photoURL } = user;

  try {
    // check if the user already exists
    await fetch("http://localhost:4000/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: name || user?.displayName,
        email,
        uid,
        photoURL,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};
