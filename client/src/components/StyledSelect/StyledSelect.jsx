import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
} from "@mui/material";

const StyledSelect = ({ title, items, helperText, ...otherProps }) => {
  return (
    <>
      <Typography variant="body1" fontWeight="bold" sx={{ paddingBottom: 1 }}>
        {title}
      </Typography>
      <FormControl fullWidth>
        <Select
          displayEmpty
          size="small"
          sx={{ color: "text.subtitle1", fontSize: "15px", fontWeight: "bold" }}
          {...otherProps}
        >
          {items.map(({ code, message }, index) => (
            <MenuItem
              key={code}
              value={code}
              sx={{
                color: "text.subtitle1",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              {message.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormHelperText>
        <Typography component="span" variant="body2">
          {helperText}
        </Typography>
      </FormHelperText>
    </>
  );
};

export default StyledSelect;
