/* eslint-disable react/prop-types */
import React from "react";
import MuiTypography from "@mui/material/Typography";
import MuiFormLabel from "@mui/material/FormLabel";
import MuiSkeleton from "@mui/material/Skeleton";

interface LabelInputs {
  id: string;
  title: string;
  isLoading?: boolean;
}

function Label({ id, title, isLoading }: LabelInputs) {
  return (
    <MuiFormLabel htmlFor={id}>
      {isLoading ? (
        <MuiSkeleton width="20%" />
      ) : (
        <MuiTypography variant="body2" fontWeight="500">
          {title}
        </MuiTypography>
      )}
    </MuiFormLabel>
  );
}

export default Label;
