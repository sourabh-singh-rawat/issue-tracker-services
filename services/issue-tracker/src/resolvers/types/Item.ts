import { Field, ObjectType } from "type-graphql";
import { List } from "./List";

@ObjectType()
export class Item {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  status!: string;

  @Field()
  priority!: string;

  @Field(() => List)
  list!: List;
}
