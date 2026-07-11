import { Field, InputType } from "type-graphql";

@InputType()
export class FindStatusesOptions {
  @Field(() => String)
  projectId!: string;
}
