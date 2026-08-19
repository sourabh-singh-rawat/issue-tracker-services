export type CreateUploadTargetInput = {
  storageObjectKey: string;
  contentType: string;
  size: number;
  expiresAt: Date;
};

export type UploadTarget = {
  objectId: string;
  url: string;
  headers: Record<string, string>;
  expiresAt: Date;
};

export type DownloadUrl = {
  url: string;
  expiresAt: Date;
};

export type ObjectMetadata = {
  objectId: string;
  contentType: string;
  size: number;
  sha256?: string;
};

export interface IObjectStorage {
  createUploadTarget: (input: CreateUploadTargetInput) => Promise<UploadTarget>;
  createDownloadUrl: (objectId: string) => Promise<DownloadUrl>;
  deleteObject: (objectId: string) => Promise<void>;
  getObjectMetadata: (objectId: string) => Promise<ObjectMetadata>;
};
