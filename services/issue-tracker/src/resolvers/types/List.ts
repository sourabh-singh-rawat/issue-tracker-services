import { Field, ObjectType } from "type-graphql";
import { Item } from "./Item";

@ObjectType()
export class List {
  @Field()
  id!: string;

  @Field()
  name!: string;
}
