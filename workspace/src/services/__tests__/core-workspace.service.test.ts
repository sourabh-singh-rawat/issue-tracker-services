import { databaseService } from "../../app/database-service";
import { CoreWorkspaceService } from "../core-workspace.service";
import { policyManager } from "../../app/policy-manager";
import { messageService } from "../../app/message-service";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { PostgresWorkspaceRepository } from "../../data/repositories/postgres-workspace.repository";
import { PostgresWorkspaceMemberRepository } from "../../data/repositories/postgres-workspace-member.repository";
import { WorkspaceCreatedPublisher } from "../../messages/publishers/workspace-created.publisher";

jest.mock("../../app/policy-manager");
jest.mock("../../app/database-service");
jest.mock("../../app/message-service");
jest.mock("../../data/repositories/postgres-user.repository");
jest.mock("../../data/repositories/postgres-user.repository");
jest.mock("../../messages/publishers/workspace-created.publisher");

const userRepository = new PostgresUserRepository(databaseService);
const workspaceRepository = new PostgresWorkspaceRepository(databaseService);
const workspaceMemberRepository = new PostgresWorkspaceMemberRepository(
  databaseService,
);

const workspaceCreatedPublisher = new WorkspaceCreatedPublisher(messageService);
const userService = new CoreWorkspaceService(
  policyManager,
  databaseService,
  userRepository,
  workspaceRepository,
  workspaceMemberRepository,
  workspaceCreatedPublisher,
);

describe("save default workspace", () => {
  const userId = "user-id";
  const isEmailVerified = true;
  const workspaceId = "workspace-id";

  it("can save a default workspace", async () => {
    (databaseService.transaction as jest.Mock).mockReturnValue({
      id: workspaceId,
    });

    await userService.createDefaultWorkspace(
      userId,
      isEmailVerified,
      workspaceId,
    );

    expect(databaseService.transaction).toHaveBeenCalled();
    expect(databaseService.transaction).toBeDefined();
  });

  it("publishes the workspace created event", async () => {
    (databaseService.transaction as jest.Mock).mockReturnValue({
      id: workspaceId,
    });

    await userService.createDefaultWorkspace(
      userId,
      isEmailVerified,
      workspaceId,
    );

    expect(workspaceCreatedPublisher.publish).toHaveBeenCalled();
  });
});
