import { inject, injectable } from "inversify";
import type { GraphRelationship, GraphResource } from "@pine/authorization";
import { TYPES } from "@/bootstrap/container-types";
import type {
  IAuthorizationGraphProvider,
  ListRelationshipsFilter,
} from "@/integrations/authorization/IAuthorizationGraphProvider";
import type { KetoClient } from "@/integrations/authorization/KetoClient";

/** Keto namespaces used by this service (organization/role instances + capability grants). */
const KETO_NAMESPACES = ["organization", "role", "capability"] as const;

const toSubjectId = (resource: GraphResource): string =>
  `${resource.type}:${resource.id}`;

const parseSubjectId = (subjectId: string): GraphResource => {
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
}): GraphRelationship => {
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

  async createRelationship(relationship: GraphRelationship): Promise<void> {
    await this.keto.relationshipWriteApi.createRelationship({
      createRelationshipBody: {
        namespace: relationship.object.type,
        object: relationship.object.id,
        relation: relationship.relation,
        subject_id: toSubjectId(relationship.subject),
      },
    });
  }

  async deleteRelationship(relationship: GraphRelationship): Promise<void> {
    await this.keto.relationshipWriteApi.deleteRelationships({
      namespace: relationship.object.type,
      object: relationship.object.id,
      relation: relationship.relation,
      subjectId: toSubjectId(relationship.subject),
    });
  }

  async listRelationships(
    filter?: ListRelationshipsFilter,
  ): Promise<GraphRelationship[]> {
    const namespaces = filter?.object
      ? [filter.object.type]
      : [...KETO_NAMESPACES];


    const subjectId = filter?.subject ? toSubjectId(filter.subject) : undefined;
    const results: GraphRelationship[] = [];

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
    object: GraphResource,
    relation: string,
    subject: GraphResource,
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
