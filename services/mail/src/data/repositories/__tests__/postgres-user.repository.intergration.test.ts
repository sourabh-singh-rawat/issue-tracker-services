import { DataSource } from "typeorm";
import { PostgresUserRepository } from "../postgres-user.repository";
import { UserEntity } from "../../entities";
import { v4 } from "uuid";
import path from "path";
import { PostgresTypeorm } from "@issue-tracker/orm";
import { PinoAppLogger } from "@issue-tracker/server-core";

describe("PostgresUserRepository Integration Test", () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "postgres",
    port: 15433,
    entities: [path.resolve("./src/data/entities/*.ts")],
    synchronize: true,
  });

  const logger = new PinoAppLogger({ level: "info", timestamp: false });
  const orm = new PostgresTypeorm(dataSource, logger);

  beforeAll(async () => {
    await orm.init();
  });

  it("saves a user", async () => {
    const postgresUserRepository = new PostgresUserRepository(orm);
    const user = new UserEntity();
    user.email = v4() + "@test.com";
    user.displayName = "test";

    const savedUser = await postgresUserRepository.save(user);
    expect(savedUser).toBeDefined();
    expect(savedUser.version).toBe(1);
  });

  it.todo("saves a user and updates in transaction");
  it.todo("returns a user after saving");
  it.todo("updates a user");
  it.todo("updates a user in transaction");
  it.todo("updates a user and returns nothing");
  it.todo("finds a user");
  it.todo("checks if a user exists");
});
