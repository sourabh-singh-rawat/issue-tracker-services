import type { AnyFormApi } from "@tanstack/react-form";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { FormProvider } from "../FormProvider";

export type FormProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> & {
  form: AnyFormApi;
  children?: ReactNode;
};

export const Form = ({ form, children, noValidate = true, ...formProps }: FormProps) => {
  return (
    <FormProvider form={form}>
      <form
        noValidate={noValidate}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        {...formProps}
      >
        {children}
      </form>
    </FormProvider>
  );
};
