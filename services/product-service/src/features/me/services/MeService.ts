import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Identity } from "@/db";
import type { IIdentityRepository } from "@/features/identities";
import { IdentityNotFoundError } from "@/features/me/errors";
import type { IMeService } from "@/features/me/services/IMeService";

@injectable()
export class MeService implements IMeService {
  constructor(
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
  ) {}

  async getCurrentUser(identityId: string): Promise<Identity> {
    const identity = await this.identityRepository.findById(identityId);

    if (!identity) {
      throw new IdentityNotFoundError();
    }

    return identity;
  }
}
