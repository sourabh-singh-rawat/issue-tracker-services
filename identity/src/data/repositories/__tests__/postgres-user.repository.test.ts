import { PostgresContext } from "@sourabhrawatcc/core-utils";
import { PostgresUserRepository } from "../postgres-user.repository";
import { DataSource } from "typeorm";

const mockQueryBuilder = {};
const mockDataSource: DataSource = {
  ...jest.requireActual("typeorm").DataSource.prototype,
  queryBuilder: mockQueryBuilder,
  query: jest.fn(),
  transaction: jest.fn(),
};
const postgresContext = new PostgresContext(mockDataSource);
const userRepository = new PostgresUserRepository({ postgresContext });

it("checks if user with email exists", async () => {
  const mockQueryResult = [{ user_exists_by_email: true }];
  (mockDataSource.query as jest.Mock).mockResolvedValue(mockQueryResult);

  const result = await userRepository.existsByEmail("test@example.com");

  expect(result).toBeTruthy();
});
