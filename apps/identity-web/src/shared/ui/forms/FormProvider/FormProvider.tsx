import type { AnyFormApi } from "@tanstack/react-form";
import type { PropsWithChildren } from "react";
import { formContext } from "../FormContext";

export type FormProviderProps = PropsWithChildren<{
  form: AnyFormApi;
}>;

export const FormProvider = ({ form, children }: FormProviderProps) => (
  <formContext.Provider value={form}>{children}</formContext.Provider>
);
