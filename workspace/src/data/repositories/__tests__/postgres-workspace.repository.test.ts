import { databaseService } from "../../../app/database-service";
import { WorkspaceEntity } from "../../entities";
import { WorkspaceRepository } from "../interface/workspace-repository";
import { PostgresWorkspaceRepository } from "../postgres-workspace.repository";

jest.mock("../../../app/database-service");

let workspaceRepository: WorkspaceRepository;

const mockUser = {
  id: "user-id",
  defaultWorkspaceId: "default-workspace-id",
};

beforeEach(() => {
  workspaceRepository = new PostgresWorkspaceRepository(databaseService);
});

it("should save a workspace and return the saved workspace object", async () => {
  const workspace = new WorkspaceEntity();

  const savedWorkspace = await workspaceRepository.save(workspace);
  expect(databaseService.createQueryBuilder).toHaveBeenCalled();
  expect(savedWorkspace).toBeDefined();
});

it("should return true, if workspace with given id exists", async () => {
  const workspaceId = "some-workspace-id";
  const postgresFunctionName = "workspace_exists_by_id";

  (databaseService.query as jest.Mock).mockReturnValue([
    { [postgresFunctionName]: true },
  ]);
  const workspaceExists = await workspaceRepository.existsById(workspaceId);
  expect(databaseService.query).toBeCalledWith(
    `SELECT * FROM ${postgresFunctionName}($1)`,
    [workspaceId],
  );
  expect(workspaceExists).toBe(true);
});

it("should return workspace, if workspace with given id exists", async () => {
  const workspaceId = "some-workspace-id";
  (databaseService.query as jest.Mock).mockReturnValue([mockUser]);
  const workspace = await workspaceRepository.findById(workspaceId);
  expect(workspace).toBeDefined();
  expect(workspace).toHaveProperty("id");
});

it("should return all the workspaces belonging to user", async () => {
  const userId = "some-workspace-id";
  (databaseService.query as jest.Mock).mockReturnValue([mockUser, mockUser]);
  const workspaces = await workspaceRepository.find(userId);
  expect(workspaces).toBeDefined();
  expect(workspaces.length).toBeGreaterThan(1);
});
