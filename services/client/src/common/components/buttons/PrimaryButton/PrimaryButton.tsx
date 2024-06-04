import React from "react";
import Button from "../Button";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";

interface PrimaryButtonProps {
  label: string;
  type?: MuiButtonProps["type"];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e: unknown) => void;
  isDisabled?: boolean;
}

export default function PrimaryButton({
  label,
  type = "button",
  startIcon,
  endIcon,
  onClick,
  isDisabled,
}: PrimaryButtonProps) {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      startIcon={startIcon}
      endIcon={endIcon}
      isDisabled={isDisabled}
    />
  );
}
