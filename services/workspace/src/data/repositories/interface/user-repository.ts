import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { UserEntity } from "../../entities";

export interface UserRepository extends Repository<UserEntity> {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  existsByEmail(email: string): Promise<boolean>;
  // isOldPasswordMatch(id: string, password: string): Promise<boolean>;
  // update(id: string, user: UserUpdateDto): Promise<UserEntity>;
  updateEmail(id: string, email: string): Promise<boolean>;
  updateUser(
    userId: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
  // updateEmailVerificationStatus(id: string, status: string): Promise<void>;
  // updatePassword(
  //   id: string,
  //   password: string,
  //   opts?: RepositoryOptions,
  // ): Promise<boolean>;
}
