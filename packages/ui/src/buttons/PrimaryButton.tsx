import CircularProgress from "@mui/material/CircularProgress";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import type { ReactElement, ReactNode } from "react";
import Button from "./Button";

export interface PrimaryButtonProps {
  label: string | ReactElement;
  size?: "small" | "medium" | "large";
  type?: MuiButtonProps["type"];
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: (e: unknown) => void;
  isDisabled?: boolean;
  loading?: boolean;
}

export function PrimaryButton({
  label,
  size,
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
      size={size}
      startIcon={loading ? <CircularProgress size={12} /> : startIcon}
      endIcon={endIcon}
      isDisabled={isDisabled || loading}
    />
  );
}

export default PrimaryButton;
