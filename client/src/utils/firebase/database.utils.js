/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
const storeUserInfoInDatabase = async (user) => {
  const { uid, name, email, photoURL } = user;

  try {
    // check if the user already exists
    await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: name || user?.displayName,
        email,
        uid,
        photoURL,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return error;
  }
};

export default storeUserInfoInDatabase;
