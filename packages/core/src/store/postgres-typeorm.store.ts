import { Logger } from "pino";
import { TypeormStore } from "./interfaces";
import { ConnectionRefusedError, MissingDataSource } from "./errors";
import { DataSource, EntityTarget, ObjectLiteral, QueryRunner } from "typeorm";
import { SelectQueryBuilder } from "typeorm/browser";

export class PostgresTypeormStore implements TypeormStore {
  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: Logger,
  ) {
    if (!dataSource) throw new MissingDataSource();

    this.logger = logger;
    this.dataSource = dataSource;
  }

  /**
   * Initializes the connection to the postgres cluster
   * Must have an data source
   */
  connect = async () => {
    try {
      await this.dataSource.initialize();
      this.logger.info("Server connected to postgres cluster");
    } catch (error) {
      console.log(error);
      throw new ConnectionRefusedError(error!.toString());
    }
  };

  /**
   * Executes a sql statement and transforms the result into entity
   * @param sql The sql statement to execute
   * @param params The parameters to query
   * @returns Result object
   */
  query = async <T extends ObjectLiteral>(
    sql: string,
    params?: (string | number | undefined)[],
  ) => {
    const result = await this.dataSource.query<T[]>(sql, params);
    const { default: camelCaseKeys } = await import("camelcase-keys");

    return camelCaseKeys(result, { deep: true }) as T[];
  };

  createQueryRunner = () => {
    return this.dataSource.createQueryRunner();
  };

  /**
   * Creates a query builder with dataSource for a given entity and name.
   * @returns
   */
  createQueryBuilder = (queryRunner?: QueryRunner) => {
    return this.dataSource.createQueryBuilder(
      queryRunner
    ) as unknown as SelectQueryBuilder<ObjectLiteral>;
  };

  // @ts-ignore
  createDeleteQueryBuilder = <Entity extends ObjectLiteral>(
    entityClass: EntityTarget<Entity>,
    alias: string,
    queryRunner?: QueryRunner,
  ) => {
    return this.dataSource.createQueryBuilder(entityClass, alias, queryRunner);
  };

  /**
   * Execute transactions
   * @param callback
   * @returns
   */
  transaction = async <TReturnValue>(
    queryRunner: QueryRunner,
    callback: (queryRunner: QueryRunner) => TReturnValue,
  ): Promise<TReturnValue | null> => {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let returnValue = null;
    try {
      returnValue = await callback(queryRunner);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return returnValue;
  };
}
