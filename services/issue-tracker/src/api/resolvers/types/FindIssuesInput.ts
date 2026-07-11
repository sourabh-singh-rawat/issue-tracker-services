import { Field, InputType } from "type-graphql";

@InputType()
export class FindIssuesInput {
  @Field()
  parentIssueId!: string;
}
