import type { ILogger } from "@pine/server";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { oauthClients } from "@/bootstrap/oauth-clients";
import type { IClientSeederService } from "@/features/clients/services/IClientSeederService";
import type { IOAuthClientProvider } from "@/integrations/oauth";

@injectable()
export class ClientSeederService implements IClientSeederService {
  constructor(
    @inject(TYPES.OAuthClientProvider)
    private readonly oauthClientProvider: IOAuthClientProvider,
    @inject(TYPES.Logger)
    private readonly logger: ILogger,
  ) {}

  async seed(): Promise<void> {
    for (const client of oauthClients) {
      const existing = await this.oauthClientProvider.getClient(client.clientId);
      if (existing) {
        this.logger.info(`oauth client exists client_id=${client.clientId}`);
        continue;
      }

      await this.oauthClientProvider.registerClient(client);
      this.logger.info(`oauth client registered client_id=${client.clientId}`);
    }
  }
}
