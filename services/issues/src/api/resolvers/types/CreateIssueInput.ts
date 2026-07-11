import { ItemPriority } from "@issue-tracker/common";
import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class CreateIssueInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  projectId!: string;

  @Field(() => String, { nullable: true })
  parentIssueId?: string;

  @Field(() => ID)
  statusId!: string;

  @Field(() => String)
  priority!: ItemPriority;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String])
  assigneeIds!: string[];

  @Field(() => Int, { nullable: true })
  estimate?: number;

  @Field(() => String, { nullable: true })
  component?: string;
}
