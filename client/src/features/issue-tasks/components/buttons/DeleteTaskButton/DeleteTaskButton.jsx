import { theme } from "../../../../../config/mui.config";
import MuiIconButton from "@mui/material/IconButton";
import MuiDeleteIcon from "@mui/icons-material/Delete";

const DeleteTaskButton = ({ onClick }) => {
  return (
    <MuiIconButton
      variant="text"
      size="small"
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
    >
      <MuiDeleteIcon />
    </MuiIconButton>
  );
};

export default DeleteTaskButton;
