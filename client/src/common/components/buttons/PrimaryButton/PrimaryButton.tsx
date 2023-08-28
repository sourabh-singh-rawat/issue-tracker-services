import React from "react";
import Button from "../Button";
import { useTheme } from "@mui/material";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";

interface PrimaryButtonProps {
  label: string;
  type: MuiButtonProps["type"];
  onClick?: (e: unknown) => void;
}

export default function PrimaryButton({
  label,
  type,
  onClick,
}: PrimaryButtonProps) {
  const theme = useTheme();

  return (
    <Button
      label={label}
      onClick={onClick}
      hoverBgColor={theme.palette.primary.dark}
      type={type}
    />
  );
}
