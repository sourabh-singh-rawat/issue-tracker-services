import { Field, InputType } from "type-graphql";

@InputType()
export class FindProjectsOptions {
  @Field({ nullable: true })
  workspaceId?: string;
}
