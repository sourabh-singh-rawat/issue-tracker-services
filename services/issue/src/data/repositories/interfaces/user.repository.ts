import { UserEntity } from "../../entities/user.entity";
import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";

export interface UserRepository extends Repository<UserEntity> {
  findById(id: string): Promise<UserEntity | null>;
  updateUser(
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
