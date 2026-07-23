export interface BaseToken {
  userId: string;
  iss: string;
  aud: string;
  sub: string;
  exp: number;
  jwtid: string;
  iat?: number;
}
