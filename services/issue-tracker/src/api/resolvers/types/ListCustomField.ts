import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ListCustomField {
  @Field()
  id!: string;

  @Field()
  listId!: string;

  @Field()
  customFieldId!: string;
}
