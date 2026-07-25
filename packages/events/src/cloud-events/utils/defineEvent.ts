import Type from "typebox";

export type EventDefinition<
  TType extends string = string,
  TVersion extends number = number,
  Schema extends Type.TSchema = Type.TSchema,
> = {
  readonly type: TType;
  readonly version: TVersion;
  readonly schema: Schema;
};

export type EventTypeOf<TDef extends EventDefinition> = TDef["type"];

export type EventSchemaOf<TDef extends EventDefinition> = TDef["schema"];

export type EventVersionOf<TDef extends EventDefinition> = TDef["version"];

export type EventDataOf<TDef extends EventDefinition> = Type.Static<
  TDef["schema"]
>;

export const defineEvent = <
  const TType extends string,
  const TVersion extends number,
  const Schema extends Type.TSchema,
>(
  definition: EventDefinition<TType, TVersion, Schema>,
): EventDefinition<TType, TVersion, Schema> => {
  return Object.freeze({
    type: definition.type,
    version: definition.version,
    schema: definition.schema,
  });
};
