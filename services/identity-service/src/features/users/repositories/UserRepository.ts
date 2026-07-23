import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { TYPES } from "@/bootstrap/container-types";
import { User } from "@/entities/User";
import {
  IUserRepository,
  UserRepositoryOptions,
} from "@/features/users/repositories/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.DataSource) private readonly dataSource: DataSource) {}

  private repository(options?: UserRepositoryOptions): Repository<User> {
    if (options?.manager) {
      return options.manager.getRepository(User);
    }

    return this.dataSource.getRepository(User);
  }

  async save(entity: Partial<User>, options?: UserRepositoryOptions) {
    return this.repository(options).save(entity);
  }

  async existsById(id: string) {
    return this.repository().exists({ where: { id } });
  }

  async existsByEmail(email: string) {
    return this.repository().exists({ where: { email } });
  }

  async softDelete(id: string, options?: UserRepositoryOptions) {
    await this.repository(options).softDelete(id);
  }

  async findById(id: string) {
    return this.repository().findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.repository().findOne({ where: { email } });
  }
}
