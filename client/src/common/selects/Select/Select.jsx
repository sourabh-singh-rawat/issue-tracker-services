import { Fragment } from "react";

import { styled } from "@mui/material/styles";
import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";

const StyledSelect = styled(MuiSelect)(({ theme }) => {
  return {
    "&.MuiOutlinedInput-root": {
      color: theme.palette.text.primary,
      fontSize: "14px",
      fontWeight: 500,
      textTransform: "capitalize",
      borderRadius: "4px",
      backgroundColor: theme.palette.grey[200],
      "& fieldset": {
        border: `1px solid ${theme.palette.grey[200]}`,
      },
      "&:hover fieldset": {
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.grey[400]}`,
        transitionDuration: "250ms",
      },
    },
  };
});

const Select = ({ title, items, helperText, ...otherProps }) => {
  return (
    <Fragment>
      {title && (
        <MuiTypography
          variant="body2"
          fontWeight={600}
          sx={{ paddingBottom: 1 }}
        >
          {title}
        </MuiTypography>
      )}
      <MuiFormControl fullWidth>
        <StyledSelect
          displayEmpty
          size="small"
          sx={{ color: "text.primary", fontSize: "14px", fontWeight: 600 }}
          {...otherProps}
        >
          {items.map(({ id, name }, index) => (
            <MuiMenuItem
              key={id}
              value={id}
              sx={{
                color: "text.primary",
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {name}
            </MuiMenuItem>
          ))}
        </StyledSelect>
      </MuiFormControl>
      <MuiFormHelperText>
        <MuiTypography component="span" variant="body2">
          {helperText}
        </MuiTypography>
      </MuiFormHelperText>
    </Fragment>
  );
};

export default Select;
