import { EmailAddressResolver } from "graphql-scalars";
import { builder } from "../builder";

builder.addScalarType("EmailAddress", EmailAddressResolver, {});
