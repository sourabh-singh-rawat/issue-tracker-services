import { alpha, styled, useTheme } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import React from "react";

const StyledButton = styled(MuiButton)(({ theme }) => {
  return {
    textTransform: "none",
    borderRadius: theme.shape.borderRadiusMedium,
    "&:hover": {
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  };
});

interface ButtonProps {
  size?: "small" | "medium" | "large";
  type?: MuiButtonProps["type"];
  color?: string;
  label?: string | React.ReactElement;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

export default function Button({
  type = "button",
  label,
  size = "medium",
  startIcon,
  endIcon,
  variant = "contained",
  onClick,
  isDisabled,
}: ButtonProps) {
  const theme = useTheme();

  return (
    <StyledButton
      type={type}
      size={size}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={isDisabled}
      disableRipple
    >
      {label}
    </StyledButton>
  );
}
