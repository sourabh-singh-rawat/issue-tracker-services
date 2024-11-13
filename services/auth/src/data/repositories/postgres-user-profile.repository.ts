import { Typeorm } from "@issue-tracker/orm";
import { UserProfileRepository } from "./interfaces/user-profile.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { UserProfile } from "../entities/UserProfile";

export class PostgresUserProfileRepository implements UserProfileRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (userProfile: UserProfile, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserProfile)
      .values(userProfile)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as UserProfile;
  };

  existsById = async (id: string) => {
    return await UserProfile.exists({ where: { id } });
  };

  findByUserId = async (userId: string) => {
    return await UserProfile.findOne({ where: { userId } });
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .softDelete()
      .where("id=:id", { id });

    await query.execute();
  };
}
