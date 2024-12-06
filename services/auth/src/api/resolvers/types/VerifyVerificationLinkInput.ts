import { Field, InputType } from "type-graphql";

@InputType()
export class VerifyVerificationLinkInput {
  @Field()
  token!: string;
}
