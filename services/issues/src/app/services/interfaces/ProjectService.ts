import { PaginatedOutput, PagingOptions } from "@issue-tracker/common";
import { ServiceOptions } from "@issue-tracker/orm";
import { Project } from "../../../data";

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

export interface ProjectService {
  createProject(options: CreateProjectOptions): Promise<string>;
  findProject(options: FindProjectOptions): Promise<Project>;
  findProjects(options: FindProjectsOptions): Promise<PaginatedOutput<Project>>;
  updateProject(options: UpdateProjectOptions): Promise<void>;
}
