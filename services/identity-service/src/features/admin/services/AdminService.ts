import { UserNotFoundError } from "@pine/common";
import { createCloudEvent, UserRegisteredEvent } from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Identity } from "@/db";
import {
  IAdminService,
  type CreateIdentityOptions,
} from "@/features/admin/services/IAdminService";
import { IdentityProviderType } from "@/features/identities/constants";
import type { IIdentityProfileRepository } from "@/features/identities/repositories/IIdentityProfileRepository";
import type { IIdentityRepository } from "@/features/identities/repositories/IIdentityRepository";
import type { IIdentityAdminProvider } from "@/integrations/identity";

@injectable()
export class AdminService implements IAdminService {
  constructor(
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
    @inject(TYPES.IdentityProfileRepository)
    private readonly identityProfileRepository: IIdentityProfileRepository,
    @inject(TYPES.IdentityAdminProvider)
    private readonly identityAdminProvider: IIdentityAdminProvider,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createIdentity(options: CreateIdentityOptions): Promise<Identity> {
    const idpIdentity = await this.identityAdminProvider.createIdentity({
      email: options.email,
      username: options.username,
      password: options.password,
      emailVerified: options.emailVerified,
    });

    try {
      return await this.db.transaction(async (tx) => {
        const identity = await this.identityRepository.save(
          {
            idpId: idpIdentity.id,
            idpProvider: IdentityProviderType.KRATOS,
          },
          { tx },
        );

        await this.identityProfileRepository.save(
          {
            identityId: identity.id,
            firstName: options.firstName,
            middleName: options.middleName,
            lastName: options.lastName,
          },
          { tx },
        );

        const event = createCloudEvent({
          type: UserRegisteredEvent.type,
          version: UserRegisteredEvent.version,
          schema: UserRegisteredEvent.schema,
          source: "pine/identity-service",
          subject: identity.id,
          data: {
            userId: identity.id,
          },
        });

        await this.outboxService.schedule(
          {
            eventId: event.id,
            eventType: event.type,
            eventVersion: UserRegisteredEvent.version,
            aggregateType: "identity",
            aggregateId: identity.id,
            payload: event,
          },
          { tx },
        );

        return identity;
      });
    } catch (error) {
      await this.identityAdminProvider.deleteIdentity(idpIdentity.id);
      throw error;
    }
  }

  async deleteIdentity(identityId: string): Promise<void> {
    const identity = await this.identityRepository.findById(identityId);
    if (!identity) throw new UserNotFoundError();

    await this.identityAdminProvider.deleteIdentity(identity.idpId);

    const profile = await this.identityProfileRepository.findByIdentityId(identityId);

    await this.db.transaction(async (tx) => {
      if (profile) {
        await this.identityProfileRepository.softDelete(profile.id, { tx });
      }
      await this.identityRepository.softDelete(identityId, { tx });
    });
  }

  async findIdentities(): Promise<Identity[]> {
    return this.identityRepository.findAll();
  }
}
