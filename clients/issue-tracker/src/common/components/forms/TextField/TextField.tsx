import React from "react";

import { Grid2, SxProps, useTheme } from "@mui/material";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";
import StyledTextField from "../../styled/StyledTextField";
import { Label } from "../Label";

interface TextFieldProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  defaultSchemas?: any;
  title?: string;
  type?: React.HTMLInputTypeAttribute;
  rules?: UseControllerProps<T>["rules"];
  placeholder?: string;
  helperText?: string;
  rows?: number;
  isLoading?: boolean;
  isDisabled?: boolean;
  startAdornment?: React.JSX.Element;
  endAdornment?: React.JSX.Element;
  onClick?: () => void;
  sx?: SxProps;
  autoFocus?: boolean;
}

export const TextField = <T extends FieldValues>({
  name,
  title,
  placeholder,
  rules,
  form,
  type = "text",
  rows = 0,
  isLoading,
  isDisabled,
  startAdornment,
  endAdornment,
  onClick,
  sx,
  defaultSchemas,
  autoFocus = false,
}: TextFieldProps<T>) => {
  const isMultiline = rows > 0;
  const theme = useTheme();
  const isError = Boolean(form.formState.errors[name]);

  return (
    <Grid2 container>
      {title && (
        <Grid2 size={12} paddingBottom={1}>
          <Label
            id={name}
            title={title}
            isLoading={isLoading}
            color={isError ? theme.palette.error.main : ""}
          />
        </Grid2>
      )}
      <Grid2 size={12}>
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
            control={form.control}
            rules={rules}
            render={({ field }) => (
              <Grid2 container rowSpacing={1}>
                <Grid2 size={12}>
                  <StyledTextField
                    type={type}
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder={placeholder}
                    helperText={form.formState.errors[name]?.message as string}
                    sx={sx}
                    size="small"
                    rows={rows}
                    error={isError}
                    onClick={onClick}
                    disabled={isDisabled}
                    multiline={isMultiline}
                    InputProps={{ startAdornment, endAdornment }}
                    fullWidth
                    autoFocus={autoFocus}
                  />
                </Grid2>
                <Grid2 size={12} color={theme.palette.text.secondary}>
                  <MuiTypography variant="body1">
                    {defaultSchemas?.properties[name].description}
                  </MuiTypography>
                </Grid2>
              </Grid2>
            )}
          />
        )}
      </Grid2>
    </Grid2>
  );
};
