import { Typeorm } from "@issue-tracker/orm";
import { AccessTokenRepository } from "./interfaces/access-token-repository";
import { AccessTokenEntity } from "../entities";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresAccessTokenRepository implements AccessTokenRepository {
  constructor(private readonly orm: Typeorm) {}

  existsById = async (id: string) => {
    return await AccessTokenEntity.exists({ where: { id } });
  };

  save = async (token: AccessTokenEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(AccessTokenEntity)
      .values(token)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as AccessTokenEntity;
  };

  softDelete = async (id: string, options: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .delete()
      .from(AccessTokenEntity)
      .where("id=:id", { id });

    await query.execute();
  };
}
