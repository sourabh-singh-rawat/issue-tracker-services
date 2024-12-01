import { Field, InputType } from "type-graphql";

@InputType()
export class FindSpacesOptions {
  @Field()
  workspaceId!: string;
}
