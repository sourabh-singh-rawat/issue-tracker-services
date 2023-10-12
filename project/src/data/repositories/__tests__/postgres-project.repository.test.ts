import { Filters } from "@sourabhrawatcc/core-utils";
import { databaseService } from "../../../app/database-service";
import { ProjectEntity } from "../../entities";
import { ProjectRepository } from "../interfaces/project.repository";
import { PostgresProjectRepository } from "../postgres-project.repository";

jest.mock("../../../app/database-service");

let projectRepository: ProjectRepository;

const mockProject = {
  id: "project-id",
};

beforeEach(() => {
  projectRepository = new PostgresProjectRepository(databaseService);
  jest.clearAllMocks();
});

describe("save project", () => {
  const project = new ProjectEntity();

  it("should create a query builder", async () => {
    await projectRepository.save(project);
    expect(databaseService.createQueryBuilder).toHaveBeenCalledWith(
      ProjectEntity,
      "p",
      undefined,
    );
  });

  it("should pass query runner to query builder if provided", async () => {
    const queryRunner = databaseService.createQueryRunner();
    await projectRepository.save(project, { queryRunner });

    expect(databaseService.createQueryBuilder).toHaveBeenCalledWith(
      ProjectEntity,
      "p",
      queryRunner,
    );
  });

  const mockQueryBuilder = databaseService.createQueryBuilder(
    ProjectEntity,
    "p",
  );
  it("should call insert function with no arguments", async () => {
    await projectRepository.save(project);
    expect(mockQueryBuilder.insert).toHaveBeenCalledWith();
  });

  it("should call into with ProjectEntity", async () => {
    await projectRepository.save(project);
    expect(mockQueryBuilder.insert().into).toHaveBeenCalledWith(ProjectEntity);
  });

  it("should call values function with project", async () => {
    await projectRepository.save(project);
    expect(
      mockQueryBuilder.insert().into(ProjectEntity).values,
    ).toHaveBeenCalledWith(project);
  });

  it("should call returning function with *", async () => {
    await projectRepository.save(project);
    expect(
      mockQueryBuilder.insert().into(ProjectEntity).values(project).returning,
    ).toHaveBeenCalledWith("*");
  });
});

describe("project exists", () => {
  const projectId = "some-user-id";

  it("should call query function (project_exists_by_id)", async () => {
    const postgresFunctionName = "project_exists_by_id";
    (databaseService.query as jest.Mock).mockReturnValue([
      { [postgresFunctionName]: true },
    ]);

    await projectRepository.existsById(projectId);
    expect(databaseService.query).toBeCalledWith(
      `SELECT * FROM ${postgresFunctionName}($1)`,
      [projectId],
    );
  });
});

describe("get all projects", () => {
  const userId = "user-id";
  const workspaceId = "workspace-id-1";

  it("should call query function (find_projects_by_user_id_and_workspace_id)", async () => {
    const postgresFunctionName = "find_projects_by_user_id_and_workspace_id";
    (databaseService.query as jest.Mock).mockReturnValue([
      { [postgresFunctionName]: true },
    ]);

    const filters: Filters = {
      page: 1,
      pageSize: 10,
      sortBy: "",
      sortOrder: "",
    };
    const { page, pageSize, sortBy, sortOrder } = filters;

    await projectRepository.find(userId, workspaceId, filters);

    expect(databaseService.query).toHaveBeenCalledWith(
      `SELECT * FROM ${postgresFunctionName}($1, $2, $3, $4, $5, $6)`,
      [userId, workspaceId, sortBy, sortOrder, pageSize, page * pageSize],
    );
  });
});
