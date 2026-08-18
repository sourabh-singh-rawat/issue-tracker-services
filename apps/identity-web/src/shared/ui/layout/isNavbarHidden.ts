const HIDDEN_PREFIXES: string[] = [
  "/signin",
  "/registration",
  "/consent",
  "/verification",
  "/resend-verification",
];

export const isNavbarHidden = (pathname: string) =>
  HIDDEN_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
