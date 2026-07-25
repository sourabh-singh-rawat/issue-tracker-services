import { type IPublisher, createCloudEvent, SUBJECTS, UserRegisteredEvent } from "@pine/events";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IRegistrationService } from "@/features/registration/services/IRegistrationService";
import type { Identity } from "@/db";
import { IdentityProviderType } from "@/features/identities/constants";
import type { IIdentityRepository } from "@/features/identities/repositories/IIdentityRepository";
import type { IIdentityProvider } from "@/integrations/identity";

@injectable()
export class RegistrationService implements IRegistrationService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
    @inject(TYPES.Publisher)
    private readonly publisher: IPublisher,
  ) {}

  async registerWithEmailAndPassword(email: string, password: string): Promise<void> {
    const idpIdentity = await this.identityProvider.register({ email, password });

    let identity: Identity;
    try {
      identity = await this.identityRepository.save({
        email: idpIdentity.email,
        idpId: idpIdentity.id,
        idpProvider: IdentityProviderType.KRATOS,
      });
    } catch (error) {
      await this.identityProvider.deleteIdentity(idpIdentity.id);
      throw error;
    }

    const event = createCloudEvent({
      type: UserRegisteredEvent.type,
      source: "pine/identity-service",
      subject: identity.id,
      data: {
        // Event contract still uses userId until events package is renamed.
        userId: identity.id,
        email: identity.email,
      },
    });

    await this.publisher.send(SUBJECTS.USER_REGISTERED, event);
  }
}
