import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { UserProfileEntity } from "../entities/user-profile.entity";
import { UserProfileRepository } from "./interfaces/user-profile.repository";
import { Services } from "../../app/container.config";

export class PostgresUserProfileRepository implements UserProfileRepository {
  private _context;

  constructor(container: Services) {
    this._context = container.postgresContext;
  }

  save = async (
    userProfile: UserProfileEntity,
    options?: QueryBuilderOptions | undefined,
  ): Promise<UserProfileEntity> => {
    const { displayName, userId, defaultWorkspaceId, photoUrl } = userProfile;
    const queryRunner = options?.queryRunner;

    const query = this._context
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
    const result = await this._context.query<UserProfileEntity>(
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
    const query = this._context
      .queryBuilder(UserProfileEntity, "up", queryRunner)
      .softDelete()
      .where("id=:id", { id });

    await query.execute();
  };
}
