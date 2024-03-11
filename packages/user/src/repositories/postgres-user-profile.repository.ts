import { QueryBuilderOptions, TypeormStore } from "@sourabhrawatcc/core-utils";
import { UserProfileRepository } from "./interfaces/user-profile.repository";
import { UserProfileEntity } from "../app/entities";

export class PostgresUserProfileRepository implements UserProfileRepository {
  constructor(private readonly store: TypeormStore) {}

  save = async (
    userProfile: UserProfileEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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
    const query = this.store
      .createQueryBuilder(queryRunner)
      .softDelete()
      .where("id=:id", { id });

    await query.execute();
  };
}
