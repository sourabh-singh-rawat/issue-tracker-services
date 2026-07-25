import { UserNotFoundError, UserProfileNotFoundError } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, User } from "@/db";
import { IAdminService } from "@/features/admin/services/IAdminService";
import type { IUserProfileRepository } from "@/features/users/repositories/IUserProfileRepository";
import type { IUserRepository } from "@/features/users/repositories/IUserRepository";
import type { IIdentityProvider } from "@/integrations/identity";
import { IdentityNotFoundError } from "@/integrations/identity";

@injectable()
export class AdminService implements IAdminService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.UserProfileRepository)
    private readonly userProfileRepository: IUserProfileRepository,
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundError();

    const idpId = user.idpId;
    if (!idpId) throw new IdentityNotFoundError();
    await this.identityProvider.deleteIdentity(idpId);

    const profile = await this.userProfileRepository.findByUserId(userId);
    if (!profile) throw new UserProfileNotFoundError();

    await this.db.transaction(async (tx) => {
      await this.userProfileRepository.softDelete(profile.id, { tx });
      await this.userRepository.softDelete(userId, { tx });
    });
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
