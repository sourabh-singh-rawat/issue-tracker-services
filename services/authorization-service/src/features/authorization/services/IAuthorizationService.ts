import type {
  CheckRelationshipInput,
  GraphRelationship,
  ListRelationshipsInput,
} from "@pine/authorization";

export interface IAuthorizationService {
  hasRelationship: (input: CheckRelationshipInput) => Promise<boolean>;
  ensureRelationship: (relationship: GraphRelationship) => Promise<{ created: boolean }>;
  deleteRelationship: (relationship: GraphRelationship) => Promise<{ deleted: boolean }>;
  listRelationships: (input: ListRelationshipsInput) => Promise<GraphRelationship[]>;
}
