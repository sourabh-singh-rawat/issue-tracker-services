import { Field, InputType } from "type-graphql";

@InputType()
export class FindStatusesOptions {
  @Field()
  listId!: string;
}
