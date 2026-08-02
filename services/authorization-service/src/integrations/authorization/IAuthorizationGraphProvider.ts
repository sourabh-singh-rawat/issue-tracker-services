import type { Relationship, Resource } from "@pine/authorization";

export interface ListRelationshipsFilter {
  object?: Resource;
  relation?: string;
  subject?: Resource;
}

export interface IAuthorizationGraphProvider {
  createRelationship(relationship: Relationship): Promise<void>;
  deleteRelationship(relationship: Relationship): Promise<void>;
  listRelationships(filter?: ListRelationshipsFilter): Promise<Relationship[]>;
  checkPermission(
    object: Resource,
    relation: string,
    subject: Resource,
  ): Promise<boolean>;
}
