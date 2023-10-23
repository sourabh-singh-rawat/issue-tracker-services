import React from "react";
import "dayjs/locale/en-in";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import MuiGrid from "@mui/material/Grid";
import MuiCircularProgress from "@mui/material/CircularProgress";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Control,
  Controller,
  FieldValues,
  FormState,
  Path,
  UseControllerProps,
} from "react-hook-form";
import Label from "../forms/Label";
import { alpha, useTheme } from "@mui/material";
import dayjs from "dayjs";

interface DatePickerProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  title: string;
  control: Control<DefaultValues>;
  rules?: UseControllerProps<DefaultValues>["rules"];
  formState: FormState<DefaultValues>;
  helperText?: string;
  isLoading?: boolean;
}

function DatePicker<DefaultValues extends FieldValues>({
  name,
  title,
  control,
  rules,
  isLoading,
  formState,
}: DatePickerProps<DefaultValues>) {
  const theme = useTheme();

  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12} paddingBottom={1}>
          <Label id={name} title={title} isLoading={isLoading} />
        </MuiGrid>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
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
                  value={field.value ? field.value : null}
                  onChange={(newValue) =>
                    field.onChange(dayjs(newValue).format("YYYY-MM-DD"))
                  }
                  slotProps={{
                    openPickerButton: { disableRipple: true },
                    textField: {
                      size: "small",
                      sx: {
                        width: "100%",
                        "& .MuiInputBase-root": {
                          borderRadius: theme.shape.borderRadiusMedium,
                          backgroundColor: theme.palette.background.default,
                          borderColor: theme.palette.divider,
                          transition: theme.transitions.create([
                            "border-color",
                            "background-color",
                            "box-shadow",
                          ]),
                          "& input": {
                            fontSize: theme.typography.body2,
                          },
                          "& .Mui-focused": {
                            boxShadow: `${alpha(
                              theme.palette.primary.main,
                              0.25,
                            )} 0 0 0 0.2rem`,
                            borderColor: theme.palette.primary.main,
                          },
                          "& .Mui-error": {
                            boxShadow: `${alpha(
                              theme.palette.error.main,
                              0.25,
                            )} 0 0 0 0.2rem`,
                          },
                        },
                        ".MuiFormHelperText-root": {
                          fontSize: theme.typography.body1,
                          marginLeft: 0,
                        },
                      },
                    },
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
