import Type from "typebox";
import Value, { Assert, AssertError } from "typebox/value";
import {
  EventValidationError,
  type SchemaValidationErrors,
} from "../../errors";
import type { CloudEvent } from "../CloudEvent";
import type { EventDefinition } from "./defineEvent";
import { isCloudEvent, validateCloudEvent } from "./validateCloudEvent";

export type TypedCloudEvent<TDef extends EventDefinition> = CloudEvent<
  Type.Static<TDef["schema"]>
> & {
  type: TDef["type"];
};

const formatSchemaErrors = (errors: SchemaValidationErrors): string => {
  return errors
    .map((error) => `${error.instancePath || "/"}: ${error.message}`)
    .join("; ");
};

const assertEventData = <Schema extends Type.TSchema>(
  eventType: string,
  schema: Schema,
  data: unknown,
): Type.Static<Schema> => {
  try {
    Assert(schema, data);
    return data as Type.Static<Schema>;
  } catch (error) {
    if (error instanceof AssertError) {
      const summary = formatSchemaErrors(error.cause.errors);
      throw new EventValidationError(
        `Invalid ${eventType} data: ${summary || "schema validation failed"}`,
        error.cause.errors,
      );
    }
    throw error;
  }
};

export const isEvent = <const TDef extends EventDefinition>(
  definition: TDef,
  value: unknown,
): value is TypedCloudEvent<TDef> => {
  return (
    isCloudEvent(value) &&
    value.type === definition.type &&
    Value.Check(definition.schema, value.data)
  );
};

export const validateEvent = <const TDef extends EventDefinition>(
  definition: TDef,
  value: unknown,
): TypedCloudEvent<TDef> => {
  const event = validateCloudEvent(value);

  if (event.type !== definition.type) {
    throw new EventValidationError(
      `Expected event type "${definition.type}", got "${String(event.type)}"`,
    );
  }

  assertEventData(definition.type, definition.schema, event.data);

  return event as TypedCloudEvent<TDef>;
};
