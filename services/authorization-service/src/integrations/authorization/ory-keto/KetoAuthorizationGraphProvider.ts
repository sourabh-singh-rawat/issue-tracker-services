import { inject, injectable } from "inversify";
import {
  GRAPH_NAMESPACES,
  isGraphNamespace,
  type CheckRelationshipInput,
  type GraphRelationship,
  type GraphResource,
  type GraphSubjectSet,
} from "@pine/authorization";
import { TYPES } from "@/bootstrap/container-types";
import type {
  IAuthorizationGraphProvider,
  ListRelationshipsFilter,
} from "@/integrations/authorization/IAuthorizationGraphProvider";
import type { KetoClient } from "@/integrations/authorization/ory-keto/KetoClient";

@injectable()
export class KetoAuthorizationGraphProvider implements IAuthorizationGraphProvider {
  constructor(
    @inject(TYPES.KetoClient)
    private readonly keto: KetoClient,
  ) {}

  async createRelationship(relationship: GraphRelationship): Promise<void> {
    const subjectFields = this.toKetoSubjectFields(relationship);

    await this.keto.relationshipWriteApi.createRelationship({
      createRelationshipBody: {
        namespace: relationship.object.namespace,
        object: relationship.object.id,
        relation: relationship.relation,
        ...subjectFields,
      },
    });
  }

  async deleteRelationship(relationship: GraphRelationship): Promise<void> {
    const subjectFields = this.toKetoSubjectQuery(relationship);

    await this.keto.relationshipWriteApi.deleteRelationships({
      namespace: relationship.object.namespace,
      object: relationship.object.id,
      relation: relationship.relation,
      ...subjectFields,
    });
  }

  async listRelationships(filter?: ListRelationshipsFilter): Promise<GraphRelationship[]> {
    const namespaces = filter?.object
      ? [filter.object.namespace]
      : filter?.namespace
        ? [filter.namespace]
        : [...GRAPH_NAMESPACES];

    if (filter?.subject && filter.subjectSet) {
      throw new Error("ListRelationshipsFilter must not set both subject and subjectSet");
    }

    const subjectId = filter?.subject ? this.toSubjectId(filter.subject) : undefined;
    const subjectSetNamespace = filter?.subjectSet?.namespace;
    const subjectSetObject = filter?.subjectSet?.id;
    const subjectSetRelation = filter?.subjectSet?.relation;
    const results: GraphRelationship[] = [];

    for (const namespace of namespaces) {
      const { data } = await this.keto.relationshipReadApi.getRelationships({
        namespace,
        object: filter?.object?.id,
        relation: filter?.relation,
        subjectId,
        subjectSetNamespace,
        subjectSetObject,
        subjectSetRelation,
      });

      for (const row of data.relation_tuples ?? []) {
        results.push(this.mapKetoRelationship(row));
      }
    }

    return results;
  }

  checkPermission = async (input: CheckRelationshipInput): Promise<boolean> => {
    const { data } = await this.keto.permissionApi.checkPermission({
      namespace: input.namespace,
      object: input.object,
      relation: input.relation,
      subjectId: input.subject,
    });
    return data.allowed === true;
  };

  private toSubjectId(resource: GraphResource): string {
    return `${resource.namespace}:${resource.id}`;
  }

  private toKetoSubjectFields(relationship: GraphRelationship): {
    subject_id?: string;
    subject_set?: { namespace: string; object: string; relation: string };
  } {
    const hasSubject = relationship.subject !== undefined;
    const hasSubjectSet = relationship.subjectSet !== undefined;

    if (hasSubject === hasSubjectSet) {
      throw new Error("GraphRelationship requires exactly one of subject or subjectSet");
    }

    if (relationship.subjectSet !== undefined) {
      return {
        subject_set: {
          namespace: relationship.subjectSet.namespace,
          object: relationship.subjectSet.id,
          relation: relationship.subjectSet.relation,
        },
      };
    }

    if (relationship.subject === undefined) {
      throw new Error("GraphRelationship requires exactly one of subject or subjectSet");
    }

    return { subject_id: this.toSubjectId(relationship.subject) };
  }

  private toKetoSubjectQuery(relationship: GraphRelationship): {
    subjectId?: string;
    subjectSetNamespace?: string;
    subjectSetObject?: string;
    subjectSetRelation?: string;
  } {
    const hasSubject = relationship.subject !== undefined;
    const hasSubjectSet = relationship.subjectSet !== undefined;

    if (hasSubject === hasSubjectSet) {
      throw new Error("GraphRelationship requires exactly one of subject or subjectSet");
    }

    if (relationship.subjectSet !== undefined) {
      return {
        subjectSetNamespace: relationship.subjectSet.namespace,
        subjectSetObject: relationship.subjectSet.id,
        subjectSetRelation: relationship.subjectSet.relation,
      };
    }

    if (relationship.subject === undefined) {
      throw new Error("GraphRelationship requires exactly one of subject or subjectSet");
    }

    return { subjectId: this.toSubjectId(relationship.subject) };
  }

  private parseSubjectId(subjectId: string): GraphResource {
    const separator = subjectId.indexOf(":");
    const namespace = subjectId.slice(0, separator);
    const id = subjectId.slice(separator + 1);
    if (separator <= 0 || separator === subjectId.length - 1 || !isGraphNamespace(namespace)) {
      throw new Error(`Invalid Keto subject_id: ${subjectId}`);
    }
    return {
      namespace,
      id,
    };
  }

  private mapKetoRelationship(row: {
    namespace?: string;
    object?: string;
    relation?: string;
    subject_id?: string;
    subject_set?: {
      namespace?: string;
      object?: string;
      relation?: string;
    };
  }): GraphRelationship {
    if (!row.namespace || !row.object || !row.relation || !isGraphNamespace(row.namespace)) {
      throw new Error("Keto relationship response was incomplete");
    }

    const hasSubjectId = row.subject_id !== undefined && row.subject_id.length > 0;
    const subjectSet = this.mapSubjectSet(row.subject_set);

    if (hasSubjectId === (subjectSet !== undefined)) {
      throw new Error(
        "Keto relationship response must have exactly one of subject_id or subject_set",
      );
    }

    if (subjectSet !== undefined) {
      return {
        object: { namespace: row.namespace, id: row.object },
        relation: row.relation,
        subjectSet,
      };
    }

    if (row.subject_id === undefined) {
      throw new Error("Keto relationship response was incomplete");
    }

    return {
      object: { namespace: row.namespace, id: row.object },
      relation: row.relation,
      subject: this.parseSubjectId(row.subject_id),
    };
  }

  private mapSubjectSet(
    subjectSet:
      | {
          namespace?: string;
          object?: string;
          relation?: string;
        }
      | undefined,
  ): GraphSubjectSet | undefined {
    if (subjectSet === undefined) {
      return undefined;
    }

    if (
      !subjectSet.namespace ||
      !subjectSet.object ||
      !subjectSet.relation ||
      !isGraphNamespace(subjectSet.namespace)
    ) {
      throw new Error("Keto subject_set response was incomplete");
    }

    return {
      namespace: subjectSet.namespace,
      id: subjectSet.object,
      relation: subjectSet.relation,
    };
  }
}
