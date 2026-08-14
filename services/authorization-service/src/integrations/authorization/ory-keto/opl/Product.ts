import { Context, Namespace } from "@ory/keto-namespace-types";
import { organization } from "./organization";

export class product implements Namespace {
  related: {
    organization: organization[];
  };

  permits = {
    read: (ctx: Context): boolean =>
      this.related.organization.traverse(
        (item) =>
          item.related.member.includes(ctx.subject) ||
          item.related.admin.includes(ctx.subject) ||
          item.related.tenant.traverse(
            (tenantItem) =>
              tenantItem.related.admin.includes(ctx.subject) ||
              tenantItem.related.owner.includes(ctx.subject),
          ),
      ),
    update: (ctx: Context): boolean =>
      this.related.organization.traverse(
        (item) =>
          item.related.admin.includes(ctx.subject) ||
          item.related.tenant.traverse(
            (tenantItem) =>
              tenantItem.related.admin.includes(ctx.subject) ||
              tenantItem.related.owner.includes(ctx.subject),
          ),
      ),
    delete: (ctx: Context): boolean =>
      this.related.organization.traverse(
        (item) =>
          item.related.admin.includes(ctx.subject) ||
          item.related.tenant.traverse(
            (tenantItem) =>
              tenantItem.related.admin.includes(ctx.subject) ||
              tenantItem.related.owner.includes(ctx.subject),
          ),
      ),
  };
}
