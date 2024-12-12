import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldOutput {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  type!: string;

  @Field(() => String, { nullable: true })
  value?: string | string[] | null;
}
