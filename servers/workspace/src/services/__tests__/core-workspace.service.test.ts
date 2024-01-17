import { databaseService } from "../../app/stores/postgres-typeorm.store";
import { CoreWorkspaceService } from "../core-workspace.service";
import { policyManager } from "../../app/guardians/casbin/workspace.guardian";
import { messageService } from "../../app/messengers/nats.messenger";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { PostgresWorkspaceRepository } from "../../data/repositories/postgres-workspace.repository";
import { PostgresWorkspaceMemberRepository } from "../../data/repositories/postgres-workspace-member.repository";
import { WorkspaceCreatedPublisher } from "../../messages/publishers/workspace-created.publisher";
import { UserEntity } from "../../data/entities";

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

    const user = new UserEntity();
    await userService.createDefaultWorkspace(user);

    expect(databaseService.transaction).toHaveBeenCalled();
    expect(databaseService.transaction).toBeDefined();
  });

  it("publishes the workspace created event", async () => {
    (databaseService.transaction as jest.Mock).mockReturnValue({
      id: workspaceId,
    });

    const user = new UserEntity();
    await userService.createDefaultWorkspace(user);

    expect(workspaceCreatedPublisher.publish).toHaveBeenCalled();
  });
});
