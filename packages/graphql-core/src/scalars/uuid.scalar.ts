import { UUIDResolver } from "graphql-scalars";
import { builder } from "../builder";

builder.addScalarType("UUID", UUIDResolver, {});
