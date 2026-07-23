import type { AnyFieldApi } from "@tanstack/react-form";
import type { ReactNode } from "react";
import {
  FormFieldContext,
  formatFieldError,
  useFormContext,
  type FormFieldControl,
} from "../FormContext";

export type FormItemProps = {
  name: string;
  children?: ReactNode;
  mode?: "value" | "array";
  disabled?: boolean;
};

export const FormItem = ({ name, children, mode, disabled = false }: FormItemProps) => {
  const form = useFormContext();

  const Field = form.Field as (props: {
    name: string;
    mode?: "value" | "array";
    children: (field: AnyFieldApi) => ReactNode;
  }) => ReactNode;

  return (
    <Field name={name} mode={mode}>
      {(fieldApi) => {
        const errors = fieldApi.state.meta.errors;
        const showError = fieldApi.state.meta.isTouched || fieldApi.state.meta.isBlurred;

        const control: FormFieldControl = {
          name: fieldApi.name,
          id: `form-field-${String(fieldApi.name).replace(/\./g, "-")}`,
          value: fieldApi.state.value,
          onChange: (value) => {
            fieldApi.handleChange(value);
          },
          onBlur: () => {
            fieldApi.handleBlur();
          },
          error: showError ? formatFieldError(errors) : undefined,
          errors,
          isTouched: fieldApi.state.meta.isTouched,
          isDirty: fieldApi.state.meta.isDirty,
          isValidating: fieldApi.state.meta.isValidating,
          disabled,
        };

        return <FormFieldContext.Provider value={control}>{children}</FormFieldContext.Provider>;
      }}
    </Field>
  );
};
