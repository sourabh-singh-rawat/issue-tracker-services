import { QueryBuilderOptions, Repository } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../../app/entities";

export interface UserRepository extends Repository<UserEntity> {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  // isOldPasswordMatch(id: string, password: string): Promise<boolean>;
  // update(id: string, user: UserUpdateDto): Promise<UserEntity>;
  // updateEmail(id: string, email: string): Promise<boolean>;
  // updateEmailVerificationStatus(id: string, status: string): Promise<void>;
  // updatePassword(
  //   id: string,
  //   password: string,
  //   opts?: RepositoryOptions,
  // ): Promise<boolean>;
}
