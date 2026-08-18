import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IProfileRepository } from "@/features/profiles/repositories/IProfileRepository";
import { IMeService, type CurrentUser } from "@/features/me/services/IMeService";
import type { ISessionService } from "@/features/session/services/ISessionService";

@injectable()
export class MeService implements IMeService {
  constructor(
    @inject(TYPES.SessionService)
    private readonly sessionService: ISessionService,
    @inject(TYPES.ProfileRepository)
    private readonly profileRepository: IProfileRepository,
  ) {}

  async getCurrentUser(sessionToken: string): Promise<CurrentUser> {
    const identity = await this.sessionService.getIdentityFromSessionToken(sessionToken);
    const profile = await this.profileRepository.findByIdentityId(identity.id);

    return { identity, profile };
  }
}
