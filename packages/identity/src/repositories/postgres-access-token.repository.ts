import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { AccessTokenRepository } from "./interfaces/access-token-repository";
import { AccessTokenEntity } from "../app/entities";

export class PostgresAccessTokenRepository implements AccessTokenRepository {
  constructor(private readonly store: TypeormStore) {}

  existsById = async (id: string) => {
    return await AccessTokenEntity.exists({ where: { id } });
  };

  save = async (token: AccessTokenEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.store
      .createQueryBuilder(queryRunner)
      .insert()
      .into(AccessTokenEntity)
      .values(token)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as AccessTokenEntity;
  };

  softDelete = async (id: string, options: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.store
      .createQueryBuilder(queryRunner)
      .delete()
      .from(AccessTokenEntity)
      .where("id=:id", { id });

    await query.execute();
  };
}
