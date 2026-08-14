import { Context, Namespace } from "@ory/keto-namespace-types";
import { platform } from "./platform";
import { identity } from "./identity";

export class tenant implements Namespace {
  related: {
    owner: identity[];
    admin: identity[];
    member: identity[];
    platform: platform[];
  };

  permits = {
    read: (ctx: Context): boolean =>
      this.related.member.includes(ctx.subject) ||
      this.related.admin.includes(ctx.subject) ||
      this.related.owner.includes(ctx.subject) ||
      this.related.platform.traverse((item) => item.related.admin.includes(ctx.subject)),
    configure: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) ||
      this.related.owner.includes(ctx.subject) ||
      this.related.platform.traverse((item) => item.related.admin.includes(ctx.subject)),
    manage_members: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) ||
      this.related.owner.includes(ctx.subject) ||
      this.related.platform.traverse((item) => item.related.admin.includes(ctx.subject)),
    create_organization: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) || this.related.owner.includes(ctx.subject),
    assign_admin: (ctx: Context): boolean =>
      this.related.owner.includes(ctx.subject) ||
      this.related.platform.traverse((item) => item.related.admin.includes(ctx.subject)),
    assign_owner: (ctx: Context): boolean =>
      this.related.owner.includes(ctx.subject) ||
      this.related.platform.traverse((item) => item.related.admin.includes(ctx.subject)),
    suspend: (ctx: Context): boolean =>
      this.related.owner.includes(ctx.subject) ||
      this.related.platform.traverse((item) => item.related.admin.includes(ctx.subject)),
    delete: (ctx: Context): boolean =>
      this.related.owner.includes(ctx.subject) ||
      this.related.platform.traverse((item) => item.related.admin.includes(ctx.subject)),
  };
}
