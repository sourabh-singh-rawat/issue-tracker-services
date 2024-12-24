import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class View {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  type!: string;
}
