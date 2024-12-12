import { Field, InputType } from "type-graphql";

@InputType()
export class FindFieldsOptions {
  @Field()
  listId!: string;
}
