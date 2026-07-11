import { Field, InputType } from "type-graphql";

@InputType()
export class FindStatusesOptions {
  @Field()
  projectId!: string;
}
