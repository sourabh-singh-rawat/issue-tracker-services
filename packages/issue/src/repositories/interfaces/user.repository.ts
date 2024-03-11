import { QueryBuilderOptions, Repository } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../../app/entities/user.entity";

export interface UserRepository extends Repository<UserEntity> {
  findById(id: string): Promise<UserEntity | null>;
  updateUser(
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
