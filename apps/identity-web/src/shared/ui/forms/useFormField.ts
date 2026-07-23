import { useContext } from "react";
import { FormFieldContext, type FormFieldControl } from "./FormContext";

export function useFormField<TValue = unknown>(): FormFieldControl<TValue> {
  const field = useContext(FormFieldContext);

  if (!field) {
    throw new Error(
      '`useFormField` must be used within a `FormItem`. Wrap the control with `<FormItem name="...">`.',
    );
  }

  return field as FormFieldControl<TValue>;
}

export function useFormFieldOptional<TValue = unknown>(): FormFieldControl<TValue> | null {
  return useContext(FormFieldContext) as FormFieldControl<TValue> | null;
}
