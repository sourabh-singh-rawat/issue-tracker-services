import { Typeorm } from "@issue-tracker/orm";
import { RefreshTokenEntity } from "../entities";
import { RefreshTokenRepository } from "./interfaces/refresh-token-repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (token: RefreshTokenEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(RefreshTokenEntity)
      .values(token)
      .returning("*");

    return (await query.execute()).raw[0] as RefreshTokenEntity;
  };

  existsById = async (id: string) => {
    return await RefreshTokenEntity.exists({ where: { id } });
  };

  findTokenById = async (id: string) => {
    return await RefreshTokenEntity.findOne({ where: { id } });
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
