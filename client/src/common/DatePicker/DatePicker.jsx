import { Fragment } from "react";
import en_IN from "date-fns/locale/en-IN";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import MuiSkeleton from "@mui/material/Skeleton";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import MuiFormHelperText from "@mui/material/FormHelperText";
import MuiCircularProgress from "@mui/material/CircularProgress";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePicker = ({
  loading,
  name,
  title,
  value,
  onChange,
  handleChange,
  helperText,
}) => {
  return (
    <Fragment>
      {title && loading ? (
        <MuiSkeleton width="20%" />
      ) : (
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
        {loading ? (
          <MuiCircularProgress />
        ) : (
          <MuiDatePicker
            onChange={onChange}
            value={value}
            renderInput={(params) => {
              return (
                <MuiTextField
                  size="small"
                  variant="outlined"
                  name={name}
                  onChange={handleChange}
                  sx={{
                    ".MuiInputBase-input": {
                      fontSize: "14px",
                    },
                  }}
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
