import { EntityManager } from "typeorm";
import { User } from "@/entities/User";

export type UserRepositoryOptions = { manager: EntityManager };

export interface IUserRepository {
  save(entity: Partial<User>, options?: UserRepositoryOptions): Promise<User>;
  existsById(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  softDelete(id: string, options?: UserRepositoryOptions): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
