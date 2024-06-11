import { Typeorm } from "@issue-tracker/orm";
import { UserProfileRepository } from "./interfaces/user-profile.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { UserProfileEntity } from "../entities/user-profile.entity";

export class PostgresUserProfileRepository implements UserProfileRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (
    userProfile: UserProfileEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserProfileEntity)
      .values(userProfile)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as UserProfileEntity;
  };

  existsById = async (id: string) => {
    return await UserProfileEntity.exists({ where: { id } });
  };

  findByUserId = async (userId: string) => {
    return await UserProfileEntity.findOne({ where: { userId } });
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
