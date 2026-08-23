import type {
  CreateUploadTargetInput,
  CreateUploadTargetResponse,
} from "./schemas";

export interface CreateUploadTargetOptions {
  input: CreateUploadTargetInput;
  token?: string;
  cookieHeader?: string;
}

export interface IAttachmentClient {
  createUploadTarget: (
    options: CreateUploadTargetOptions,
  ) => Promise<CreateUploadTargetResponse>;
}
