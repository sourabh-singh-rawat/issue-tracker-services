import { IssuePriority, IssueStatus } from "@issue-tracker/common";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateItemInput {
  @Field()
  name!: string;

  @Field()
  type!: string;

  @Field()
  status!: IssueStatus;

  @Field()
  priority!: IssuePriority;

  @Field()
  listId!: string;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  assigneeIds!: string[];
}
