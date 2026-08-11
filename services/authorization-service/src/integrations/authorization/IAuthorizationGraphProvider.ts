import type { GraphRelationship, GraphResource, GraphSubjectSet } from "@pine/authorization";

export interface ListRelationshipsFilter {
  object?: GraphResource;
  relation?: string;
  subject?: GraphResource;
  subjectSet?: GraphSubjectSet;
}

export interface IAuthorizationGraphProvider {
  createRelationship(relationship: GraphRelationship): Promise<void>;
  deleteRelationship(relationship: GraphRelationship): Promise<void>;
  listRelationships(filter?: ListRelationshipsFilter): Promise<GraphRelationship[]>;
  checkPermission(
    object: GraphResource,
    relation: string,
    subject: GraphResource,
  ): Promise<boolean>;
}
