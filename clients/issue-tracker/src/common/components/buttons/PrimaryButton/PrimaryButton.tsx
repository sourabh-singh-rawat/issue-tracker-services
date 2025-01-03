import { CircularProgress } from "@mui/material";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import React from "react";
import Button from "../Button";

interface PrimaryButtonProps {
  label: string | React.ReactElement;
  type?: MuiButtonProps["type"];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e: unknown) => void;
  isDisabled?: boolean;
  loading?: boolean;
}

export default function PrimaryButton({
  label,
  type = "button",
  startIcon,
  endIcon,
  onClick,
  isDisabled,
  loading,
}: PrimaryButtonProps) {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      startIcon={loading ? <CircularProgress size={12} /> : startIcon}
      endIcon={endIcon}
      isDisabled={isDisabled}
    />
  );
}
