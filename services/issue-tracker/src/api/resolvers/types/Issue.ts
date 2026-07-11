import { Field, ObjectType, Int } from "type-graphql";
import { Project } from "./Project";

@ObjectType()
export class Issue {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  statusId!: string;

  @Field()
  priority!: string;

  @Field(() => Project)
  project!: Project;

  @Field(() => Issue, { nullable: true })
  parentIssue?: Issue;

  @Field(() => [Issue], { nullable: true })
  subIssues?: Issue[];

  @Field(() => Int, { nullable: true })
  estimate?: number;

  @Field({ nullable: true })
  component?: string;
}
