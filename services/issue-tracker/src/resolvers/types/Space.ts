import { Field, ObjectType } from "type-graphql";
import { List } from "./List";

@ObjectType()
export class Space {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field(() => [List])
  lists!: List[];
}
