import { Fragment } from "react";

import en_IN from "date-fns/locale/en-IN";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import MuiFormHelperText from "@mui/material/FormHelperText";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePicker = ({
  name,
  title,
  value,
  onChange,
  handleChange,
  helperText,
}) => {
  return (
    <Fragment>
      <MuiTypography
        variant="body2"
        sx={{
          color: "primary.text",
          fontWeight: 600,
          // paddingBottom: 1,
        }}
      >
        {title}
      </MuiTypography>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en_IN}>
        <MuiDatePicker
          onChange={onChange}
          value={value}
          renderInput={(params) => {
            return (
              <MuiTextField
                fullWidth
                size="small"
                variant="outlined"
                name={name}
                onChange={handleChange}
                sx={{
                  ".MuiInputBase-input": { fontSize: "14px" },
                }}
                {...params}
              />
            );
          }}
        />
      </LocalizationProvider>
      {helperText && (
        <MuiFormHelperText>
          <MuiTypography variant="body2" component="span" fontWeight={600}>
            {helperText}
          </MuiTypography>
        </MuiFormHelperText>
      )}
    </Fragment>
  );
};

export default DatePicker;
