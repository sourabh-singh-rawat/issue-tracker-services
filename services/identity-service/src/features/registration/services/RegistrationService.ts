import { type IPublisher, createCloudEvent, SUBJECTS, UserRegisteredEvent } from "@pine/events";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IRegistrationService } from "@/features/registration/services/IRegistrationService";
import type { User } from "@/db";
import { IdentityProviderType } from "@/features/users/constants";
import type { IUserRepository } from "@/features/users/repositories/IUserRepository";
import type { IIdentityProvider } from "@/integrations/identity";

@injectable()
export class RegistrationService implements IRegistrationService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.Publisher)
    private readonly publisher: IPublisher,
  ) {}

  async registerWithEmailAndPassword(email: string, password: string): Promise<void> {
    const identity = await this.identityProvider.register({ email, password });

    let user: User;
    try {
      user = await this.userRepository.save({
        email: identity.email,
        idpId: identity.id,
        idpProvider: IdentityProviderType.KRATOS,
      });
    } catch (error) {
      await this.identityProvider.deleteIdentity(identity.id);
      throw error;
    }

    const event = createCloudEvent({
      type: UserRegisteredEvent.type,
      source: "pine/identity-service",
      subject: user.id,
      data: {
        userId: user.id,
        email: user.email,
      },
    });

    await this.publisher.send(SUBJECTS.USER_REGISTERED, event);
  }
}
