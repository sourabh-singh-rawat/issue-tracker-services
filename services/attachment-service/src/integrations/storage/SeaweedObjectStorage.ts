import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { injectable } from "inversify";
import { env } from "@/bootstrap/env";
import type {
  CreateUploadTargetInput,
  DownloadUrl,
  IObjectStorage,
  ObjectMetadata,
  PutObjectInput,
  UploadTarget,
} from "@/integrations/storage/IObjectStorage";

@injectable()
export class SeaweedObjectStorage implements IObjectStorage {
  private readonly s3 = new S3Client({
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY,
      secretAccessKey: env.S3_SECRET_KEY,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });

  async createUploadTarget(input: CreateUploadTargetInput): Promise<UploadTarget> {
    const expiresIn = Math.max(1, Math.floor((input.expiresAt.getTime() - Date.now()) / 1000));
    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: input.storageObjectKey,
      ContentType: input.contentType,
      ContentLength: input.size,
    });
    const signedUrl = await getSignedUrl(this.s3, command, { expiresIn });
    const targetUrl = new URL(signedUrl);
    const gatewayUrl = new URL(env.DATA_GATEWAY_URL);
    targetUrl.protocol = gatewayUrl.protocol;
    targetUrl.host = gatewayUrl.host;

    return {
      objectId: input.storageObjectKey,
      url: targetUrl.toString(),
      headers: {
        "Content-Type": input.contentType,
      },
      expiresAt: input.expiresAt,
    };
  }

  async putObject(input: PutObjectInput): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: input.storageObjectKey,
      ContentType: input.contentType,
      ContentLength: input.contentLength,
      Body: input.body,
    });
    await this.s3.send(command);
  }

  async createDownloadUrl(_objectId: string): Promise<DownloadUrl> {
    throw new Error("Not implemented");
  }

  async deleteObject(_objectId: string): Promise<void> {
    throw new Error("Not implemented");
  }

  async getObjectMetadata(_objectId: string): Promise<ObjectMetadata> {
    throw new Error("Not implemented");
  }
}
