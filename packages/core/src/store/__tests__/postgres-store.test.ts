import { DataSource, QueryRunner } from "typeorm";
import { PostgresTypeormStore } from "../postgres-typeorm.store";
import { Logger } from "pino";

const mockLogger: Logger = {
  ...jest.requireActual("pino"),
  info: jest.fn(),
};

const dataSource: DataSource = {
  ...jest.requireActual("typeorm").DataSource,
  initialize: jest.fn(),
  createQueryBuilder: jest.fn(),
  createQueryRunner: jest.fn(),
  query: jest.fn(),
};

const mockQueryRunner: QueryRunner = {
  ...jest.requireActual("typeorm").QueryRunner,
  connect: jest.fn(),
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  release: jest.fn(),
};

jest.clearAllMocks();

const databaseService = new PostgresTypeormStore(dataSource, mockLogger);

it("can connect to postgres cluster using datasource", async () => {
  await databaseService.connect();
  expect(dataSource.initialize).toHaveBeenCalled();
});

it("can execute a sql query", async () => {
  await databaseService.query("SELECT * FROM user_exists_by_id($1)", ["7"]);
  expect(dataSource.query).toHaveBeenCalled();
});

it("can create a query builder", async () => {
  databaseService.createQueryBuilder(mockQueryRunner);
  expect(dataSource.createQueryBuilder).toHaveBeenCalled();
});

it("can create a query runner", async () => {
  databaseService.createQueryRunner();
  expect(dataSource.createQueryRunner).toHaveBeenCalled();
});

it("can execute a transaction", async () => {
  const callback = jest.fn();
  await databaseService.transaction(mockQueryRunner, callback);

  expect(callback).toBeCalled();
  expect(mockQueryRunner.connect).toHaveBeenCalled();
  expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
  expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
  expect(mockQueryRunner.release).toHaveBeenCalled();
});

it("can rollback a transaction", async () => {
  const callback = jest.fn();
  await databaseService.transaction(mockQueryRunner, callback);

  expect(callback).toHaveBeenCalled();
  expect(mockQueryRunner.release).toHaveBeenCalled();
});

it("client is released back to the pool on success", async () => {
  const callback = jest.fn();
  await databaseService.transaction(mockQueryRunner, callback);

  expect(mockQueryRunner.release).toHaveBeenCalled();
});

it("client is released back to the pool on error", async () => {
  const errorCallback = jest.fn().mockImplementation(() => {
    throw new Error("Something went wrong");
  });

  try {
    await databaseService.transaction(mockQueryRunner, errorCallback);
  } catch (error) {
    // ignore
  }

  expect(mockQueryRunner.release).toHaveBeenCalled();
});
