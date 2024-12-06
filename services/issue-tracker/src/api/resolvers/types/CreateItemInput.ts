import { ItemPriority } from "@issue-tracker/common";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateItemInput {
  @Field()
  name!: string;

  @Field()
  type!: string;

  @Field()
  statusId!: string;

  @Field()
  priority!: ItemPriority;

  @Field()
  listId!: string;

  @Field({ nullable: true })
  parentItemId?: string;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  assigneeIds!: string[];
}
