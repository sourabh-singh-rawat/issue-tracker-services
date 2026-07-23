import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IRegistrationService } from "@/features/registration/services/IRegistrationService";
import type { IUserRepository } from "@/features/users/repositories/IUserRepository";
import type { IIdentityProvider } from "@/integrations/identity";

@injectable()
export class RegistrationService implements IRegistrationService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async registerUserWithEmailAndPassword(email: string, password: string): Promise<void> {
    const identity = await this.identityProvider.register({ email, password });

    await this.userRepository.save({ email: identity.email, externalId: identity.id });
  }
}
