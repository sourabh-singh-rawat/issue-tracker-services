import type { DbClient, User } from "@/db";

export type UserRepositoryOptions = { tx?: DbClient };

export type CreateUserEntity = {
  id: string;
};

export interface IUserRepository {
  save(entity: CreateUserEntity, options?: UserRepositoryOptions): Promise<User>;
  findById(id: string, options?: UserRepositoryOptions): Promise<User | null>;
  existsById(id: string, options?: UserRepositoryOptions): Promise<boolean>;
}
