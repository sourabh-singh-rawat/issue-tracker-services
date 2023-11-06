import React from "react";

import MuiCheckbox from "@mui/material/Checkbox";

interface CheckboxProps {
  checked: boolean;
  handleCheckBoxClick: () => void;
}

export default function Checkbox({
  checked,
  handleCheckBoxClick,
}: CheckboxProps) {
  return (
    <MuiCheckbox
      checked={checked}
      onClick={handleCheckBoxClick}
      sx={{ padding: 0 }}
      disableRipple
    />
  );
}
