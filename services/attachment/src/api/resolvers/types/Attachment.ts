import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Attachment {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  bucket!: string;

  @Field(() => String)
  thumbnailLink!: string;
}
