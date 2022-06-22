import en_IN from "date-fns/locale/en-IN";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormHelperText, TextField, Typography } from "@mui/material";

const StyledDatePicker = ({
  name,
  title,
  minimized,
  handleChange,
  helperText,
  ...otherProps
}) => {
  return (
    <>
      {!minimized && (
        <Typography
          variant="body1"
          sx={{
            color: "primary.text",
            fontWeight: "bold",
            paddingBottom: 1,
          }}
        >
          {title}
        </Typography>
      )}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en_IN}>
        <DatePicker
          renderInput={(params) => (
            <TextField
              size="small"
              name={name}
              onChange={handleChange}
              variant={!minimized ? "outlined" : "standard"}
              fullWidth
              {...params}
            />
          )}
          {...otherProps}
        />
      </LocalizationProvider>
      <FormHelperText>
        <Typography variant="body2" component="span">
          {helperText}
        </Typography>
      </FormHelperText>
    </>
  );
};

export default StyledDatePicker;
