import type { Relationship } from "@pine/authorization";

export interface IAuthorizationService {
  hasCapability(roles: string[], permissions: string[]): Promise<boolean>;
  hasRelationship(relationship: Relationship): Promise<boolean>;
}
