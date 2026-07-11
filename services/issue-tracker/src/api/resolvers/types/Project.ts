import { Field, ObjectType } from "type-graphql";
import { Workspace } from "./Workspace";

@ObjectType()
export class Project {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  workspaceId!: string;

  @Field(() => Workspace)
  workspace!: Workspace;
}
