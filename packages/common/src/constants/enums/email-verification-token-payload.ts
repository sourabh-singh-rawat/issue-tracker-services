export interface EmailVerificationTokenPayload {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  userId: string;
  tokenId: string;
}
