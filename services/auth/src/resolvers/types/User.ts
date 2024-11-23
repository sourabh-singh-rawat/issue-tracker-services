import { EmailVerificationStatus } from "@issue-tracker/common";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  userId!: string;

  @Field()
  email!: string;

  @Field()
  emailVerificationStatus!: EmailVerificationStatus;

  @Field()
  createdAt!: Date;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field({ nullable: true })
  description?: string;
}
