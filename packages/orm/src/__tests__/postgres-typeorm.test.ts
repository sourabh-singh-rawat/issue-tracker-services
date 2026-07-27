import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { PinoLogger } from "@pine/http-core";
import pino from "pino";
import { DataSource } from "typeorm";
import { Typeorm } from "../interfaces";
import { PostgresTypeorm } from "../postgres-typeorm";

vi.mock("typeorm", async (importOriginal) => {
  const actualTypeorm = await importOriginal<typeof import("typeorm")>();
  return {
    ...actualTypeorm,
    DataSource: vi
      .fn()
      .mockImplementation(
        function MockDataSource(this: {
          initialize: ReturnType<typeof vi.fn>;
          createQueryRunner: ReturnType<typeof vi.fn>;
          createQueryBuilder: ReturnType<typeof vi.fn>;
        }) {
          this.initialize = vi.fn();
          this.createQueryRunner = vi.fn().mockReturnValue({
            connect: vi.fn(),
            startTransaction: vi.fn(),
            release: vi.fn(),
            rollbackTransaction: vi.fn(),
            commitTransaction: vi.fn(),
          });
          this.createQueryBuilder = vi.fn();
        },
      ),
  };
});

describe("Postgres Typeorm", () => {
  const mockDataSource = new DataSource({ type: "postgres" });
  const logger = new PinoLogger(
    pino({ transport: { target: "pino-pretty", options: { colorize: true } } }),
  );
  let orm: Typeorm;

  beforeAll(async () => {
    orm = new PostgresTypeorm(mockDataSource, logger);
    await orm.init();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("initializes a connection with postgres", async () => {
    expect(mockDataSource.initialize).toHaveBeenCalledTimes(1);
  });

  it("creates a query runner using typeorm's createQueryRunner", async () => {
    const queryRunner = orm.createQueryRunner();
    orm.createQueryBuilder(queryRunner);

    expect(mockDataSource.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it("creates a query builder using typeorm's createQueryBuilder", async () => {
    const queryRunner = orm.createQueryRunner();
    orm.createQueryBuilder(queryRunner);

    expect(mockDataSource.createQueryRunner).toHaveBeenCalledTimes(1);
    expect(mockDataSource.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it("picks a client from pool using typeorm's queryRunner.connect()", async () => {
    const queryRunner = mockDataSource.createQueryRunner();
    await orm.transaction(queryRunner, async () => {});

    expect(queryRunner.connect).toHaveBeenCalledTimes(1);
  });

  it("starts transaction using typeorm's queryRunner.startTransaction()", async () => {
    const queryRunner = mockDataSource.createQueryRunner();
    await orm.transaction(queryRunner, async () => {});

    expect(queryRunner.startTransaction).toHaveBeenCalledTimes(1);
  });

  it("commits a transaction using typeorm's queryRunner.commitTransaction()", async () => {
    const queryRunner = mockDataSource.createQueryRunner();
    await orm.transaction(queryRunner, async () => {});

    expect(queryRunner.commitTransaction).toHaveBeenCalledTimes(1);
    expect(queryRunner.rollbackTransaction).not.toHaveBeenCalledTimes(1);
  });

  it("releases the client back to pool when done", async () => {
    const queryRunner = mockDataSource.createQueryRunner();
    await orm.transaction(queryRunner, async () => {});

    expect(queryRunner.release).toHaveBeenCalledTimes(1);
  });

  it("rollbacks transaction using typeorm's queryRunner.rollbackTransaction()", async () => {
    const queryRunner = mockDataSource.createQueryRunner();

    await orm.transaction(queryRunner, async () => {
      throw new Error("Some error");
    });
    expect(queryRunner.commitTransaction).not.toHaveBeenCalled();
    expect(queryRunner.rollbackTransaction).toHaveBeenCalledTimes(1);
  });

  it("releases the client back to pool after rolling back the failed transaction", async () => {
    const queryRunner = mockDataSource.createQueryRunner();

    await orm.transaction(queryRunner, async () => {
      throw new Error("Some error");
    });

    expect(queryRunner.rollbackTransaction).toHaveBeenCalledTimes(1);
    expect(queryRunner.release).toHaveBeenCalledTimes(1);
  });
});
