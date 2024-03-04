import { Repository } from "@sourabhrawatcc/core-utils";
import { UserProfileEntity } from "../../entities/user-profile.entity";

export interface UserProfileRepository extends Repository<UserProfileEntity> {
  findByUserId(userId: string): Promise<UserProfileEntity>;
}
