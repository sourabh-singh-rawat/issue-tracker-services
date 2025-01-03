import { Field, InputType } from "type-graphql";

@InputType()
export class FindItemsInput {
  @Field()
  parentItemId!: string;
}
