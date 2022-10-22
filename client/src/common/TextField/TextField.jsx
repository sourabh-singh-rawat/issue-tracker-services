import { Fragment } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";

const TextField = ({
  title,
  name,
  value,
  loading,
  multiline,
  rows,
  error,
  helperText,
  ...otherProps
}) => {
  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12}>
          {loading ? (
            <MuiSkeleton width="20%" />
          ) : (
            <MuiTypography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: error && "error.main",
                paddingBottom: 1,
              }}
            >
              {title}
            </MuiTypography>
          )}
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {loading ? (
          <Fragment>
            <MuiSkeleton />
            {multiline && <MuiSkeleton />}
            {multiline && <MuiSkeleton />}
            {multiline && <MuiSkeleton width="75%" />}
          </Fragment>
        ) : (
          <MuiTextField
            size="small"
            name={name && name.toLowerCase()}
            rows={rows}
            value={value}
            sx={{
              ".MuiInputBase-root": {
                fontSize: "14px",
                borderRadius: "6px",
              },
              ".MuiFormHelperText-contained": {
                fontSize: "13px",
                marginLeft: 0,
              },
            }}
            error={error}
            helperText={helperText}
            multiline
            fullWidth
            {...otherProps}
          />
        )}
      </MuiGrid>
    </MuiGrid>
  );
};

export default TextField;
