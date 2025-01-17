import { Field, InputType } from "type-graphql";

@InputType()
export class CreateWorkspaceInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  description?: string;
}
