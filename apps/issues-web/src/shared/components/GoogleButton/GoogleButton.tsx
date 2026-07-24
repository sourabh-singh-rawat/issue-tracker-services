/* eslint-disable react/prop-types */
import React from "react";

import MuiButton from "@mui/material/Button";
import MuiGoogleIcon from "@mui/icons-material/Google";
import { styled } from "@mui/material/styles";

const StyledButton = styled(MuiButton)(({ theme }) => ({
  fontWeight: 600,
  transition: "all 0.2s ease-in-out",
  color: theme.palette.grey[500],
  border: `2px solid ${theme.palette.grey[500]}`,
  boxShadow: theme.shadows[1],
  textTransform: "none",
}));

interface GoogleButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  message: string;
}

export default function GoogleButton({ onClick, message }: GoogleButtonProps) {
  return (
    <StyledButton startIcon={<MuiGoogleIcon />} variant="outlined" fullWidth onClick={onClick}>
      {message}
    </StyledButton>
  );
}
