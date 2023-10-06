import React from "react";
import enIn from "date-fns/locale/en-IN";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import MuiCircularProgress from "@mui/material/CircularProgress";
import { DesktopDatePicker as MuiDesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import MuiFormHelperText from "@mui/material/FormHelperText";
import MuiTypography from "@mui/material/Typography";
import MuiGrid from "@mui/material/Grid";

import {
  Control,
  Controller,
  FieldValues,
  FormState,
  Path,
  UseControllerProps,
} from "react-hook-form";
import Label from "../forms/Label";
import StyledTextField from "../styled/StyledTextField";

interface DatePickerProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  title: string;
  control: Control<DefaultValues>;
  formState: FormState<DefaultValues>;
  rules?: UseControllerProps<DefaultValues>["rules"];
  helperText?: string;
  isLoading?: boolean;
}

function DatePicker<DefaultValues extends FieldValues>({
  name,
  title,
  control,
  formState,
  rules,
  isLoading,
  helperText,
}: DatePickerProps<DefaultValues>) {
  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12} paddingBottom={1}>
          <Label id={name} title={title} isLoading={isLoading} />
        </MuiGrid>
      )}
      <LocalizationProvider adapterLocale={enIn} dateAdapter={AdapterDateFns}>
        {isLoading ? (
          <MuiCircularProgress />
        ) : (
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
              return (
                <MuiDesktopDatePicker
                  value={field.value}
                  onChange={field.onChange}
                  renderInput={(params) => (
                    <StyledTextField
                      size="small"
                      type="date"
                      fullWidth
                      {...params}
                    />
                  )}
                />
              );
            }}
          />
        )}
      </LocalizationProvider>
      {helperText && (
        <MuiFormHelperText>
          <MuiTypography component="span" sx={{ fontSize: "13px" }}>
            {(formState.errors[name]?.message as string) || helperText}
          </MuiTypography>
        </MuiFormHelperText>
      )}
    </MuiGrid>
  );
}

export default DatePicker;
