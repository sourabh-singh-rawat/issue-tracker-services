import { Field, ObjectType } from "type-graphql";
import { Space } from "./Space";

@ObjectType()
export class List {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  selectedViewId?: string;

  @Field()
  space!: Space;
}
