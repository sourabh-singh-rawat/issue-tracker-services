import en_IN from "date-fns/locale/en-IN";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField, Typography } from "@mui/material";

const StyledDatePicker = ({ name, handleChange, ...otherProps }) => {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          color: "primary.text",
          fontWeight: "bold",
          paddingBottom: 1,
        }}
      >
        End Date
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en_IN}>
        <DatePicker
          {...otherProps}
          renderInput={(params) => (
            <TextField
              name={name}
              onChange={handleChange}
              {...params}
              fullWidth
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export default StyledDatePicker;
