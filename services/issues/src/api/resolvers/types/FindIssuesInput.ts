import { Field, InputType } from "type-graphql";

@InputType()
export class FindIssuesInput {
  @Field(() => String)
  parentIssueId!: string;
}
