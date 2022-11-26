import MuiButton from "@mui/material/Button";
import { theme } from "../../app/mui.config";

const DeleteButton = ({ onClick }) => {
  return (
    <MuiButton
      onClick={onClick}
      sx={{
        textTransform: "none",
        backgroundColor: theme.palette.warning.main,
        color: "white",
        ":hover": { backgroundColor: theme.palette.warning.dark },
      }}
    >
      Delete
    </MuiButton>
  );
};

export default DeleteButton;
