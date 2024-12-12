import { Field, InputType } from "type-graphql";

@InputType()
export class CreateFieldInput {
  @Field()
  id!: string

  @Field(() => String,{ nullable: true })
  value?: string
}