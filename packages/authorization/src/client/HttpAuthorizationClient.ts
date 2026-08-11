import type { IAuthorizationClient } from "./IAuthorizationClient";
import type {
  CheckRelationshipInput,
  CheckRelationshipResponse,
  HttpAuthorizationClientOptions,
} from "./types";

export class HttpAuthorizationClient implements IAuthorizationClient {
  private readonly baseUrl: string;

  constructor(options: HttpAuthorizationClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
  }

  checkRelationship = async (input: CheckRelationshipInput): Promise<boolean> => {
    const url = `${this.baseUrl}/authorization/checkRelationship`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`checkRelationship failed with status ${response.status}`);
    }

    const body: unknown = await response.json();
    if (!isCheckRelationshipResponse(body)) {
      throw new Error("checkRelationship returned an invalid response body");
    }

    return body.allowed;
  };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isCheckRelationshipResponse = (value: unknown): value is CheckRelationshipResponse =>
  isRecord(value) && typeof value.allowed === "boolean";
