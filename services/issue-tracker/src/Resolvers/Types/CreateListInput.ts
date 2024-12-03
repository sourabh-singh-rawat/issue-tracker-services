import { ProjectStatus } from "@issue-tracker/common";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateListInput {
  @Field()
  name!: string;

  @Field()
  spaceId!: string;
}
