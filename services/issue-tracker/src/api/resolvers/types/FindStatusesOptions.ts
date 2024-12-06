import { Field, InputType } from "type-graphql";

@InputType()
export class FindStatusesOptions {
  @Field()
  spaceId!: string;
}
