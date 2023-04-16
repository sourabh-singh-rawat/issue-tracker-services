import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const createToken = async (req) => {
  const { payload } = req.body;

  try {
    const token = jwt.sign(payload, JWT_SECRET);

    return token;
  } catch (error) {
    return error;
  }
};

export default createToken;
