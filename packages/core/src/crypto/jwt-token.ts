import jwt from "jsonwebtoken";
import { Token } from "./interfaces/token";

export class JwtToken implements Token {
  static verify = <T>(token: string, secret: string) => {
    return jwt.verify(token, secret) as T;
  };

  static create = <T>(payload: T, secret: string) => {
    return jwt.sign(JSON.stringify(payload), secret, { algorithm: "HS512" });
  };
}
