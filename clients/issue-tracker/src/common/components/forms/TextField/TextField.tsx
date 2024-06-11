import React from "react";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import MuiSkeleton from "@mui/material/Skeleton";
import Label from "../Label";
import {
  Control,
  Controller,
  FieldValues,
  FormState,
  Path,
  UseControllerProps,
} from "react-hook-form";
import StyledTextField from "../../styled/StyledTextField";
import { SxProps, useTheme } from "@mui/material";

interface TextFieldProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  control: Control<DefaultValues>;
  formState: FormState<DefaultValues>;
  defaultSchemas?: any;
  title?: string;
  type?: React.HTMLInputTypeAttribute;
  rules?: UseControllerProps<DefaultValues>["rules"];
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

export default function TextField<DefaultValues extends FieldValues>({
  control,
  name,
  title,
  formState,
  placeholder,
  rules,
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
}: TextFieldProps<DefaultValues>) {
  const isMultiline = rows > 0;
  const theme = useTheme();
  const isError = Boolean(formState.errors[name]);

  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12} paddingBottom={1}>
          <Label
            id={name}
            title={title}
            isLoading={isLoading}
            color={isError ? theme.palette.error.main : ""}
          />
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
              <MuiGrid container rowSpacing={1}>
                <MuiGrid item xs={12}>
                  <StyledTextField
                    type={type}
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder={placeholder}
                    helperText={formState.errors[name]?.message as string}
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
                </MuiGrid>
                <MuiGrid item xs={12} color={theme.palette.text.secondary}>
                  <MuiTypography variant="body1">
                    {defaultSchemas?.properties[name].description}
                  </MuiTypography>
                </MuiGrid>
              </MuiGrid>
            )}
          />
        )}
      </MuiGrid>
    </MuiGrid>
  );
}
