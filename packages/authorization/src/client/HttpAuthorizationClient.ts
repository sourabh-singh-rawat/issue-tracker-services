import { isGraphNamespace, type GraphRelationship } from "../types";
import type { IAuthorizationClient } from "./IAuthorizationClient";
import type {
  CheckRelationshipInput,
  CheckRelationshipResponse,
  DeleteRelationshipResponse,
  EnsureRelationshipResponse,
  HttpAuthorizationClientOptions,
  ListRelationshipsInput,
} from "./types";

export class HttpAuthorizationClient implements IAuthorizationClient {
  private readonly baseUrl: string;

  constructor(options: HttpAuthorizationClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
  }

  checkRelationship = async (input: CheckRelationshipInput): Promise<boolean> => {
    const body = await this.postJson("/authorization/checkRelationship", input);
    if (!isCheckRelationshipResponse(body)) {
      throw new Error("checkRelationship returned an invalid response body");
    }
    return body.allowed;
  };

  ensureRelationship = async (
    relationship: GraphRelationship,
  ): Promise<{ created: boolean }> => {
    const body = await this.postJson("/authorization/ensureRelationship", relationship);
    if (!isEnsureRelationshipResponse(body)) {
      throw new Error("ensureRelationship returned an invalid response body");
    }
    return { created: body.created };
  };

  listRelationships = async (input: ListRelationshipsInput): Promise<GraphRelationship[]> => {
    const body = await this.postJson("/authorization/listRelationships", input);
    if (!isListRelationshipsResponse(body)) {
      throw new Error("listRelationships returned an invalid response body");
    }
    return body.relationships;
  };

  deleteRelationship = async (
    relationship: GraphRelationship,
  ): Promise<{ deleted: boolean }> => {
    const body = await this.postJson("/authorization/deleteRelationship", relationship);
    if (!isDeleteRelationshipResponse(body)) {
      throw new Error("deleteRelationship returned an invalid response body");
    }
    return { deleted: body.deleted };
  };

  private postJson = async (path: string, payload: unknown): Promise<unknown> => {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`${path} failed with status ${response.status}`);
    }

    return response.json();
  };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isCheckRelationshipResponse = (value: unknown): value is CheckRelationshipResponse =>
  isRecord(value) && typeof value.allowed === "boolean";

const isEnsureRelationshipResponse = (value: unknown): value is EnsureRelationshipResponse =>
  isRecord(value) && typeof value.created === "boolean";

const isDeleteRelationshipResponse = (value: unknown): value is DeleteRelationshipResponse =>
  isRecord(value) && typeof value.deleted === "boolean";

const isGraphResource = (value: unknown): value is GraphRelationship["object"] =>
  isRecord(value) &&
  typeof value.namespace === "string" &&
  isGraphNamespace(value.namespace) &&
  typeof value.id === "string";

const isGraphRelationship = (value: unknown): value is GraphRelationship => {
  if (!isRecord(value) || !isGraphResource(value.object) || typeof value.relation !== "string") {
    return false;
  }
  const hasSubject = value.subject !== undefined;
  const hasSubjectSet = value.subjectSet !== undefined;
  if (hasSubject && !isGraphResource(value.subject)) {
    return false;
  }
  if (hasSubjectSet) {
    if (!isRecord(value.subjectSet)) {
      return false;
    }
    if (
      typeof value.subjectSet.namespace !== "string" ||
      !isGraphNamespace(value.subjectSet.namespace) ||
      typeof value.subjectSet.id !== "string" ||
      typeof value.subjectSet.relation !== "string"
    ) {
      return false;
    }
  }
  return true;
};

const isListRelationshipsResponse = (
  value: unknown,
): value is { relationships: GraphRelationship[] } =>
  isRecord(value) &&
  Array.isArray(value.relationships) &&
  value.relationships.every(isGraphRelationship);
