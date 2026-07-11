import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { container, postgres } from "../..";
import { ProjectResolver } from "./interfaces";
import { CreateProjectInput, FindProjectsOptions, Project } from "./types";

@ObjectType()
export class PaginatedProject {
  @Field(() => [Project])
  rows!: Project[];

  @Field(() => Number)
  rowCount!: number;
}

@Resolver()
export class CoreProjectResolver implements ProjectResolver {
  @Mutation(() => String)
  async createProject(
    @Ctx() ctx: any,
    @Arg("input", () => CreateProjectInput) input: CreateProjectInput,
  ) {
    const service = container.get("projectService");
    const userId = ctx.user.userId;

    return await postgres.transaction(async (manager) => {
      return await service.createProject({ manager, userId, ...input });
    });
  }

  @Query(() => PaginatedProject)
  async findProjects(
    @Ctx() ctx: any,
    @Arg("input", () => FindProjectsOptions, { nullable: true })
    input?: FindProjectsOptions,
  ) {
    const service = container.get("projectService");
    const userId = ctx.user.userId;

    return await service.findProjects({
      userId,
      workspaceId: input?.workspaceId,
    });
  }

  @Query(() => Project)
  async findProject(@Ctx() ctx: any, @Arg("id", () => String) id: string) {
    const service = container.get("projectService");
    const userId = ctx.user.userId;

    return await service.findProject({ id, userId });
  }
}
