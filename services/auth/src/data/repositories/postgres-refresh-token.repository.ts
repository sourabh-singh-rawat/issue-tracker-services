import { Typeorm } from "@issue-tracker/orm";
import { RefreshToken } from "../entities";
import { RefreshTokenRepository } from "./interfaces/refresh-token-repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (token: RefreshToken, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(RefreshToken)
      .values(token)
      .returning("*");

    return (await query.execute()).raw[0] as RefreshToken;
  };

  existsById = async (id: string) => {
    return await RefreshToken.exists({ where: { id } });
  };

  findTokenById = async (id: string) => {
    return await RefreshToken.findOne({ where: { id } });
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .softDelete()
      .where("id=:id", { id });

    await query.execute();
  };
}
