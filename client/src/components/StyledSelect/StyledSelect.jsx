import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
} from "@mui/material";

const StyledSelect = ({
  title,
  defaultValue,
  items,
  helperText,
  ...otherProps
}) => {
  return (
    <>
      <Typography variant="body2" fontWeight="bold" sx={{ paddingBottom: 1 }}>
        {title}
      </Typography>
      <FormControl fullWidth>
        <Select
          size="small"
          defaultValue={defaultValue}
          displayEmpty
          sx={{ fontSize: "14px" }}
          {...otherProps}
        >
          {items.map((item) => (
            <MenuItem value={item} key={item} sx={{ fontSize: "14px" }}>
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
