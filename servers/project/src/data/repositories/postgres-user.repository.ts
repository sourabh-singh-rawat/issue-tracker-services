import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./interfaces/user.repository";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly postgresTypeormStore: TypeormStore) {}

  save = async (user: UserEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserEntity)
      .values(user)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as UserEntity;
  };

  updateUser = async (
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .update(UserEntity)
      .set(updatedUser)
      .where("id = :id", { id });

    await query.execute();
  };

  findById = async (id: string) => {
    const result = await this.postgresTypeormStore.query<UserEntity>(
      "SELECT * FROM find_user_by_id($1)",
      [id],
    );

    return result[0] as UserEntity | null;
  };

  /**
   * Checks if user exists, by id
   * @param id
   * @returns true if user exists, false otherwise
   */
  existsById = async (id: string): Promise<boolean> => {
    const result = await this.postgresTypeormStore.query<{
      userExistsById: boolean;
    }>("SELECT * FROM user_exists_by_id($1)", [id]);

    return result[0].userExistsById;
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
