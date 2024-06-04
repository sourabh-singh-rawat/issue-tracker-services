import React from "react";
import Button from "../Button";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { useTheme } from "@mui/material";

interface TextButtonProps {
  type?: MuiButtonProps["type"];
  label?: string;
  startIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TextButton({
  type = "button",
  label,
  startIcon,
  onClick,
}: TextButtonProps) {
  const theme = useTheme();
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      startIcon={startIcon}
      variant="text"
      sx={{
        ".MuiButton-startIcon": { margin: 0 },
        color: theme.palette.text.secondary,
      }}
    />
  );
}
