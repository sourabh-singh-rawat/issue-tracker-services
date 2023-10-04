import { ProjectRegistrationData } from "@sourabhrawatcc/core-utils";
import { ProjectService } from "./interfaces/project.service";
import { RegisteredServices } from "../app/service-container";
import { ProjectEntity } from "../data/entities";

export class CoreProjectService implements ProjectService {
  private readonly databaseService;
  private readonly projectRepository;

  constructor(serviceContainer: RegisteredServices) {
    this.databaseService = serviceContainer.databaseService;
    this.projectRepository = serviceContainer.projectRepository;
  }

  createProject = async (
    userId: string,
    workspaceId: string,
    projectRegistrationData: ProjectRegistrationData,
  ) => {
    const { name, description, startDate, endDate, status } =
      projectRegistrationData;

    const newProject = new ProjectEntity();
    newProject.name = name;
    newProject.description = description;
    newProject.startDate = startDate;
    newProject.endDate = endDate;
    newProject.status = status;
    newProject.ownerUserId = userId;
    newProject.workspaceId = workspaceId;

    const queryRunner = this.databaseService.createQueryRunner();
    await this.databaseService.transaction(queryRunner, async (queryRunner) => {
      await this.projectRepository.save(newProject, { queryRunner });
    });
  };
}
