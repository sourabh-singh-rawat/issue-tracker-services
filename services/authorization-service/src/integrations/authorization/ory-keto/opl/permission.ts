import { Namespace } from "@ory/keto-namespace-types";
import { role } from "./role";

export class permission implements Namespace {
  related: {
    has: role[];
  };
}
