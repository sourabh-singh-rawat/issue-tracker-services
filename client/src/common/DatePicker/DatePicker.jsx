import { Fragment } from "react";
import en_IN from "date-fns/locale/en-IN";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { styled } from "@mui/material";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiFormHelperText from "@mui/material/FormHelperText";
import MuiCircularProgress from "@mui/material/CircularProgress";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

import Label from "../Label";
import TextField from "../TextField/TextField";

const StyledDatePicker = styled(MuiDatePicker)(({ theme }) => {
  return {
    "& fieldset": {
      color: theme.palette.text.primary,
      fontSize: "14px",
      fontWeight: 500,
      textTransform: "capitalize",
      borderRadius: "6px",
      backgroundColor: theme.palette.grey[200],
    },
  };
});

const DatePicker = ({
  name,
  title,
  value,
  onChange,
  isLoading,
  handleChange,
  helperText,
}) => {
  return (
    <Fragment>
      {title && isLoading ? (
        <MuiSkeleton width="20%" />
      ) : (
        <Label title={title} />
      )}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en_IN}>
        {isLoading ? (
          <MuiCircularProgress />
        ) : (
          <StyledDatePicker
            onChange={onChange}
            value={value}
            renderInput={(params) => {
              return (
                <TextField
                  size="small"
                  variant="outlined"
                  name={name}
                  onChange={handleChange}
                  fullWidth
                  {...params}
                />
              );
            }}
          />
        )}
      </LocalizationProvider>
      {helperText && (
        <MuiFormHelperText>
          <MuiTypography component="span" sx={{ fontSize: "13px" }}>
            {helperText}
          </MuiTypography>
        </MuiFormHelperText>
      )}
    </Fragment>
  );
};

export default DatePicker;
