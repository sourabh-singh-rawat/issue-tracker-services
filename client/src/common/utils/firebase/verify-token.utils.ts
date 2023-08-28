const verifyToken = async (inviteToken: string) => {
  const verifiedToken = await fetch(
    "http://localhost:4000/api/auth/verifyToken",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteToken }),
    },
  );

  return verifiedToken;
};

export default verifyToken;
