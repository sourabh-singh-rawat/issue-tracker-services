import { Fragment } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

const TextField = ({
  title,
  name,
  loading,
  multiline,
  rows,
  ...otherProps
}) => {
  const theme = useTheme();
  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        {title && loading ? (
          <MuiSkeleton width="20%" />
        ) : (
          <MuiTypography variant="body2" fontWeight={600} paddingBottom={1}>
            {title}
          </MuiTypography>
        )}
      </MuiGrid>
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
            sx={{
              ".MuiInputBase-root": {
                fontSize: "14px",
                borderRadius: "4px",
              },
              ".MuiFormHelperText-contained": {
                fontSize: "13px",
                marginLeft: 0,
              },
            }}
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
