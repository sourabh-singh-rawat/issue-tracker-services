import { EmailVerificationStatus } from "@issue-tracker/common";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => String)
  userId!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  emailVerificationStatus!: EmailVerificationStatus;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => String, { nullable: true })
  displayName?: string;

  @Field(() => String, { nullable: true })
  photoUrl?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
