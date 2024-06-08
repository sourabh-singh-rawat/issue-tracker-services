import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { UserEntity } from "../../entities";

export interface UserRepository extends Repository<UserEntity> {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  updateUser(
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
