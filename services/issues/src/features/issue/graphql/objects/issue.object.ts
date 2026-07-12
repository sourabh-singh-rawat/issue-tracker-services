import { builder } from "@issue-tracker/graphql-core";
import { Project } from "@/features/project/graphql/objects/project.object";

// Shape intentionally loose: TypeORM Issue trees and nested parent/sub-issue
// relations make a precise recursive type awkward for Pothos field builders.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Issue: any = builder.objectRef<any>("Issue");

Issue.implement({
  fields: (t: any) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    statusId: t.exposeString("statusId"),
    priority: t.exposeString("priority"),
    project: t.field({
      type: Project,
      resolve: (parent: any) => parent.project,
    }),
    parentIssue: t.field({
      type: Issue,
      nullable: true,
      resolve: (parent: any) => parent.parentIssue ?? null,
    }),
    subIssues: t.field({
      type: [Issue],
      nullable: true,
      resolve: (parent: any) => parent.subIssues ?? null,
    }),
    estimate: t.exposeInt("estimate", { nullable: true }),
    component: t.exposeString("component", { nullable: true }),
  }),
});
