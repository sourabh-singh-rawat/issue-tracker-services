import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Workspace {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  createdById!: string;

  @Field(() => String)
  status!: string;
}
