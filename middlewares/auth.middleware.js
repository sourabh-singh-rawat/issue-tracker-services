import { adminAuth } from "../config/firebase.config.js";

export const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  // const isValid = adminAuth.verifyIdToken(token);
  // console.log(isValid);

  next();
};
