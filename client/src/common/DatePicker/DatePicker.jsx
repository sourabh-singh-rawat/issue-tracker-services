import en_IN from "date-fns/locale/en-IN";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import MuiFormHelperText from "@mui/material/FormHelperText";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Fragment } from "react";

const DatePicker = ({
  name,
  title,
  minimized,
  handleChange,
  helperText,
  ...otherProps
}) => {
  return (
    <Fragment>
      {!minimized && (
        <MuiTypography
          variant="body2"
          sx={{
            color: "primary.text",
            fontWeight: 600,
            paddingBottom: 1,
          }}
        >
          {title}
        </MuiTypography>
      )}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en_IN}>
        <MuiDatePicker
          renderInput={(params) => (
            <MuiTextField
              size="small"
              name={name}
              onChange={handleChange}
              variant={!minimized ? "outlined" : "standard"}
              fullWidth
              sx={{ ".MuiInputBase-input": { fontSize: "14px" } }}
              {...params}
            />
          )}
          {...otherProps}
        />
      </LocalizationProvider>
      <MuiFormHelperText>
        <MuiTypography variant="body2" component="span" fontWeight={500}>
          {helperText}
        </MuiTypography>
      </MuiFormHelperText>
    </Fragment>
  );
};

export default DatePicker;
