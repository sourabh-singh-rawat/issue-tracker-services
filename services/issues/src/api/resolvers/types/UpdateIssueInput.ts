import { ItemPriority } from "@issue-tracker/common";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateIssueInput {
  @Field(() => String)
  issueId!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  statusId?: string;

  @Field(() => String, { nullable: true })
  priority?: ItemPriority;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  estimate?: number;

  @Field(() => String, { nullable: true })
  component?: string;
}
