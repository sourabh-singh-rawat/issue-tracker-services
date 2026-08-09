export type CookieOptions = {
  secret: string;
  path?: string;
  httpOnly?: boolean;
  sameSite?: boolean;
  secure?: boolean;
};
