export type {
  IIdentityProvider,
  Identity,
  IdentitySchemaId,
  LoginIdentityInput,
  LoginResult,
  RegisterIdentityInput,
  UpdateIdentityInput,
} from "@/integrations/identity/IIdentityProvider";
export {
  IdentityAlreadyExistsError,
  IdentityErrorCodes,
  IdentityNotFoundError,
  IdentityProviderUnavailableError,
  InvalidCredentialError,
  type IdentityErrorCode,
} from "@/integrations/identity/errors";
export { KratosClient } from "@/integrations/identity/KratosClient";
export { KratosIdentityProvider } from "@/integrations/identity/KratosIdentityProvider";
