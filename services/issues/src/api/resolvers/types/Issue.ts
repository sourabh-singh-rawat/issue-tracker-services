import { Field, ObjectType, Int } from "type-graphql";
import { Project } from "./Project";

@ObjectType()
export class Issue {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  statusId!: string;

  @Field(() => String)
  priority!: string;

  @Field(() => Project)
  project!: Project;

  @Field(() => Issue, { nullable: true })
  parentIssue?: Issue;

  @Field(() => [Issue], { nullable: true })
  subIssues?: Issue[];

  @Field(() => Int, { nullable: true })
  estimate?: number;

  @Field(() => String, { nullable: true })
  component?: string;
}
