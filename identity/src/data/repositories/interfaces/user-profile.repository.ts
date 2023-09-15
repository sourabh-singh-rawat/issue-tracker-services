import { UserProfileEntity } from "../../entities";
import { Repository } from "./repository";

export interface UserProfileRepository extends Repository<UserProfileEntity> {
  findUserProfileByUserId(userId: string): Promise<UserProfileEntity>;
}
