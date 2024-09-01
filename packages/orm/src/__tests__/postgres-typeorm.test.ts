import { PinoAppLogger } from "@issue-tracker/server-core";
import { PostgresTypeorm } from "../postgres-typeorm";
import { DataSource } from "typeorm";
import { Typeorm } from "../interfaces";

jest.mock("typeorm", () => {
  const actualTypeorm = jest.requireActual("typeorm");
  return {
    ...actualTypeorm,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn(),
      createQueryRunner: jest.fn().mockReturnValue({
        connect: jest.fn(),
        startTransaction: jest.fn(),
        release: jest.fn(),
        rollbackTransaction: jest.fn(),
        commitTransaction: jest.fn(),
      }),
      createQueryBuilder: jest.fn(),
    })),
  };
});

describe("Postgres Typeorm", () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "postgres",
    port: 5432,
  });
  const logger = new PinoAppLogger({ level: "info", timestamp: true });
  let postgres: Typeorm;

  beforeAll(async () => {
    postgres = new PostgresTypeorm(dataSource, logger);
    await postgres.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initializes a connection with postgres", async () => {
    expect(dataSource.initialize).toHaveBeenCalledTimes(1);
  });

  it("creates a query runner using typeorm's createQueryRunner", async () => {
    const queryRunner = postgres.createQueryRunner();
    postgres.createQueryBuilder(queryRunner);

    expect(dataSource.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it("creates a query builder using typeorm's createQueryBuilder", async () => {
    const queryRunner = postgres.createQueryRunner();
    postgres.createQueryBuilder(queryRunner);

    expect(dataSource.createQueryRunner).toHaveBeenCalledTimes(1);
    expect(dataSource.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it("picks a client from pool using typeorm's queryRunner.connect()", async () => {
    const queryRunner = dataSource.createQueryRunner();
    await postgres.transaction(queryRunner, async () => {});

    expect(queryRunner.connect).toHaveBeenCalledTimes(1);
  });

  it("starts transaction using typeorm's queryRunner.startTransaction()", async () => {
    const queryRunner = dataSource.createQueryRunner();
    await postgres.transaction(queryRunner, async () => {});

    expect(queryRunner.startTransaction).toHaveBeenCalledTimes(1);
  });

  it("commits a transaction using typeorm's queryRunner.commitTransaction()", async () => {
    const queryRunner = dataSource.createQueryRunner();
    await postgres.transaction(queryRunner, async () => {});

    expect(queryRunner.commitTransaction).toHaveBeenCalledTimes(1);
    expect(queryRunner.rollbackTransaction).not.toHaveBeenCalledTimes(1);
  });

  it("releases the client back to pool when done", async () => {
    const queryRunner = dataSource.createQueryRunner();
    await postgres.transaction(queryRunner, async () => {});

    expect(queryRunner.release).toHaveBeenCalledTimes(1);
  });

  it.todo(
    "rollbacks transaction using typeorm's queryRunner.rollbackTransaction()",
  );

  it.todo(
    "releases the client back to pool after rolling back the failed transaction",
  );
  // it("rollbacks transaction using typeorm's queryRunner.rollbackTransaction()", async () => {
  //   const queryRunner = dataSource.createQueryRunner();

  //   expect(
  //     postgres.transaction(queryRunner, async () => {
  //       throw new Error();
  //     }),
  //   ).rejects.toThrow();

  //   expect(queryRunner.commitTransaction).not.toHaveBeenCalled();
  //   expect(queryRunner.rollbackTransaction).toHaveBeenCalledTimes(1);
  //   expect(queryRunner.release).toHaveBeenCalledTimes(1);
  // });
});
