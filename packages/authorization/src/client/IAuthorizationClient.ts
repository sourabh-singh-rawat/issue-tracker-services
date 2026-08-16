import type { GraphRelationship } from "../types";
import type { CheckRelationshipInput, ListRelationshipsInput } from "./types";

export interface IAuthorizationClient {
  checkRelationship: (input: CheckRelationshipInput) => Promise<boolean>;
  ensureRelationship: (relationship: GraphRelationship) => Promise<{ created: boolean }>;
  deleteRelationship: (relationship: GraphRelationship) => Promise<{ deleted: boolean }>;
  listRelationships: (input: ListRelationshipsInput) => Promise<GraphRelationship[]>;
}
