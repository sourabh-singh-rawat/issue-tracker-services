import { adminAuth } from "../services/auth.service.js";

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.replace("Bearer ", "");
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
