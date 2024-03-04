/* eslint-disable react/prop-types */
import React from "react";

import MuiCircularProgress from "@mui/material/CircularProgress";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

export default function UploadButton({ label, onClick, open }) {
  return (
    <PrimaryButton
      label={label}
      endIcon={
        open && <MuiCircularProgress size={20} sx={{ color: "common.white" }} />
      }
      onClick={onClick}
    />
  );
}
