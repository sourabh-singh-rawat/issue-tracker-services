import { ObjectLiteral, QueryRunner } from "typeorm";
import { SelectQueryBuilder } from "typeorm/browser";

export interface Typeorm {
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
