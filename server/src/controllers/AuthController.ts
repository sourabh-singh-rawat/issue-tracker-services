import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

export class AuthController {
  private readonly secret: string = `${process.env.JWT_SECRET}`;

  public async createToken(req: Request, res: Response) {
    const { payload } = req.body;

    try {
      const token = jwt.sign(payload, this.secret);

      res.status(StatusCodes.OK).send({ token });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  public async verifyToken(req: Request, res: Response) {
    const { inviteToken } = req.body;

    try {
      const decodedValidToken = jwt.verify(inviteToken, this.secret);

      res.status(StatusCodes.OK).send(decodedValidToken);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
  }
}

export default new AuthController();
