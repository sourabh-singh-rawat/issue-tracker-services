import { Typeorm } from "@issue-tracker/orm";
import { AccessTokenRepository } from "./interfaces/access-token-repository";
import { AccessToken } from "../entities";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresAccessTokenRepository implements AccessTokenRepository {
  constructor(private readonly orm: Typeorm) {}

  existsById = async (id: string) => {
    return await AccessToken.exists({ where: { id } });
  };

  save = async (token: AccessToken, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(AccessToken)
      .values(token)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as AccessToken;
  };

  softDelete = async (id: string, options: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .delete()
      .from(AccessToken)
      .where("id=:id", { id });

    await query.execute();
  };
}
