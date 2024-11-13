import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { User } from "../../entities";

export interface UserRepository extends Repository<User> {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(
    id: string,
    updatedUser: User,
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
