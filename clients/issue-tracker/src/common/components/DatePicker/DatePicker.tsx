import "dayjs/locale/en-in";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Grid2 } from "@mui/material";
import MuiCircularProgress from "@mui/material/CircularProgress";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

import { SxProps, alpha, useTheme } from "@mui/material";
import dayjs from "dayjs";
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";
import { Label } from "../forms";

interface DatePickerProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  sx?: SxProps;
  title?: string;
  rules?: UseControllerProps<T>["rules"];
  helperText?: string;
  isLoading?: boolean;
}

function DatePicker<T extends FieldValues>({
  sx,
  name,
  title,
  form,
  rules,
  isLoading,
}: DatePickerProps<T>) {
  const theme = useTheme();

  return (
    <Grid2 container>
      {title && (
        <Grid2 size={12} paddingBottom={1}>
          <Label id={name} title={title} isLoading={isLoading} />
        </Grid2>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
        {isLoading ? (
          <MuiCircularProgress />
        ) : (
          <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field }) => {
              return (
                <MuiDatePicker
                  value={field.value ? dayjs(field.value) : null}
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
                          "&.Mui-focused": {
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
                        ...sx,
                      },
                    },
                  }}
                />
              );
            }}
          />
        )}
      </LocalizationProvider>
    </Grid2>
  );
}

export default DatePicker;
