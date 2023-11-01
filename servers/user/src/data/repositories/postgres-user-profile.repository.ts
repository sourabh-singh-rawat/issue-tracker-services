import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { UserProfileEntity } from "../entities/user-profile.entity";
import { UserProfileRepository } from "./interfaces/user-profile.repository";

export class PostgresUserProfileRepository implements UserProfileRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  save = async (
    userProfile: UserProfileEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserProfileEntity)
      .values(userProfile)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as UserProfileEntity;
  };

  existsById = async (id: string): Promise<boolean> => {
    console.log(id);
    throw new Error("Method not implemented.");
  };

  findByUserId = async (userId: string) => {
    const result = await this.databaseService.query<UserProfileEntity>(
      "SELECT * FROM find_user_profile_by_user_id($1)",
      [userId],
    );

    return result[0];
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .softDelete()
      .where("id=:id", { id });

    await query.execute();
  };
}
