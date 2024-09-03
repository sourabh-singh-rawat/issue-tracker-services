import { ObjectLiteral, QueryRunner } from "typeorm";
import { SelectQueryBuilder } from "typeorm/browser";

export interface Typeorm {
  createQueryRunner(): QueryRunner;
  createQueryBuilder(qr?: QueryRunner): SelectQueryBuilder<ObjectLiteral>;
  transaction<T>(
    qr: QueryRunner,
    callback: (qr: QueryRunner) => T,
  ): Promise<T | null>;
  init(): Promise<void>;
}
