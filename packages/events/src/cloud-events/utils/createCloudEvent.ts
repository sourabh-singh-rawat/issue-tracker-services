import { uuidv7 } from "@pine/common";
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

export const createCloudEvent = <TData = unknown>(
  input: CreateCloudEventInput<TData>,
): CloudEvent<TData> => {
  const event: CloudEvent<TData> = {
    id: input.id ?? uuidv7(),
    source: input.source,
    specversion: "1.0",
    type: input.type,
    time: toIsoTime(input.time),
  };

  if (input.data !== undefined) {
    event.data = input.data;
    event.datacontenttype = input.datacontenttype ?? "application/json";
  } else if (input.datacontenttype !== undefined) {
    event.datacontenttype = input.datacontenttype;
  }

  if (input.subject !== undefined) {
    event.subject = input.subject;
  }

  if (input.dataschema !== undefined) {
    event.dataschema = input.dataschema;
  }

  return event;
};
