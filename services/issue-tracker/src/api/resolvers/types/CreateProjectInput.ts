import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProjectInput {
  @Field()
  name!: string;

  @Field()
  workspaceId!: string;
}
