import { DateTimeISOResolver } from "graphql-scalars";
import { builder } from "../builder";

builder.addScalarType("DateTimeISO", DateTimeISOResolver, {});
