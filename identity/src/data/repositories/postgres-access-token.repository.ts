import { AccessTokenRepository } from "./interfaces/access-token-repository.interface";
import { AccessTokenEntity } from "../entities";
import { PostgresContext } from "@sourabhrawatcc/core-utils";
import { QueryBuilderOptions } from "./interfaces/query-builder-options.interface";

export class PostgresAccessTokenRepository implements AccessTokenRepository {
  private readonly _context;
  constructor({ postgresContext }: { postgresContext: PostgresContext }) {
    this._context = postgresContext;
  }

  /**
   * Saves the access token
   * @param token access token to be saved
   * @param options options to be passed to query builder
   */
  save = async (
    token: AccessTokenEntity,
    options?: QueryBuilderOptions,
  ): Promise<void> => {
    const { expirationAt, tokenValue, userId } = token;
    const queryRunner = options?.queryRunner;

    const query = this._context
      .queryBuilder(AccessTokenEntity, "at", queryRunner)
      .insert()
      .into(AccessTokenEntity)
      .values({ tokenValue, expirationAt, userId });

    await query.execute();
  };

  /**
   * Soft deletes the access token
   * @param id
   */
  softDelete = async (
    id: string,
    options: QueryBuilderOptions,
  ): Promise<void> => {
    const queryRunner = options?.queryRunner;

    const query = this._context
      .queryBuilder(AccessTokenEntity, "at", queryRunner)
      .delete()
      .from(AccessTokenEntity)
      .where("id=:id", { id });

    await query.execute();
  };
}
