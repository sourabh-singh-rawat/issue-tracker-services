import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class List {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  selectedViewId?: string;
}
