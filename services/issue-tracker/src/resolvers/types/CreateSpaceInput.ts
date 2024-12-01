import { Field, InputType } from "type-graphql";

@InputType()
export class CreateSpaceInput {
  @Field()
  name!: string;

  @Field()
  workspaceId!: string;

  @Field({ nullable: true })
  description?: string;
}
