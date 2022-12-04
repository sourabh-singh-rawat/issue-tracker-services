import { theme } from "../../../../../app/mui.config";
import MuiIconButton from "@mui/material/IconButton";
import MuiEditIcon from "@mui/icons-material/Edit";

const EditTaskButton = ({ onClick }) => {
  return (
    <MuiIconButton
      sx={{
        color: theme.palette.grey[400],
        border: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
        ":hover": {
          color: theme.palette.grey[600],
          boxShadow: "none",
          backgroundColor: "transparent",
        },
      }}
      onClick={onClick}
      disableRipple
    >
      <MuiEditIcon />
    </MuiIconButton>
  );
};

export default EditTaskButton;
