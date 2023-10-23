import React from "react";

import MuiCheckbox from "@mui/material/Checkbox";

export default function Checkbox({ checked, handleCheckBoxClick }) {
  return (
    <MuiCheckbox
      checked={checked}
      disableRipple
      onClick={handleCheckBoxClick}
    />
  );
}
