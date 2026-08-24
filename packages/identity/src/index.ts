export type { IIdentityClient } from "./IIdentityClient";
export { HttpIdentityClient, type HttpIdentityClientOptions } from "./HttpIdentityClient";
export { resolveIdentityFromHeaders } from "./resolveIdentityFromHeaders";
export { requireIdentity, requireIdentityId } from "./requireIdentity";
export {
  GetIdentityFromAccessTokenResponseSchema,
  GetIdentityFromSessionResponseSchema,
  IdentitySchema,
} from "./schemas";
export type {
  GetIdentityFromAccessTokenResponse,
  GetIdentityFromSessionResponse,
  Identity,
} from "./schemas";

