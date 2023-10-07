import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../../data/entities";

export interface UserService {
  updateUser(
    userId: string,
    defaultWorkspaceId: string,
    version: number,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
