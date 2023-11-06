import React from "react";

import MuiGrid from "@mui/material/Grid";
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
import { SxProps } from "@mui/material";

interface TextFieldProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  control: Control<DefaultValues>;
  formState: FormState<DefaultValues>;
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
}

export default function TextField<DefaultValues extends FieldValues>({
  control,
  name,
  title,
  formState,
  placeholder,
  rules,
  type = "text",
  helperText,
  rows = 0,
  isLoading,
  isDisabled,
  startAdornment,
  endAdornment,
  onClick,
  sx,
}: TextFieldProps<DefaultValues>) {
  const isMultiline = rows > 0;

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
              <StyledTextField
                type={type}
                id={field.name}
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                placeholder={placeholder}
                helperText={
                  (formState.errors[name]?.message as string) || helperText
                }
                sx={sx}
                size="small"
                rows={rows}
                error={Boolean(formState.errors[name])}
                onClick={onClick}
                disabled={isDisabled}
                multiline={isMultiline}
                InputProps={{ startAdornment, endAdornment }}
                fullWidth
              />
            )}
          />
        )}
      </MuiGrid>
    </MuiGrid>
  );
}
