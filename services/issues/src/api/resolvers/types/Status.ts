import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Status {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;
}
