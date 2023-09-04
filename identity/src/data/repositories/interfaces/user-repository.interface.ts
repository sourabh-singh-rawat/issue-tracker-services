import { UserEntity } from "../../entities/user.entity";
import { QueryBuilderOptions } from "./query-builder-options.interface";

export interface UserRepository {
  save(user: UserEntity, options?: QueryBuilderOptions): Promise<UserEntity>;
  existsById(id: string): Promise<boolean>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  softDelete(id: string, options?: QueryBuilderOptions): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  // isOldPasswordMatch(id: string, password: string): Promise<boolean>;
  // update(id: string, user: UserUpdateDto): Promise<UserEntity>;
  updateEmail(id: string, email: string): Promise<boolean>;
  // updateEmailVerificationStatus(id: string, status: string): Promise<void>;
  // updatePassword(
  //   id: string,
  //   password: string,
  //   opts?: RepositoryOptions,
  // ): Promise<boolean>;
}
