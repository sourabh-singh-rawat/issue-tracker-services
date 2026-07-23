import { createFormHookContexts } from "@tanstack/react-form";
import { createContext } from "react";

export const { formContext, useFormContext } = createFormHookContexts();

export type FormFieldControl<TValue = unknown> = {
  name: string;
  id: string;
  value: TValue;
  onChange: (value: TValue) => void;
  onBlur: () => void;
  error?: string;
  errors: unknown[];
  isTouched: boolean;
  isDirty: boolean;
  isValidating: boolean;
  disabled: boolean;
};

export const FormFieldContext = createContext<FormFieldControl | null>(null);

export function formatFieldError(errors: unknown[]): string | undefined {
  if (errors.length === 0) {
    return undefined;
  }

  const first = errors[0];

  if (typeof first === "string") {
    return first;
  }

  if (
    first !== null &&
    typeof first === "object" &&
    "message" in first &&
    (first as { message: unknown }).message != null
  ) {
    return String((first as { message: unknown }).message);
  }

  return String(first);
}
