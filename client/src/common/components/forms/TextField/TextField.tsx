/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";

import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import Label from "../Label";
import Field from "../Field";
import {
  Control,
  Controller,
  FieldValues,
  FormState,
  Path,
  UseControllerProps,
} from "react-hook-form";

interface TextFieldProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  title: string;
  control: Control<DefaultValues>;
  formState: FormState<DefaultValues>;
  type?: React.HTMLInputTypeAttribute;
  rules?: UseControllerProps<DefaultValues>["rules"];
  helperText?: string;
  rows?: number;
  isLoading?: boolean;
  isDisabled?: boolean;
  isMultiline?: boolean;
  endAdornment?: React.JSX.Element;
}

export default function TextField<DefaultValues extends FieldValues>({
  control,
  name,
  title,
  formState,
  rules,
  type = "text",
  helperText,
  rows = 3,
  isLoading,
  isDisabled,
  isMultiline,
  endAdornment,
}: TextFieldProps<DefaultValues>) {

  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12} paddingBottom={1}>
          <Label id={name} title={title} isLoading={isLoading} />
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {isLoading ? (
          <>
            <MuiSkeleton />
            {isMultiline && <MuiSkeleton />}
            {isMultiline && <MuiSkeleton />}
            {isMultiline && <MuiSkeleton width="75%" />}
          </>
        ) : (
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
              <Field
                type={type}
                id={field.name}
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                helperText={
                  (formState.errors[name]?.message as string) || helperText
                }
                rows={rows}
                isInvalid={Boolean(formState.errors[name])}
                isDisabled={isDisabled}
                isMultiline={isMultiline}
                endAdornment={endAdornment}
              />
            )}
          />
        )}
      </MuiGrid>
    </MuiGrid>
  );
}
