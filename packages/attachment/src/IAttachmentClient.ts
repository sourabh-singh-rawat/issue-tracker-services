import type {
  CreateUploadTargetInput,
  CreateUploadTargetResponse,
} from "./schemas";

export interface CreateUploadTargetOptions {
  input: CreateUploadTargetInput;
  identityId: string;
  authMethod?: "access_token" | "session";
}

export interface IAttachmentClient {
  createUploadTarget: (
    options: CreateUploadTargetOptions,
  ) => Promise<CreateUploadTargetResponse>;
}
