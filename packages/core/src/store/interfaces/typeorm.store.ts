import { Store } from ".";
import { EntityTarget, ObjectLiteral, QueryRunner } from "typeorm";
import { SelectQueryBuilder } from "typeorm/browser";

export interface TypeormStore extends Store {
  query<T extends ObjectLiteral>(
    sql: string,
    params?: (string | number | undefined)[],
  ): Promise<T[]>;
  createQueryRunner(): QueryRunner;
  createQueryBuilder(
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<ObjectLiteral>;
  createDeleteQueryBuilder<Entity extends ObjectLiteral>(
    entityClass: EntityTarget<Entity>,
    alias: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Entity>;
  transaction<RValue>(
    queryRunner: QueryRunner,
    callback: (queryRunner: QueryRunner) => RValue,
  ): Promise<RValue | null>;
}
