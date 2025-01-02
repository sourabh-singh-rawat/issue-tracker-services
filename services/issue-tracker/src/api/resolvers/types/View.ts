import { Field, ObjectType } from "type-graphql";
import { List } from "./List";

@ObjectType()
export class View {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  type!: string;

  @Field()
  list!: List;

  @Field()
  order!: number;
}
