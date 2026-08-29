/* oxlint-disable max-lines */
import { Context, Namespace } from "@ory/keto-namespace-types";

export class identity implements Namespace {} // NOSONAR typescript:S101

export class profile implements Namespace { // NOSONAR typescript:S101
  related: {
    identity: identity[];
  };

  permits = {
    read: (ctx: Context): boolean => this.related.identity.includes(ctx.subject),
    update: (ctx: Context): boolean => this.related.identity.includes(ctx.subject),
  };
}

export class platform implements Namespace { // NOSONAR typescript:S101
  related: {
    admin: identity[];
    member: identity[];
    tenant: tenant[];
  };

  permits = {
    read: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) || this.related.member.includes(ctx.subject),
    create_tenant: (ctx: Context): boolean => this.related.admin.includes(ctx.subject),
    manage_admins: (ctx: Context): boolean => this.related.admin.includes(ctx.subject),
  };
}

export class tenant implements Namespace { // NOSONAR typescript:S101
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
      this.related.platform.traverse((item) => item.permits.read(ctx)),
    read_list: (ctx: Context): boolean =>
      this.related.member.includes(ctx.subject) ||
      this.related.admin.includes(ctx.subject) ||
      this.related.owner.includes(ctx.subject) ||
      this.related.platform.traverse((item) => item.permits.read(ctx)),
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
    administer: (ctx: Context): boolean =>
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

export class organization implements Namespace { // NOSONAR typescript:S101
  related: {
    owner: identity[];
    admin: identity[];
    member: identity[];
    tenant: tenant[];
  };

  permits = {
    read: (ctx: Context): boolean =>
      this.related.member.includes(ctx.subject) ||
      this.related.admin.includes(ctx.subject) ||
      this.related.owner.includes(ctx.subject) ||
      this.related.tenant.traverse((item) => item.permits.administer(ctx)),
    update: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) ||
      this.related.owner.includes(ctx.subject) ||
      this.related.tenant.traverse((item) => item.permits.administer(ctx)),
    manage_members: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) ||
      this.related.owner.includes(ctx.subject) ||
      this.related.tenant.traverse((item) => item.permits.administer(ctx)),
    create_product: (ctx: Context): boolean =>
      this.related.admin.includes(ctx.subject) ||
      this.related.owner.includes(ctx.subject) ||
      this.related.tenant.traverse((item) => item.permits.administer(ctx)),
    delete: (ctx: Context): boolean =>
      this.related.owner.includes(ctx.subject) ||
      this.related.tenant.traverse((item) => item.related.owner.includes(ctx.subject)),
  };
}

export class product implements Namespace { // NOSONAR typescript:S101
  related: {
    organization: organization[];
  };

  permits = {
    read: (ctx: Context): boolean =>
      this.related.organization.traverse((item) => item.permits.read(ctx)),
    update: (ctx: Context): boolean =>
      this.related.organization.traverse((item) => item.permits.update(ctx)),
    delete: (ctx: Context): boolean =>
      this.related.organization.traverse((item) => item.permits.update(ctx)),
    create_brand: (ctx: Context): boolean =>
      this.related.organization.traverse((item) => item.permits.create_product(ctx)),
  };
}

export class brand implements Namespace { // NOSONAR typescript:S101
  related: {
    product: product[];
  };

  permits = {
    read: (ctx: Context): boolean =>
      this.related.product.traverse((item) => item.permits.read(ctx)),
    create: (ctx: Context): boolean =>
      this.related.product.traverse((item) => item.permits.update(ctx)),
    update: (ctx: Context): boolean =>
      this.related.product.traverse((item) => item.permits.update(ctx)),
    delete: (ctx: Context): boolean =>
      this.related.product.traverse((item) => item.permits.create_brand(ctx)),
  };
}

export class role implements Namespace { // NOSONAR typescript:S101
  related: {
    member: identity[];
  };
}

export class permission implements Namespace { // NOSONAR typescript:S101
  related: {
    has: role[];
  };
}
