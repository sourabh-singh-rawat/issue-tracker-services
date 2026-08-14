export type ResourceReference = {
  namespace: string;
  id: string;
};

export type CheckRelationshipInput = {
  namespace: string;
  object: string;
  relation: string;
  subject: string;
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
