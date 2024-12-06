import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterUserInput {
  @Field()
  displayName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
