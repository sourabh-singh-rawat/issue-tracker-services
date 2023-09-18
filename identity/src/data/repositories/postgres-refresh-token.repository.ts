import {
  PostgresContext,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { RefreshTokenEntity } from "../entities";
import { RefreshTokenRepository } from "./interfaces/refresh-token-repository";

export class PostgresRefreshTokenRepository implements RefreshTokenRepository {
  private readonly _context;

  constructor(container: { postgresContext: PostgresContext }) {
    this._context = container.postgresContext;
  }

  save = async (
    token: RefreshTokenEntity,
    options?: QueryBuilderOptions,
  ): Promise<RefreshTokenEntity> => {
    const { userId, expirationAt, tokenValue, id } = token;
    const queryRunner = options?.queryRunner;

    const query = this._context
      .queryBuilder(RefreshTokenEntity, "refresh_tokens", queryRunner)
      .insert()
      .into(RefreshTokenEntity)
      .values({ id, tokenValue, expirationAt, userId });

    return (await query.execute()).raw[0];
  };

  existsById = async (id: string): Promise<boolean> => {
    const result = await this._context.query<{
      refresh_token_exists_by_id: boolean;
    }>("SELECT * FROM refresh_token_exists_by_id($1)", [id]);

    return result[0].refresh_token_exists_by_id;
  };

  findTokenById = async (id: string): Promise<RefreshTokenEntity> => {
    const result = await this._context.query<RefreshTokenEntity>(
      "SELECT * FROM find_refresh_token_by_id($1)",
      [id],
    );

    return result[0];
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
