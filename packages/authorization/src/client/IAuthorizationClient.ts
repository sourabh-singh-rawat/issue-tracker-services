import type { GraphRelationship } from "../types";
import type { CheckRelationshipInput } from "./types";

export interface IAuthorizationClient {
  checkRelationship: (input: CheckRelationshipInput) => Promise<boolean>;
  ensureRelationship: (relationship: GraphRelationship) => Promise<void>;
  deleteRelationship: (relationship: GraphRelationship) => Promise<void>;
}
