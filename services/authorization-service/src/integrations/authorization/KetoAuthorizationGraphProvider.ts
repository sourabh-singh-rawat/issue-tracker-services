import { inject, injectable } from "inversify";
import { ALL_RESOURCES, type Relationship, type Resource } from "@pine/authorization";
import { TYPES } from "@/bootstrap/container-types";
import type {
  IAuthorizationGraphProvider,
  ListRelationshipsFilter,
} from "@/integrations/authorization/IAuthorizationGraphProvider";
import type { KetoClient } from "@/integrations/authorization/KetoClient";

const toSubjectId = (resource: Resource): string => `${resource.type}:${resource.id}`;

const parseSubjectId = (subjectId: string): Resource => {
  const separator = subjectId.indexOf(":");
  if (separator <= 0 || separator === subjectId.length - 1) {
    throw new Error(`Invalid Keto subject_id: ${subjectId}`);
  }
  return {
    type: subjectId.slice(0, separator),
    id: subjectId.slice(separator + 1),
  };
};

const mapKetoRelationship = (row: {
  namespace?: string;
  object?: string;
  relation?: string;
  subject_id?: string;
}): Relationship => {
  if (!row.namespace || !row.object || !row.relation || !row.subject_id) {
    throw new Error("Keto relationship response was incomplete");
  }
  return {
    object: { type: row.namespace, id: row.object },
    relation: row.relation,
    subject: parseSubjectId(row.subject_id),
  };
};

@injectable()
export class KetoAuthorizationGraphProvider implements IAuthorizationGraphProvider {
  constructor(
    @inject(TYPES.KetoClient)
    private readonly keto: KetoClient,
  ) {}

  async createRelationship(relationship: Relationship): Promise<void> {
    await this.keto.relationshipWriteApi.createRelationship({
      createRelationshipBody: {
        namespace: relationship.object.type,
        object: relationship.object.id,
        relation: relationship.relation,
        subject_id: toSubjectId(relationship.subject),
      },
    });
  }

  async deleteRelationship(relationship: Relationship): Promise<void> {
    await this.keto.relationshipWriteApi.deleteRelationships({
      namespace: relationship.object.type,
      object: relationship.object.id,
      relation: relationship.relation,
      subjectId: toSubjectId(relationship.subject),
    });
  }

  async listRelationships(filter?: ListRelationshipsFilter): Promise<Relationship[]> {
    const namespaces = filter?.object
      ? [filter.object.type]
      : [...new Set(ALL_RESOURCES.map((resource) => resource.type))];


    const subjectId = filter?.subject ? toSubjectId(filter.subject) : undefined;
    const results: Relationship[] = [];

    for (const namespace of namespaces) {
      const { data } = await this.keto.relationshipReadApi.getRelationships({
        namespace,
        object: filter?.object?.id,
        relation: filter?.relation,
        subjectId,
      });

      for (const row of data.relation_tuples ?? []) {
        results.push(mapKetoRelationship(row));
      }
    }

    return results;
  }

  async checkPermission(
    object: Resource,
    relation: string,
    subject: Resource,
  ): Promise<boolean> {
    const { data } = await this.keto.permissionApi.checkPermission({
      namespace: object.type,
      object: object.id,
      relation,
      subjectId: toSubjectId(subject),
    });
    return data.allowed === true;
  }
}
