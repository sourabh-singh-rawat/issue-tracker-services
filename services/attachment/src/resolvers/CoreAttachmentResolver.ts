import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";
import { AttachmentResolver } from "./interfaces";
import { container } from "..";
import { Attachment } from "./types";

@ObjectType()
export class PaginatedAttachment {
  @Field(() => [Attachment])
  rows!: Attachment[];

  @Field()
  rowCount!: number;
}

@Resolver()
export class CoreAttachmentResolver implements AttachmentResolver {
  @Query(() => String)
  hello() {
    return "Hello world!";
  }

  @Query(() => PaginatedAttachment)
  async findAttachments(@Arg("itemId") itemId: string) {
    const service = container.get("attachmentService");

    return await service.findAttachments(itemId);
  }
}
