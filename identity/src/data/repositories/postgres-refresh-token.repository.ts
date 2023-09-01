import { PostgresContext } from "@sourabhrawatcc/core-utils";
import { RefreshTokenDTO } from "../../dtos/tokens/refresh-token.dto";
import { RefreshTokenEntity } from "../entities";
import { RefreshTokenRepository } from "./interfaces/refresh-token-repository.interface";
import { RepositoryOptions } from "./interfaces/user-repository.interface";

export class PostgresRefreshTokenRepository implements RefreshTokenRepository {
  private readonly _context;
  constructor({ postgresContext }: { postgresContext: PostgresContext }) {
    this._context = postgresContext;
  }

  save = async (
    entity: RefreshTokenDTO,
    { t }: RepositoryOptions,
  ): Promise<void> => {
    const { expirationAt, tokenValue, userId } = entity;

    const query = this._context
      .queryBuilder(RefreshTokenEntity, "refresh_tokens", t)
      .insert()
      .into(RefreshTokenEntity)
      .values({ tokenValue, expirationAt, userId });

    await query.execute();
  };
}
