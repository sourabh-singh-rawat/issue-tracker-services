import { ItemPriority } from "@issue-tracker/common";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateIssueInput {
  @Field()
  issueId!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  statusId?: string;

  @Field({ nullable: true })
  priority?: ItemPriority;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  estimate?: number;

  @Field({ nullable: true })
  component?: string;
}
