export const APP_ROUTE = {
  SIGNIN: "/signin",
  REGISTRATION: "/registration",
} as const;

export type AppRoute = (typeof APP_ROUTE)[keyof typeof APP_ROUTE];
