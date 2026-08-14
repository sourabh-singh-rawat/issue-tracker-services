import { Namespace } from "@ory/keto-namespace-types";
import { identity } from "./identity";

export class role implements Namespace {
  related: {
    member: identity[];
  };
}
