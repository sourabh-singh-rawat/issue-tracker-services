export const IdentityProviderType = {
  KRATOS: "kratos",
  AUTH0: "auth0",
} as const;

export type IdentityProviderType =
  (typeof IdentityProviderType)[keyof typeof IdentityProviderType];
