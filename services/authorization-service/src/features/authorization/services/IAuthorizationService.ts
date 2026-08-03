import type { GraphRelationship } from "@pine/authorization";

export interface IAuthorizationService {
  hasCapability(roles: string[], capabilityKeys: string[]): Promise<boolean>;
  hasRelationship(relationship: GraphRelationship): Promise<boolean>;
}
