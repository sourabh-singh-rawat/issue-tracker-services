import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { UserProfileEntity } from "../entities/user-profile.entity";
import { UserProfileRepository } from "./interfaces/user-profile.repository";
import { RegisteredServices } from "../../app/service-container";

export class PostgresUserProfileRepository implements UserProfileRepository {
  private databaseService;

  constructor(serviceContainer: RegisteredServices) {
    this.databaseService = serviceContainer.databaseService;
  }

  save = async (
    userProfile: UserProfileEntity,
    options?: QueryBuilderOptions | undefined,
  ): Promise<UserProfileEntity> => {
    const { displayName, userId, defaultWorkspaceId, photoUrl } = userProfile;
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .queryBuilder(UserProfileEntity, "up", queryRunner)
      .insert()
      .into(UserProfileEntity)
      .values({ displayName, userId, defaultWorkspaceId, photoUrl })
      .returning(["displayName", "userId", "defaultWorkspaceId", "photoUrl"]);

    return (await query.execute()).raw[0];
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

  softDelete = async (
    id: string,
    options?: QueryBuilderOptions | undefined,
  ): Promise<void> => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .queryBuilder(UserProfileEntity, "up", queryRunner)
      .softDelete()
      .where("id=:id", { id });

    await query.execute();
  };
}
