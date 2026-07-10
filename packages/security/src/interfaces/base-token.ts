import { JWTPayload } from "jose";

export interface BaseToken extends JWTPayload {
  userId: string;
  iss: string;
  aud: string;
  sub: string;
  exp: number;
  jwtid: string;
  iat?: number;
}
