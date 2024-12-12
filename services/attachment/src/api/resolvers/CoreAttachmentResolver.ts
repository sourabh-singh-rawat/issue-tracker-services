import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { container } from "../..";
import { dataSource } from "../../config";
import { AttachmentResolver } from "./interfaces";
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
  @Query(() => PaginatedAttachment)
  async findAttachments(@Arg("itemId") itemId: string) {
    const service = container.get("attachmentService");

    return await service.findAttachments(itemId);
  }

  @Mutation(() => String)
  async deleteAttachment(@Arg("id") id: string) {
    const service = container.get("attachmentService");
    await dataSource.transaction(async (manager) => {
      await service.deleteAttachment({ id, manager });
    });

    return "Deleted successfully";
  }
}
