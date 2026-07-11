import { Field, InputType } from "type-graphql";

@InputType()
export class SignInWithEmailAndPasswordInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
