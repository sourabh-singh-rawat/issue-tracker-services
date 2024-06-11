import React from "react";
import MuiTab from "@mui/material/Tab";
import MuiSkeleton from "@mui/material/Skeleton";

interface TabProps {
  label: string;
  value: number;
  isLoading: boolean;
  onChange?: React.FormEventHandler<HTMLDivElement>;
}

export default function Tab({ label, value, isLoading, onChange }: TabProps) {
  return isLoading ? (
    <MuiSkeleton sx={{ marginRight: 2 }} width="100px" />
  ) : (
    <MuiTab
      value={value}
      label={label}
      onChange={onChange}
      sx={{ textTransform: "none" }}
      disableRipple
    />
  );
}
