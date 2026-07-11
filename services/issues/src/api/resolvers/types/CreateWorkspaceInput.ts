import { Field, InputType } from "type-graphql";

@InputType()
export class CreateWorkspaceInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
