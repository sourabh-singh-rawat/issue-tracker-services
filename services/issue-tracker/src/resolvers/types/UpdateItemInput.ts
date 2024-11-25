import { IssuePriority, IssueStatus } from "@issue-tracker/common";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateItemInput {
  @Field()
  itemId!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  status?: IssueStatus;

  @Field({ nullable: true })
  priority?: IssuePriority;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  description?: string;
}
