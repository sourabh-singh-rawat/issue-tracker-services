import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Workspace {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  ownerUserId!: string;

  @Field()
  status!: string;
}