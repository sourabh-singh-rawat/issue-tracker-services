export const APP_ROUTE = {
  LOGIN: "/login",
  SIGN_UP: "/signup",
} as const;

export type AppRoute = (typeof APP_ROUTE)[keyof typeof APP_ROUTE];
