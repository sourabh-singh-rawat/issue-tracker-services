import type { GraphNamespace } from "../types/GraphNamespace";

export type CheckRelationshipInput = {
  namespace: GraphNamespace;
  object: string;
  relation: string;
  subject: string;
};

export type ListRelationshipsInput = {
  namespace: GraphNamespace;
  object?: string;
  relation?: string;
  subject?: {
    namespace: GraphNamespace;
    id: string;
  };
};

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
