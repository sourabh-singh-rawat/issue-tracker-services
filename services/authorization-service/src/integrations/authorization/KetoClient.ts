import { Configuration, PermissionApi, RelationshipApi } from "@ory/keto-client";
import { env } from "@/bootstrap/env";

export class KetoClient {
  readonly readConfiguration: Configuration;
  readonly writeConfiguration: Configuration;
  readonly permissionApi: PermissionApi;
  readonly relationshipReadApi: RelationshipApi;
  readonly relationshipWriteApi: RelationshipApi;

  constructor(readUrl: string = env.KETO_READ_URL, writeUrl: string = env.KETO_WRITE_URL) {
    this.readConfiguration = new Configuration({ basePath: readUrl });
    this.writeConfiguration = new Configuration({ basePath: writeUrl });
    this.permissionApi = new PermissionApi(this.readConfiguration);
    this.relationshipReadApi = new RelationshipApi(this.readConfiguration);
    this.relationshipWriteApi = new RelationshipApi(this.writeConfiguration);
  }
}
