import { builder } from "@pine/graphql-core";
import { Issue } from "@/entities/Issue";
import { ProjectObject } from "@/features/project/graphql/objects/ProjectObject";

export const IssueObject = builder.objectRef<Issue>("IssueObject");

IssueObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    statusId: t.exposeString("statusId"),
    priority: t.exposeString("priority"),
    project: t.field({
      type: ProjectObject,
      resolve: (parent) => parent.project,
    }),
    parentIssue: t.field({
      type: IssueObject,
      nullable: true,
      resolve: (parent) => parent.parentIssue ?? null,
    }),
    subIssues: t.field({
      type: [IssueObject],
      nullable: true,
      resolve: (parent) => parent.subIssues ?? null,
    }),
    estimate: t.exposeInt("estimate", { nullable: true }),
    component: t.exposeString("component", { nullable: true }),
  }),
});
