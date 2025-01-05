import { Tab } from "@mui/material";
import React from "react";

interface CustomTabProps {
  index: number;
  label: string;
  onChange?: React.FormEventHandler<HTMLDivElement>;
}

export const CustomTab = ({ label, index, ...props }: CustomTabProps) => {
  return (
    <Tab
      value={index}
      label={label}
      sx={{ textTransform: "none" }}
      disableRipple
      {...props}
    />
  );
};
