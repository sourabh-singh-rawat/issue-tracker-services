import React from "react";
import Button from "../Button";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";

interface PrimaryButtonProps {
  label: string;
  type?: MuiButtonProps["type"];
  startIcon?: React.ReactNode;
  onClick?: (e: unknown) => void;
}

export default function PrimaryButton({
  label,
  type = "button",
  startIcon,
  onClick,
}: PrimaryButtonProps) {
  return (
    <Button label={label} onClick={onClick} type={type} startIcon={startIcon} />
  );
}
