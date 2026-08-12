import type { GraphRelationship } from "../types";

export type CheckRelationshipInput = GraphRelationship;

export interface CheckRelationshipResponse {
  allowed: boolean;
}

export interface EnsureRelationshipResponse {
  created: boolean;
}

export interface DeleteRelationshipResponse {
  deleted: boolean;
}

export interface HttpAuthorizationClientOptions {
  baseUrl: string;
}
