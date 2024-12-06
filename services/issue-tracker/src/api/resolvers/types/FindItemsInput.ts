import { Field, InputType } from "type-graphql";

@InputType()
export class FindItemsInput {
  @Field()
  listId!: string;

  @Field()
  parentItemId!: string;
}
