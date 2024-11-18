import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { User } from "../../entities";

export interface UserRepository extends Repository<User> {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateUser(
    id: string,
    updatedUser: User,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
