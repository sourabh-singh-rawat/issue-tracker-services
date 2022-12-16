import dotenv from "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res) => {
  const { inviteToken } = req.body;

  try {
    const decodedValidToken = jwt.verify(inviteToken, JWT_SECRET);

    res.send(decodedValidToken);
  } catch (error) {
    res.status(500).send();
  }
};

export default verifyToken;
