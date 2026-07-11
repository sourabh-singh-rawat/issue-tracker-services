import { PaginatedOutput } from "@issue-tracker/common";
import { CreateProjectInput, FindProjectsOptions, Project } from "../types";

export interface ProjectResolver {
  createProject(ctx: any, input: CreateProjectInput): Promise<string>;
  findProject(ctx: any, id: string): Promise<Project>;
  findProjects(
    ctx: any,
    input?: FindProjectsOptions,
  ): Promise<PaginatedOutput<Project>>;
}
