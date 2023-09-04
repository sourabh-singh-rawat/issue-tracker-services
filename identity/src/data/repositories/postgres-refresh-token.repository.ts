import { PostgresContext } from "@sourabhrawatcc/core-utils";
import { RefreshTokenEntity } from "../entities";
import { RefreshTokenRepository } from "./interfaces/refresh-token-repository.interface";
import { QueryBuilderOptions } from "./interfaces/query-builder-options.interface";

export class PostgresRefreshTokenRepository implements RefreshTokenRepository {
  private readonly _context;
  constructor({ postgresContext }: { postgresContext: PostgresContext }) {
    this._context = postgresContext;
  }

  save = async (
    token: RefreshTokenEntity,
    options?: QueryBuilderOptions,
  ): Promise<void> => {
    const { expirationAt, tokenValue, userId } = token;
    const queryRunner = options?.queryRunner;

    const query = this._context
      .queryBuilder(RefreshTokenEntity, "refresh_tokens", queryRunner)
      .insert()
      .into(RefreshTokenEntity)
      .values({ tokenValue, expirationAt, userId });

    await query.execute();
  };

  /**
   * Soft deletes the refresh token
   * @param id
   */
  softDelete = async (
    id: string,
    options?: QueryBuilderOptions,
  ): Promise<void> => {
    const queryRunner = options?.queryRunner;

    const query = this._context
      .queryBuilder(RefreshTokenEntity, "at", queryRunner)
      .softDelete()
      .where("id=:id", { id });

    await query.execute();
  };
}
