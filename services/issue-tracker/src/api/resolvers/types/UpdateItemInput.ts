import { ItemPriority } from "@issue-tracker/common";
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
  statusId?: string;

  @Field({ nullable: true })
  priority?: ItemPriority;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  description?: string;
}
