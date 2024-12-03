import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Status {
  @Field()
  id!: string;

  @Field()
  name!: string;
}
