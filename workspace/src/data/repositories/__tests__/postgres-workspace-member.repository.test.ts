import { databaseService } from "../../../app/database-service";
import { WorkspaceMemberEntity } from "../../entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "../interface/workspace-member";
import { PostgresWorkspaceMemberRepository } from "../postgres-workspace-member.repository";

jest.mock("../../../app/database-service");

let workspaceMemberRepository: WorkspaceMemberRepository;

const mockUser = {
  id: "user-id",
  defaultWorkspaceId: "default-workspace-id",
};

beforeEach(() => {
  workspaceMemberRepository = new PostgresWorkspaceMemberRepository(
    databaseService,
  );
  // (databaseService.query as jest.Mock).mockClear();
});

it("should save a workspace member and return the saved workspace member object", async () => {
  const workspaceMember = new WorkspaceMemberEntity();

  const savedWorkspace = await workspaceMemberRepository.save(workspaceMember);
  expect(databaseService.createQueryBuilder).toHaveBeenCalled();
  expect(savedWorkspace).toBeDefined();
});

it.todo("should return true, if workspace with given id exists");

/**
 * async () => {
  const workspaceId = "some-workspace-id";
  const postgresFunctionName = "workspace_exists_by_id";

  (databaseService.query as jest.Mock).mockReturnValue([
    { [postgresFunctionName]: true },
  ]);
  const workspaceExists =
    await workspaceMemberRepository.existsById(workspaceId);
  expect(databaseService.query).toBeCalledWith(
    `SELECT * FROM ${postgresFunctionName}($1)`,
    [workspaceId],
  );
  expect(workspaceExists).toBe(true);
}
 */
