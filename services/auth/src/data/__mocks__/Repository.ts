import { DataSource, EntityManager } from "typeorm";
import { UserProfile } from "../entities";

jest.mock("typeorm", () => {
  const actual = jest.requireActual("typeorm");
  return {
    ...actual,
    EntityManager: jest.fn(() => {
      return {
        getRepository: jest.fn((name) => {
          switch (name) {
            case UserProfile:
              return UserProfileMock;
            default:
              throw new Error("Unknown Repository");
          }
        }),
      };
    }),
  };
});

export const mockDataSource: DataSource = new DataSource({ type: "postgres" });
export const mockManager: EntityManager = new EntityManager(mockDataSource);

export const UserProfileMock = {
  save: jest.fn(),
  update: jest.fn(),
};
