import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = async (req, res) => {
  const { payload } = req.body;

  try {
    const token = jwt.sign(payload, JWT_SECRET);

    return token;
  } catch (error) {
    return error;
  }
};

export default createToken;
