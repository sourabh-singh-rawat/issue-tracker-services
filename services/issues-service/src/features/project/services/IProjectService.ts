import { PaginatedOutput, PagingOptions } from "@pine/common";
import { ServiceOptions } from "@pine/orm";
import { Project } from "@/entities/Project";

export interface CreateProjectOptions extends ServiceOptions {
  userId: string;
  workspaceId: string;
  name: string;
}

export interface FindProjectsOptions extends PagingOptions {
  userId: string;
  workspaceId?: string;
}

export interface UpdateProjectOptions extends ServiceOptions {
  id: string;
  name?: string;
}

export interface FindProjectOptions {
  id: string;
  userId: string;
}

export interface IProjectService {
  createProject(options: CreateProjectOptions): Promise<string>;
  findProject(options: FindProjectOptions): Promise<Project>;
  findProjects(options: FindProjectsOptions): Promise<PaginatedOutput<Project>>;
  updateProject(options: UpdateProjectOptions): Promise<void>;
}
