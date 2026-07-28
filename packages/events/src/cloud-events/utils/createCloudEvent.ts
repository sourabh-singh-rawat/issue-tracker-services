import { uuidv7 } from "@pine/common";
import type Type from "typebox";
import { Assert, AssertError } from "typebox/value";
import { EventValidationError, type SchemaValidationErrors } from "../../errors";
import type { CloudEvent, CreateCloudEventInput } from "../CloudEvent";

const toIsoTime = (time?: string | Date): string => {
  if (time === undefined) {
    return new Date().toISOString();
  }
  if (time instanceof Date) {
    return time.toISOString();
  }
  return time;
};

const defaultDataSchema = (type: string, version?: number): string =>
  version === undefined ? `urn:pine:events:${type}` : `urn:pine:events:${type}:v${version}`;

const formatSchemaErrors = (errors: SchemaValidationErrors): string => {
  return errors.map((error) => `${error.instancePath || "/"}: ${error.message}`).join("; ");
};

export const createCloudEvent = <Schema extends Type.TSchema>(
  input: CreateCloudEventInput<Schema>,
): CloudEvent<Type.Static<Schema>> => {
  const event: CloudEvent<Type.Static<Schema>> = {
    id: input.id ?? uuidv7(),
    source: input.source,
    specversion: "1.0",
    type: input.type,
    time: toIsoTime(input.time),
    dataschema: input.dataschema ?? defaultDataSchema(input.type, input.version),
  };

  if (input.data !== undefined) {
    try {
      Assert(input.schema, input.data);
    } catch (error) {
      if (error instanceof AssertError) {
        const summary = formatSchemaErrors(error.cause.errors);
        throw new EventValidationError(
          `Invalid ${input.type} data: ${summary || "schema validation failed"}`,
          error.cause.errors,
        );
      }
      throw error;
    }

    event.data = input.data;
    event.datacontenttype = input.datacontenttype ?? "application/json";
  } else if (input.datacontenttype !== undefined) {
    event.datacontenttype = input.datacontenttype;
  }

  if (input.subject !== undefined) {
    event.subject = input.subject;
  }

  return event;
};
