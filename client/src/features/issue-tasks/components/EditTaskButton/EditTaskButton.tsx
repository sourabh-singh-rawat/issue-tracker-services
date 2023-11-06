import React from "react";

import { useTheme } from "@mui/material";
import MuiEditIcon from "@mui/icons-material/Edit";
import StyledIconButton from "../../../../common/components/styled/StyledIconButton";

interface EditTaskButtonProps {
  onClick: () => void;
}

function EditTaskButton({ onClick }: EditTaskButtonProps) {
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
      <MuiEditIcon />
    </StyledIconButton>
  );
}

export default EditTaskButton;
