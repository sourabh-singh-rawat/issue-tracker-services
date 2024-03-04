import React from "react";
import { useTheme } from "@mui/material";
import MuiDeleteIcon from "@mui/icons-material/Delete";
import StyledIconButton from "../../../../common/components/styled/StyledIconButton";

interface DeleteButtonProps {
  onClick: () => void;
}

export default function DeleteTaskButton({ onClick }: DeleteButtonProps) {
  const theme = useTheme();

  return (
    <StyledIconButton
      onClick={onClick}
      sx={{
        color: theme.palette.text.secondary,
        width: theme.spacing(4),
        height: theme.spacing(4),
      }}
      disableRipple
    >
      <MuiDeleteIcon />
    </StyledIconButton>
  );
}
