import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { AccessTokenRepository } from "./interfaces/access-token-repository";
import { AccessTokenEntity } from "../entities";

export class PostgresAccessTokenRepository implements AccessTokenRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  existsById(id: string): Promise<boolean> {
    console.log(id);
    throw new Error("Method not implemented.");
  }

  /**
   * Saves the access token
   * @param token access token to be saved
   * @param options options to be passed to query builder
   */
  save = async (token: AccessTokenEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(AccessTokenEntity)
      .values(token)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as AccessTokenEntity;
  };

  /**
   * Soft deletes the access token
   * @param id
   */
  softDelete = async (id: string, options: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .delete()
      .from(AccessTokenEntity)
      .where("id=:id", { id });

    await query.execute();
  };
}
