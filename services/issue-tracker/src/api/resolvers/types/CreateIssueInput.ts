import { ItemPriority } from "@issue-tracker/common";
import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class CreateIssueInput {
  @Field()
  name!: string;

  @Field()
  type!: string;

  @Field()
  projectId!: string;

  @Field({ nullable: true })
  parentIssueId?: string;

  @Field(() => ID)
  statusId!: string;

  @Field()
  priority!: ItemPriority;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  assigneeIds!: string[];

  @Field(() => Int, { nullable: true })
  estimate?: number;

  @Field({ nullable: true })
  component?: string;
}
