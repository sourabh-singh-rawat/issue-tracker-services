import { adminAuth } from '../config/firebase.config.js';

/**
 * Middleware to check if the user is authenticated
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .send('Authentication failed: missing authorization header');
    }

    const token = authorization.replace('Bearer ', '');
    const decodedToken = await adminAuth.verifyIdToken(token);

    req.user = decodedToken;
    return next();
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      return res.status(423).send('Auth token expired. Please login again');
    }
    return res.status(401).send('Authentication failed');
  }
};

export default auth;
