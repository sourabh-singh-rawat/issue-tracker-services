import type { CheckRelationshipInput } from "./types";

export interface IAuthorizationClient {
  checkRelationship: (input: CheckRelationshipInput) => Promise<boolean>;
}
