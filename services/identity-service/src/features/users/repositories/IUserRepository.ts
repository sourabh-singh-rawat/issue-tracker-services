import type { User } from "@/db";
import type { DbClient } from "@/db";

export type UserRepositoryOptions = { tx: DbClient };

export interface IUserRepository {
  save(entity: Partial<User> & { email: string }, options?: UserRepositoryOptions): Promise<User>;
  update(
    id: string,
    entity: Partial<Pick<User, "email" | "idpId" | "idpProvider" | "deletedAt">>,
    options?: UserRepositoryOptions,
  ): Promise<User>;
  existsById(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  softDelete(id: string, options?: UserRepositoryOptions): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
