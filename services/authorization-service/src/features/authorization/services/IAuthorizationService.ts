import type { GraphRelationship } from "@pine/authorization";

export interface IAuthorizationService {
  hasRelationship: (relationship: GraphRelationship) => Promise<boolean>;
  ensureRelationship: (relationship: GraphRelationship) => Promise<{ created: boolean }>;
  deleteRelationship: (relationship: GraphRelationship) => Promise<{ deleted: boolean }>;
}
