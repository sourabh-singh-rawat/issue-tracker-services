import { Context, Namespace } from "@ory/keto-namespace-types";
import { product } from "./product";

export class brand implements Namespace {
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
      this.related.product.traverse((item) =>
        item.related.organization.traverse((organizationItem) =>
          organizationItem.permits.create_product(ctx),
        ),
      ),
  };
}
