import { UserNotFoundError, UserProfileNotFoundError } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Identity } from "@/db";
import { IAdminService } from "@/features/admin/services/IAdminService";
import type { IIdentityProfileRepository } from "@/features/identities/repositories/IIdentityProfileRepository";
import type { IIdentityRepository } from "@/features/identities/repositories/IIdentityRepository";
import type { IIdentityProvider } from "@/integrations/identity";
import { IdentityNotFoundError } from "@/integrations/identity";

@injectable()
export class AdminService implements IAdminService {
  constructor(
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
    @inject(TYPES.IdentityProfileRepository)
    private readonly identityProfileRepository: IIdentityProfileRepository,
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async deleteIdentity(identityId: string): Promise<void> {
    const identity = await this.identityRepository.findById(identityId);
    if (!identity) throw new UserNotFoundError();

    const idpId = identity.idpId;
    if (!idpId) throw new IdentityNotFoundError();
    await this.identityProvider.deleteIdentity(idpId);

    const profile = await this.identityProfileRepository.findByIdentityId(identityId);
    if (!profile) throw new UserProfileNotFoundError();

    await this.db.transaction(async (tx) => {
      await this.identityProfileRepository.softDelete(profile.id, { tx });
      await this.identityRepository.softDelete(identityId, { tx });
    });
  }

  async findIdentities(): Promise<Identity[]> {
    return this.identityRepository.findAll();
  }
}
