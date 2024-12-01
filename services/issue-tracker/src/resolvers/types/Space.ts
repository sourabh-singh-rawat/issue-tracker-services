import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Space {
  @Field()
  id!: string;

  @Field()
  name!: string;
}
