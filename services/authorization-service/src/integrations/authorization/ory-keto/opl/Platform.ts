import { Context, Namespace } from "@ory/keto-namespace-types";
import { identity } from "./identity";
import { tenant } from "./tenant";

export class platform implements Namespace {
  related: {
    admin: identity[];
    tenant: tenant[];
  };

  permits = {
    read: (ctx: Context): boolean => this.related.admin.includes(ctx.subject),
    create_tenant: (ctx: Context): boolean => this.related.admin.includes(ctx.subject),
    manage_admins: (ctx: Context): boolean => this.related.admin.includes(ctx.subject),
  };
}
