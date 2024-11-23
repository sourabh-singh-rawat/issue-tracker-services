import { Field, InputType } from "type-graphql";

@InputType()
export class SignInWithEmailAndPasswordInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
