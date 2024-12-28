import MuiTab from "@mui/material/Tab";
import React from "react";

interface CustomTabProps {
  index: number;
  label: string;
  onChange?: React.FormEventHandler<HTMLDivElement>;
  onClick?: React.FormEventHandler<HTMLDivElement>;
}

export const CustomTab = ({
  label,
  index,
  onChange,
  onClick,
}: CustomTabProps) => {
  return (
    <MuiTab
      value={index}
      label={label}
      onChange={onChange}
      onClick={onClick}
      sx={{ textTransform: "none" }}
      disableRipple
    />
  );
};
