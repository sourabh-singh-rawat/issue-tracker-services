import { Repository } from "@sourabhrawatcc/core-utils";
import { UserProfileEntity } from "../../app/entities";

export interface UserProfileRepository extends Repository<UserProfileEntity> {
  findByUserId(userId: string): Promise<UserProfileEntity | null>;
}
