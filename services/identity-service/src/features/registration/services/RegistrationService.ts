import { createCloudEvent, UserRegisteredEvent } from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Identity } from "@/db";
import { IdentityProviderType } from "@/features/identities/constants";
import type { IIdentityRepository } from "@/features/identities/repositories/IIdentityRepository";
import { IRegistrationService } from "@/features/registration/services/IRegistrationService";
import type { IIdentityProvider } from "@/integrations/identity";

@injectable()
export class RegistrationService implements IRegistrationService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async registerWithEmailAndPassword(email: string, password: string): Promise<void> {
    const idpIdentity = await this.identityProvider.register({ email, password });

    try {
      await this.db.transaction(async (tx) => {
        const identity: Identity = await this.identityRepository.save(
          {
            email: idpIdentity.email,
            idpId: idpIdentity.id,
            idpProvider: IdentityProviderType.KRATOS,
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
            email: identity.email,
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
      });
    } catch (error) {
      await this.identityProvider.deleteIdentity(idpIdentity.id);
      throw error;
    }
  }
}
