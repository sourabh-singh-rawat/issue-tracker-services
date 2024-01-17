import { NatsMessenger, ProjectStatus } from "@sourabhrawatcc/core-utils";
import { postgresTypeormStore } from "../../app/stores/postgres-typeorm.store";
import { CasbinProjectGuardian } from "../../app/guardians/casbin/casbin-project.guardian";
import { PostgresProjectMemberRepository } from "../../data/repositories/postgres-project-member.repository";
import { PostgresProjectRepository } from "../../data/repositories/postgres-project.repository";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { CoreProjectService } from "../core-project.service";
import { ProjectService } from "../interfaces/project.service";
import { CoreUserService } from "../core-user.service";
import { PostgresWorkspaceMemberRepository } from "../../data/repositories/postgres-workspace-member.repository";
import { ProjectCreatedPublisher } from "../../messages/publishers/project-created.publisher";
import { ProjectUpdatedPublisher } from "../../messages/publishers/project-updated.publisher";
import { ProjectMemberCreatedPublisher } from "../../messages/publishers/project-member-created.publisher";

jest.mock("../../../app/stores/postgres-typeorm.store");
jest.mock("../../data/repositories/postgres-user.repository");
jest.mock("../../data/repositories/postgres-project.repository");

const messenger: NatsMessenger = {
  connect: jest.fn(),
  connectionOptions: jest.fn(),
  connection: jest.fn(),
};
const userRepository = new PostgresUserRepository(postgresTypeormStore);
const workspaceRepository = new PostgresWorkspaceMemberRepository(
  postgresTypeormStore,
);
const userService = new CoreUserService(userRepository);
const projectRepository = new PostgresProjectRepository(postgresTypeormStore);
const projectMemberRepository = new PostgresProjectMemberRepository(
  postgresTypeormStore,
);
const projectCreatedPublisher = new ProjectCreatedPublisher(messenger);
const projectUpdatedPublisher = new ProjectUpdatedPublisher(messenger);
const projectMemberCreatedPublisher = new ProjectMemberCreatedPublisher(
  messenger,
);

let projectService: ProjectService;

beforeEach(() => {
  projectService = new CoreProjectService(
    new CasbinProjectGuardian(),
    postgresTypeormStore,
    userService,
    userRepository,
    projectRepository,
    workspaceRepository,
    projectMemberRepository,
    projectCreatedPublisher,
    projectUpdatedPublisher,
    projectMemberCreatedPublisher,
  );
});

describe("getProjectStatuses", () => {
  it("can get project statuses", async () => {
    const statusList = projectService.getProjectStatusList();
    expect(statusList.rows).toBeDefined();
    expect(statusList.rows).toMatchObject(Object.values(ProjectStatus));
  });
});
