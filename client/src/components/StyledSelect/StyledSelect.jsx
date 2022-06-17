import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
  Box,
} from "@mui/material";

const StyledSelect = ({
  title,
  defaultValue,
  items,
  helperText,
  ...otherProps
}) => {
  return (
    <Box>
      <Typography
        component="span"
        variant="body2"
        fontWeight="bold"
        sx={{ paddingBottom: 1 }}
      >
        {title}
      </Typography>
      <FormControl fullWidth>
        <Select
          size="small"
          defaultValue={defaultValue}
          displayEmpty
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
    </Box>
  );
};

export default StyledSelect;
