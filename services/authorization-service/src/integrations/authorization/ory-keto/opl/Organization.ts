import { Context, Namespace } from "@ory/keto-namespace-types";
import { tenant } from "./tenant";
import { identity } from "./identity";

export class organization implements Namespace {
  related: {
    member: identity[];
    admin: identity[];
    tenant: tenant[];
  };

  permits = {
    read: (ctx: Context): boolean =>
      this.related.member.includes(ctx.subject) ||
      this.related.admin.includes(ctx.subject) ||
      this.related.tenant.traverse(
        (item) =>
          item.related.admin.includes(ctx.subject) || item.related.owner.includes(ctx.subject),
      ),
    update: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) ||
      this.related.tenant.traverse(
        (item) =>
          item.related.admin.includes(ctx.subject) || item.related.owner.includes(ctx.subject),
      ),
    manage_members: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) ||
      this.related.tenant.traverse(
        (item) =>
          item.related.admin.includes(ctx.subject) || item.related.owner.includes(ctx.subject),
      ),
    create_product: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) ||
      this.related.tenant.traverse(
        (item) =>
          item.related.admin.includes(ctx.subject) || item.related.owner.includes(ctx.subject),
      ),
    delete: (ctx: Context): boolean =>
      this.related.tenant.traverse((item) => item.related.owner.includes(ctx.subject)),
  };
}
