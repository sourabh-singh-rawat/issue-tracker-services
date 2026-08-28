import type { Readable } from "node:stream";

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

export type PutObjectInput = {
  storageObjectKey: string;
  contentType: string;
  body: Buffer | Uint8Array | string;
  contentLength?: number;
};

export type GetObjectOutput = {
  body: Readable;
  contentType?: string;
  contentLength?: number;
};

export interface IObjectStorage {
  createUploadTarget: (input: CreateUploadTargetInput) => Promise<UploadTarget>;
  putObject: (input: PutObjectInput) => Promise<void>;
  createDownloadUrl: (objectId: string) => Promise<DownloadUrl>;
  deleteObject: (objectId: string) => Promise<void>;
  copyObject: (sourceKey: string, destinationKey: string) => Promise<void>;
  moveObject: (sourceKey: string, destinationKey: string) => Promise<void>;
  getObjectMetadata: (objectId: string) => Promise<ObjectMetadata>;
  getObject: (objectId: string) => Promise<GetObjectOutput>;
}
