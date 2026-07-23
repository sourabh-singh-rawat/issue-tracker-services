import { Configuration, FrontendApi, IdentityApi } from "@ory/kratos-client";
import { env } from "@/env";

export class KratosClient {
  readonly publicConfiguration: Configuration;
  readonly adminConfiguration: Configuration;
  readonly frontendApi: FrontendApi;
  readonly identityApi: IdentityApi;

  constructor(publicUrl: string = env.KRATOS_PUBLIC_URL, adminUrl: string = env.KRATOS_ADMIN_URL) {
    this.publicConfiguration = new Configuration({ basePath: publicUrl });
    this.adminConfiguration = new Configuration({ basePath: adminUrl });
    this.frontendApi = new FrontendApi(this.publicConfiguration);
    this.identityApi = new IdentityApi(this.adminConfiguration);
  }
}
