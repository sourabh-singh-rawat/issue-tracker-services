import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterUserInput {
  @Field(() => String)
  displayName!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
