import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../config/firebase.config.js';
import { StatusCodes } from 'http-status-codes';

class Auth {
  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization }: any = req.headers;
      if (!authorization) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send('Authentication failed: missing authorization header');
      }

      const token = authorization.replace('Bearer ', '');
      const decodedToken = await adminAuth.verifyIdToken(token);

      req.user = decodedToken;
      return next();
    } catch (error: any) {
      if (error.code === 'auth/id-token-expired') {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send('Auth token expired. Please login again');
      }
      return res.status(StatusCodes.UNAUTHORIZED).send('Authentication failed');
    }
  }
}

export default new Auth();
