import type { CloudEventBase } from "./schemas";

export type CloudEvent<TData = unknown> = Omit<CloudEventBase, "data"> & {
  data?: TData;
};

export type CreateCloudEventInput<TData = unknown> = {
  type: string;
  source: string;
  data?: TData;
  id?: string;
  time?: string | Date;
  subject?: string;
  datacontenttype?: string;
  dataschema?: string;
};
