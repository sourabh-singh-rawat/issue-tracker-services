import Type from "typebox";

export const GraphNamespaceSchema = Type.Union([
  Type.Literal("identity"),
  Type.Literal("platform"),
  Type.Literal("tenant"),
  Type.Literal("organization"),
  Type.Literal("product"),
  Type.Literal("brand"),
  Type.Literal("role"),
  Type.Literal("permission"),
]);
