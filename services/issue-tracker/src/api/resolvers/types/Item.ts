import { Field, ObjectType } from "type-graphql";
import { List } from "./List";

@ObjectType()
export class Item {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => List)
  list!: List;

  @Field(() => Item, { nullable: true })
  parentItem?: Item;

  @Field(() => [Item], { nullable: true })
  subItems?: Item[];
}
