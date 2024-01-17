import { postgresTypeormStore } from "../../../app/stores/postgres-typeorm.store";
import { WorkspaceEntity } from "../../entities";
import { WorkspaceRepository } from "../interfaces/workspace.repository";
import { PostgresWorkspaceRepository } from "../postgres-workspace.repository";

jest.mock("../../../app/stores/postgres-typeorm.store");

let workspaceRepository: WorkspaceRepository;

const mockWorkspace = {
  id: "workspace-id",
};

beforeEach(() => {
  workspaceRepository = new PostgresWorkspaceRepository(postgresTypeormStore);
});

describe("save workspace", () => {
  const workspace = new WorkspaceEntity();

  it("should create a query builder", async () => {
    await workspaceRepository.save(workspace);
    expect(postgresTypeormStore.createQueryBuilder).toHaveBeenCalled();
  });

  it("should pass query runner to query builder if provided", async () => {
    const queryRunner = postgresTypeormStore.createQueryRunner();
    await workspaceRepository.save(workspace, { queryRunner });

    expect(postgresTypeormStore.createQueryBuilder).toHaveBeenCalled();
  });

  const mockQueryBuilder = postgresTypeormStore.createQueryBuilder();
  it("should call insert function with no arguments", async () => {
    await workspaceRepository.save(workspace);
    expect(mockQueryBuilder.insert).toHaveBeenCalled();
  });

  it("should call into with WorkspaceEntity", async () => {
    await workspaceRepository.save(workspace);
    expect(mockQueryBuilder.insert().into).toHaveBeenCalled();
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
