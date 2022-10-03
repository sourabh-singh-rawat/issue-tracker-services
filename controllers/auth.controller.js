import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = async function createToken(req, res) {
  const { payload } = req.body;
  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};

const verifyToken = async function verifyToken(req, res) {
  try {
    const { inviteToken } = req.body;
    const decodedValidToken = jwt.verify(inviteToken, JWT_SECRET);

    res.send(decodedValidToken);
  } catch (error) {
    res.status(500).send();
  }
};

export default { createToken, verifyToken };
