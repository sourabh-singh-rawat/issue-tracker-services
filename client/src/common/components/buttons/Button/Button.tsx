import React from "react";
import { alpha, useTheme, styled, SxProps, Theme } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

const StyledButton = styled(MuiButton)(({ theme }) => {
  return {
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
  variant?: "text" | "outlined" | "contained";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  type = "button",
  sx,
  label,
  startIcon,
  variant = "contained",
  onClick,
}: ButtonProps) {
  const theme = useTheme();

  return (
    <StyledButton
      type={type}
      size="small"
      variant={variant}
      startIcon={startIcon}
      onClick={onClick}
      sx={{
        textTransform: "none",
        borderRadius: theme.shape.borderRadiusMedium,
        boxShadow: "none",
        ...sx,
      }}
      disableRipple
    >
      {label}
    </StyledButton>
  );
}
