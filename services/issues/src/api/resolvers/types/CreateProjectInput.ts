import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  workspaceId!: string;
}
