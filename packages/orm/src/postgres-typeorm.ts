import { Typeorm } from "./interfaces";
import { DataSource, ObjectLiteral, QueryRunner } from "typeorm";
import { SelectQueryBuilder } from "typeorm/browser";
import {
  ConnectionRefusedError,
  MissingDataSource,
} from "@issue-tracker/common";
import { AppLogger } from "@issue-tracker/server-core";

export class PostgresTypeorm implements Typeorm {
  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    if (!dataSource) throw new MissingDataSource();

    this.logger = logger;
    this.dataSource = dataSource;
  }
  /**
   * Initializes the connection to the postgres cluster
   * Must have an data source
   */
  async init() {
    try {
      await this.dataSource.initialize();
      this.logger.info("Server connected to postgres cluster");
    } catch (error) {
      throw new ConnectionRefusedError(error!.toString());
    }
  }

  createQueryRunner() {
    return this.dataSource.createQueryRunner();
  }

  /**
   * Creates a query builder with dataSource for a given entity and name.
   * @returns
   */
  createQueryBuilder(queryRunner?: QueryRunner) {
    return this.dataSource.createQueryBuilder(
      queryRunner,
    ) as unknown as SelectQueryBuilder<ObjectLiteral>;
  }

  /**
   * Execute transactions
   * @param callback
   * @returns
   */
  async transaction<TReturnValue>(
    queryRunner: QueryRunner,
    callback: (queryRunner: QueryRunner) => TReturnValue,
  ): Promise<TReturnValue | null> {
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
  }
}
