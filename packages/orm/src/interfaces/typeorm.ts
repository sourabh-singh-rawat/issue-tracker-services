import { ObjectLiteral, QueryRunner } from "typeorm";
import { SelectQueryBuilder } from "typeorm/browser";

export interface Typeorm {
  query<T extends ObjectLiteral>(
    sql: string,
    params?: (string | number | undefined)[],
  ): Promise<T[]>;
  createQueryRunner(): QueryRunner;
  createQueryBuilder(
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<ObjectLiteral>;
  transaction<RValue>(
    queryRunner: QueryRunner,
    callback: (queryRunner: QueryRunner) => RValue,
  ): Promise<RValue | null>;
  init(): Promise<void>;
}
