import { GraphQLObjectType } from "graphql";
import GraphQLJSON from "graphql-type-json";
import { Field, ID, InputType } from "type-graphql";

const JSON = new GraphQLObjectType({
  name: "GraphQLJSON",
  fields: {
    myValue: { type: GraphQLJSON },
  },
});

@InputType()
export class CreateItemInput {
  @Field()
  name!: string;

  @Field()
  type!: string;

  @Field()
  listId!: string;

  @Field({ nullable: true })
  parentItemId?: string;

  @Field(() => ID)
  statusId!: string;

  @Field()
  priority!: string;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  assigneeIds!: string[];

  @Field(() => GraphQLJSON, { nullable: true })
  fields!: Record<string, string | null | string[]>;
}
