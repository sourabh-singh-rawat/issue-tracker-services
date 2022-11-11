import { Fragment } from "react";

import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTextField from "@mui/material/TextField";

import Label from "../Label";

const StyledTextField = styled(MuiTextField)(({ theme, error }) => {
  return {
    "& .MuiOutlinedInput-root ": {
      fontSize: "14px",
      borderRadius: "4px",
      backgroundColor: theme.palette.grey[200],
      "& fieldset": {
        borderRadius: "4px",
        border: `2px solid ${theme.palette.grey[200]}`,
      },
      "&:hover fieldset": {
        border: `2px solid ${theme.palette.grey[400]}`,
        transitionDuration: "250ms",
      },
      "&.Mui-focused": {
        backgroundColor: theme.palette.background.default,
        transitionDuration: "250ms",
        "& fieldset": {
          border: error
            ? `2px solid ${theme.palette.error.main}`
            : `2px solid ${theme.palette.primary.main}`,
          transitionDuration: "250ms",
        },
      },
      "&.Mui-disabled": {
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        "& fieldset": {
          border: `2px solid ${theme.palette.grey[300]}`,
        },
      },
    },
    "& .MuiFormHelperText-contained": {
      fontSize: "13px",
      marginLeft: 0,
    },
  };
});

const TextField = ({
  title,
  name,
  value,
  multiline,
  rows,
  error,
  helperText,
  isLoading,
  ...otherProps
}) => {
  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12}>
          {isLoading ? (
            <MuiSkeleton width="20%" />
          ) : (
            <Label title={title} error={error} />
          )}
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {isLoading ? (
          <Fragment>
            <MuiSkeleton />
            {multiline && <MuiSkeleton />}
            {multiline && <MuiSkeleton />}
            {multiline && <MuiSkeleton width="75%" />}
          </Fragment>
        ) : (
          <StyledTextField
            size="small"
            name={name && name.toLowerCase()}
            rows={rows}
            value={value}
            error={error}
            helperText={helperText}
            multiline={multiline}
            fullWidth
            {...otherProps}
          />
        )}
      </MuiGrid>
    </MuiGrid>
  );
};

export default TextField;
