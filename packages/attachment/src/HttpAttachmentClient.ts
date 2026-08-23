import Value from "typebox/value";
import type {
  CreateUploadTargetOptions,
  IAttachmentClient,
} from "./IAttachmentClient";
import {
  CreateUploadTargetResponseSchema,
  type CreateUploadTargetResponse,
} from "./schemas";

export interface HttpAttachmentClientOptions {
  baseUrl: string;
}

export class HttpAttachmentClient implements IAttachmentClient {
  private readonly baseUrl: string;

  constructor(options: HttpAttachmentClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
  }

  async createUploadTarget(
    options: CreateUploadTargetOptions,
  ): Promise<CreateUploadTargetResponse> {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (options.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    if (options.cookieHeader) {
      headers.Cookie = options.cookieHeader;
    }

    const response = await fetch(
      `${this.baseUrl}/internal/attachments/createUploadTarget`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(options.input),
      },
    );

    if (!response.ok) {
      throw new Error(
        `/internal/attachments/createUploadTarget failed with status ${response.status}`,
      );
    }

    const body: unknown = await response.json();
    if (!Value.Check(CreateUploadTargetResponseSchema, body)) {
      throw new Error("createUploadTarget returned an invalid response body");
    }

    return body;
  }
}
