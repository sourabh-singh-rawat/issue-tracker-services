import { Repository } from "@issue-tracker/orm";
import { UserProfileEntity } from "../../entities";

export interface UserProfileRepository extends Repository<UserProfileEntity> {
  findByUserId(userId: string): Promise<UserProfileEntity | null>;
}
