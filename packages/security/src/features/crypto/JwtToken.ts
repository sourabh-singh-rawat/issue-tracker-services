import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { IToken } from "./IToken";

const encoder = new TextEncoder();

export class JwtToken implements IToken {
  static verify = async (token: string, secret: string): Promise<JWTPayload> => {
    const key = encoder.encode(secret);
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS512"],
    });
    return payload;
  };

  static create = async (payload: JWTPayload, secret: string): Promise<string> => {
    const key = encoder.encode(secret);
    return new SignJWT(payload).setProtectedHeader({ alg: "HS512" }).sign(key);
  };
}
