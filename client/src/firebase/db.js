// Storing user information in the database
export const storeUserInfoInDatabase = async (user) => {
  const { uid, displayName, email } = user;

  await fetch("http://localhost:4000/api/users", {
    method: "POST",
    body: JSON.stringify({ name: displayName, email, uid }),
    headers: { "Content-Type": "application/json" },
  });
};
