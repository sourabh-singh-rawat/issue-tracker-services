import { Query, Resolver } from "type-graphql";
import { AttachmentResolver } from "./interfaces";

@Resolver()
export class CoreAttachmentResolver implements AttachmentResolver {
  @Query(() => String)
  hello() {
    return "Hello world!";
  }
}
