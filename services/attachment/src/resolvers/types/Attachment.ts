import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Attachment {
  @Field()
  id!: string;

  @Field()
  bucket!: string;

  @Field()
  thumbnailLink!: string;
}
