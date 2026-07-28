import type Type from "typebox";
import type { CloudEventBase } from "./schemas";

export type CloudEvent<TData = unknown> = Omit<CloudEventBase, "data"> & {
  data?: TData;
};

export type CreateCloudEventInput<Schema extends Type.TSchema = Type.TSchema> = {
  type: string;
  source: string;
  schema: Schema;
  version?: number;
  data?: Type.Static<Schema>;
  id?: string;
  time?: string | Date;
  subject?: string;
  datacontenttype?: string;
  dataschema?: string;
};
