import { Field, ObjectType } from "type-graphql";
import { Workspace } from "./Workspace";

@ObjectType()
export class Project {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  workspaceId!: string;

  @Field(() => Workspace)
  workspace!: Workspace;
}
