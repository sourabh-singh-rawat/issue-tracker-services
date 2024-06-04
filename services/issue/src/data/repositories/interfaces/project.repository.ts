import { Repository } from "@issue-tracker/orm";
import { ProjectEntity } from "../../entities/project.entity";

export interface ProjectRepository extends Repository<ProjectEntity> {}
