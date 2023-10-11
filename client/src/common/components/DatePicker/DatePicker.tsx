import React from "react";
import enIn from "date-fns/locale/en-IN";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import MuiGrid from "@mui/material/Grid";
import MuiCircularProgress from "@mui/material/CircularProgress";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
                <MuiDatePicker
                  value={field.value}
                  onChange={(e) => field.onChange(String(e))}
                  renderInput={(params) => {
                    console.log(params);
                    return (
                      <StyledTextField
                        size="small"
                        type="date"
                        error={Boolean(formState.errors[name])}
                        helperText={formState.errors[name]?.message as string}
                        inputRef={params.inputRef}
                        InputProps={params.InputProps}
                        inputProps={params.inputProps}
                        fullWidth
                      />
                    );
                  }}
                />
              );
            }}
          />
        )}
      </LocalizationProvider>
    </MuiGrid>
  );
}

export default DatePicker;
