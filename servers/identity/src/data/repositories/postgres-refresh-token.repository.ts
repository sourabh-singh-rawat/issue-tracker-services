import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { RefreshTokenEntity } from "../entities";
import { RefreshTokenRepository } from "./interfaces/refresh-token-repository";

export class PostgresRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  save = async (token: RefreshTokenEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(RefreshTokenEntity)
      .values(token)
      .returning("*");

    return (await query.execute()).raw[0] as RefreshTokenEntity;
  };

  existsById = async (id: string): Promise<boolean> => {
    const result = await this.databaseService.query<{
      refreshTokenExistsById: boolean;
    }>("SELECT * FROM refresh_token_exists_by_id($1)", [id]);

    return result[0].refreshTokenExistsById;
  };

  findTokenById = async (id: string): Promise<RefreshTokenEntity> => {
    const result = await this.databaseService.query<RefreshTokenEntity>(
      "SELECT * FROM find_refresh_token_by_id($1)",
      [id],
    );

    return result[0];
  };

  /**
   * Soft deletes the refresh token
   * @param id
   */
  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .softDelete()
      .where("id=:id", { id });

    await query.execute();
  };
}
