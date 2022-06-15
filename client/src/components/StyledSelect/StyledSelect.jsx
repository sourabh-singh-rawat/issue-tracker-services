import { FormControl, Select, MenuItem } from "@mui/material";

const StyledSelect = ({ defaultValue, items, ...otherProps }) => {
  return (
    <FormControl fullWidth>
      <Select {...otherProps} defaultValue={defaultValue} displayEmpty>
        {items.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StyledSelect;
