import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const createToken = async (req, res) => {
  const { payload } = req.body;
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
};

const verifyToken = (req, res) => {
  try {
    const { inviteToken } = req.body;
    const validToken = jwt.verify(inviteToken, process.env.JWT_SECRET);

    res.send(validToken);
  } catch (error) {
    res.status(500);
  }
};

export default { createToken, verifyToken };
