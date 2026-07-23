import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { TYPES } from "@/bootstrap/container-types";
import { UserProfile } from "@/entities/UserProfile";
import {
  IUserProfileRepository,
  UserProfileRepositoryOptions,
} from "@/features/users/repositories/IUserProfileRepository";

@injectable()
export class UserProfileRepository implements IUserProfileRepository {
  constructor(@inject(TYPES.DataSource) private readonly dataSource: DataSource) {}

  private repository(options?: UserProfileRepositoryOptions): Repository<UserProfile> {
    if (options?.manager) {
      return options.manager.getRepository(UserProfile);
    }

    return this.dataSource.getRepository(UserProfile);
  }

  async save(entity: Partial<UserProfile>, options?: UserProfileRepositoryOptions) {
    return this.repository(options).save(entity);
  }

  async existsById(id: string) {
    return this.repository().exists({ where: { id } });
  }

  async softDelete(id: string, options?: UserProfileRepositoryOptions) {
    await this.repository(options).softDelete(id);
  }

  async findById(id: string) {
    return this.repository().findOne({ where: { id } });
  }

  async findByUserId(userId: string) {
    return this.repository().findOne({ where: { userId } });
  }
}
