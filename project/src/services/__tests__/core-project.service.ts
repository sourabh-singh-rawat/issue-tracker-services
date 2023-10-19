import { ProjectStatus } from "@sourabhrawatcc/core-utils";
import { databaseService } from "../../app/database-service";
import { projectPolicyManager } from "../../app/project-policy-manager";
import { PostgresProjectMemberRepository } from "../../data/repositories/postgres-project-member.repository";
import { PostgresProjectRepository } from "../../data/repositories/postgres-project.repository";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { CoreProjectService } from "../core-project.service";
import { ProjectService } from "../interfaces/project.service";
import { CoreUserService } from "../core-user.service";

jest.mock("../../app/database-service");
jest.mock("../../data/repositories/postgres-user.repository");
jest.mock("../../data/repositories/postgres-project.repository");

const userRepository = new PostgresUserRepository(databaseService);
const userService = new CoreUserService(userRepository);
const projectRepository = new PostgresProjectRepository(databaseService);
const projectMemberRepository = new PostgresProjectMemberRepository(
  databaseService,
);

let projectService: ProjectService;

beforeEach(() => {
  projectService = new CoreProjectService(
    databaseService,
    projectPolicyManager,
    userService,
    userRepository,
    projectRepository,
    projectMemberRepository,
  );
});

describe("getProjectStatuses", () => {
  it("can get project statuses", async () => {
    const statusList = projectService.getProjectStatusList();
    expect(statusList.rows).toBeDefined();
    expect(statusList.rows).toMatchObject(Object.values(ProjectStatus));
  });
});
