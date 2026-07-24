import Value, { Assert, AssertError } from "typebox/value";
import { CloudEventValidationError } from "../../../errors";
import type { CloudEvent } from "../CloudEvent";
import { CloudEventSchema } from "../schemas";

export const isCloudEvent = (value: unknown): value is CloudEvent => {
  return Value.Check(CloudEventSchema, value);
};

export const validateCloudEvent = (value: unknown): CloudEvent => {
  try {
    Assert(CloudEventSchema, value);
    return value;
  } catch (error) {
    if (error instanceof AssertError) {
      throw new CloudEventValidationError(error.cause.errors);
    }
    throw error;
  }
};
