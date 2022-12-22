/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/extensions
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
    const token = authorization.replace('Bearer ', '');
    const decodedToken = await adminAuth.verifyIdToken(token);

    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};
