import { postgresStore } from "../../../app/stores/postgres-typeorm.store";
import { WorkspaceEntity } from "../../entities";
import { WorkspaceRepository } from "../interfaces/workspace.repository";
import { PostgresWorkspaceRepository } from "../postgres-workspace.repository";

jest.mock("../../../app/database-service");

let workspaceRepository: WorkspaceRepository;

const mockWorkspace = {
  id: "workspace-id",
};

beforeEach(() => {
  workspaceRepository = new PostgresWorkspaceRepository(postgresStore);
});

describe("save workspace", () => {
  const workspace = new WorkspaceEntity();

  it("should create a query builder", async () => {
    await workspaceRepository.save(workspace);
    expect(postgresStore.createQueryBuilder).toHaveBeenCalledWith(
      WorkspaceEntity,
      "w",
      undefined,
    );
  });

  it("should pass query runner to query builder if provided", async () => {
    const queryRunner = postgresStore.createQueryRunner();
    await workspaceRepository.save(workspace, { queryRunner });

    expect(postgresStore.createQueryBuilder).toHaveBeenCalledWith(
      WorkspaceEntity,
      "w",
      queryRunner,
    );
  });

  const mockQueryBuilder = postgresStore.createQueryBuilder();
  it("should call insert function with no arguments", async () => {
    await workspaceRepository.save(workspace);
    expect(mockQueryBuilder.insert).toHaveBeenCalledWith();
  });

  it("should call into with WorkspaceEntity", async () => {
    await workspaceRepository.save(workspace);
    expect(mockQueryBuilder.insert().into).toHaveBeenCalledWith(
      WorkspaceEntity,
    );
  });

  it("should call values function with workspace", async () => {
    await workspaceRepository.save(workspace);
    expect(
      mockQueryBuilder.insert().into(WorkspaceEntity).values,
    ).toHaveBeenCalledWith(workspace);
  });

  it("should call returning function with *", async () => {
    await workspaceRepository.save(workspace);
    expect(
      mockQueryBuilder.insert().into(WorkspaceEntity).values(workspace)
        .returning,
    ).toHaveBeenCalledWith("*");
  });
});
