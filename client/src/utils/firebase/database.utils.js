/* eslint-disable object-curly-newline */
const storeUserInfoInDatabase = async (user) => {
  const { uid, name, email, photoURL, accessToken } = user;

  try {
    return await fetch('http://localhost:5142/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: name || user?.displayName,
        email,
        uid,
        photoUrl: photoURL,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export default storeUserInfoInDatabase;
