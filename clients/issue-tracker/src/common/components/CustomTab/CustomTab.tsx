import MuiTab from "@mui/material/Tab";
import React from "react";

interface CustomTabProps {
  index: number;
  label: string;
  onChange?: React.FormEventHandler<HTMLDivElement>;
}

export const CustomTab = ({ label, index, onChange }: CustomTabProps) => {
  return (
    <MuiTab
      value={index}
      label={label}
      onChange={onChange}
      sx={{ textTransform: "none" }}
      disableRipple
    />
  );
};
