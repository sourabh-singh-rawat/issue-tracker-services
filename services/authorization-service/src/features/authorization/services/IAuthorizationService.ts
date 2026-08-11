import type { GraphRelationship } from "@pine/authorization";

export interface IAuthorizationService {
  hasRelationship(relationship: GraphRelationship): Promise<boolean>;
}
