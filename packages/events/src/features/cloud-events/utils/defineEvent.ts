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

/** Literal event type string from an event definition. */
export type EventTypeOf<TDef extends EventDefinition> = TDef["type"];

/** Payload schema from an event definition. */
export type EventSchemaOf<TDef extends EventDefinition> = TDef["schema"];

/** Version number from an event definition. */
export type EventVersionOf<TDef extends EventDefinition> = TDef["version"];

/** Data payload type inferred from an event definition's schema. */
export type EventDataOf<TDef extends EventDefinition> = Type.Static<
  TDef["schema"]
>;

/**
 * Defines event metadata only: type, version, and payload schema.
 * Returns a frozen object so metadata cannot be mutated.
 * Behavior (create / validate / is) lives in standalone utilities.
 */
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
