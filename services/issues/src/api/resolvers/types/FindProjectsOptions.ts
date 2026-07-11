import { Field, InputType } from "type-graphql";

@InputType()
export class FindProjectsOptions {
  @Field(() => String, { nullable: true })
  workspaceId?: string;
}
