import React from "react";
import { alpha, useTheme, styled, SxProps, Theme } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

const StyledButton = styled(MuiButton)(({ theme }) => {
  return {
    borderRadius: theme.shape.borderRadiusLarge,
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  };
});

interface ButtonProps {
  type?: MuiButtonProps["type"];
  sx?: SxProps<Theme> | undefined;
  color?: string;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

export default function Button({
  type = "button",
  sx,
  label,
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
      size="small"
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        textTransform: "none",
        borderRadius: theme.shape.borderRadiusMedium,
        boxShadow: "none",
        ...sx,
      }}
      disabled={isDisabled}
      disableRipple
    >
      {label}
    </StyledButton>
  );
}
