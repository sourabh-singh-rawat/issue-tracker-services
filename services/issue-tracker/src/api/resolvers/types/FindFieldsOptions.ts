import { Field, InputType } from "type-graphql";

@InputType()
export class FindCustomFieldsOptions {
  @Field()
  listId!: string;
}
