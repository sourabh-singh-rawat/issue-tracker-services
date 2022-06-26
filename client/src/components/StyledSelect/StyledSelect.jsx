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
        <Select size="small" displayEmpty {...otherProps} defaultValue={0}>
          {items.map((item, index) => (
            <MenuItem value={index} key={item}>
              {item}
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
