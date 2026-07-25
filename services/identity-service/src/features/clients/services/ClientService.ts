import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database } from "@/db";
import type { IClientGrantTypeRepository } from "@/features/clients/repositories/IClientGrantTypeRepository";
import type { IClientRepository } from "@/features/clients/repositories/IClientRepository";
import type { IClientRedirectUriRepository } from "@/features/clients/repositories/IClientRedirectUriRepository";
import type { IClientScopeRepository } from "@/features/clients/repositories/IClientScopeRepository";
import type {
  ClientDetails,
  CreateClientInput,
  IClientService,
} from "@/features/clients/services/IClientService";
import type { IGrantRepository } from "@/features/grants/repositories/IGrantRepository";
import type { IScopeRepository } from "@/features/scopes/repositories/IScopeRepository";
import type { IOAuthProvider } from "@/integrations/oauth";

export const OAUTH_PROVIDER_HYDRA = "hydra";

@injectable()
export class ClientService implements IClientService {
  constructor(
    @inject(TYPES.ClientRepository)
    private readonly clientRepository: IClientRepository,
    @inject(TYPES.ClientRedirectUriRepository)
    private readonly clientRedirectUriRepository: IClientRedirectUriRepository,
    @inject(TYPES.ClientScopeRepository)
    private readonly clientScopeRepository: IClientScopeRepository,
    @inject(TYPES.ClientGrantTypeRepository)
    private readonly clientGrantTypeRepository: IClientGrantTypeRepository,
    @inject(TYPES.ScopeRepository)
    private readonly scopeRepository: IScopeRepository,
    @inject(TYPES.GrantRepository)
    private readonly grantRepository: IGrantRepository,
    @inject(TYPES.OAuthProvider)
    private readonly oauthProvider: IOAuthProvider,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createClient(input: CreateClientInput): Promise<ClientDetails> {
    const redirectUris = input.redirectUris ?? [];
    const scopeNames = input.scopes ?? [];
    const grantNames = input.grantTypes ?? [];

    const resolvedScopes = await this.scopeRepository.findByNames(scopeNames);

    if (resolvedScopes.length !== scopeNames.length) {
      const found = new Set(resolvedScopes.map((scope) => scope.name));
      const missing = scopeNames.filter((name) => !found.has(name));
      throw new Error(`Unknown scope(s): ${missing.join(", ")}`);
    }

    const resolvedGrants = await this.grantRepository.findByNames(grantNames);

    if (resolvedGrants.length !== grantNames.length) {
      const found = new Set(resolvedGrants.map((grant) => grant.name));
      const missing = grantNames.filter((name) => !found.has(name));
      throw new Error(`Unknown grant type(s): ${missing.join(", ")}`);
    }

    const details = await this.db.transaction(async (tx) => {
      const savedClient = await this.clientRepository.save({ name: input.name }, { tx });
      const savedRedirectUris = await this.clientRedirectUriRepository.saveMany(
        redirectUris.map((uri) => ({ clientId: savedClient.id, uri })),
        { tx },
      );
      const savedScopes = await this.clientScopeRepository.saveMany(
        resolvedScopes.map((scope) => ({ clientId: savedClient.id, scopeId: scope.id })),
        { tx },
      );
      const savedGrantTypes = await this.clientGrantTypeRepository.saveMany(
        resolvedGrants.map((grant) => ({ clientId: savedClient.id, grantId: grant.id })),
        { tx },
      );

      const scopeNameById = new Map(resolvedScopes.map((scope) => [scope.id, scope.name]));
      const grantNameById = new Map(resolvedGrants.map((grant) => [grant.id, grant.name]));

      return {
        ...savedClient,
        redirectUris: savedRedirectUris.map((row) => row.uri),
        scopes: savedScopes.map((row) => scopeNameById.get(row.scopeId) ?? row.scopeId),
        grantTypes: savedGrantTypes.map((row) => grantNameById.get(row.grantId) ?? row.grantId),
      };
    });

    try {
      const registered = await this.oauthProvider.registerClient({
        clientId: details.id,
        name: details.name,
        redirectUris: details.redirectUris,
        grantTypes: details.grantTypes,
        scopes: details.scopes,
      });

      const withProvider = await this.clientRepository.update(details.id, {
        oauthProvider: OAUTH_PROVIDER_HYDRA,
        providerClientId: registered.clientId,
      });

      return {
        ...details,
        oauthProvider: withProvider.oauthProvider,
        providerClientId: withProvider.providerClientId,
        updatedAt: withProvider.updatedAt,
        version: withProvider.version,
      };
    } catch (error) {
      await this.clientRepository.softDelete(details.id);
      throw error;
    }
  }

  async getClientById(id: string): Promise<ClientDetails | null> {
    return this.clientRepository.findDetailsById(id);
  }

  async deleteClientById(id: string): Promise<void> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error(`Client not found: ${id}`);
    }

    if (client.providerClientId) {
      await this.oauthProvider.deleteClient(client.providerClientId);
    }

    const deleted = await this.clientRepository.softDeleteWithRelations(id);
    if (!deleted) {
      throw new Error(`Client not found: ${id}`);
    }
  }
}
