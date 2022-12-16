import { theme } from "../../../config/mui.config";
import MuiButton from "@mui/material/Button";

const CancelButton = ({ label, onClick }) => {
  return (
    <MuiButton
      onClick={onClick}
      sx={{
        color: theme.palette.grey[900],
        height: "100%",
        borderRadius: "8px",
        textTransform: "none",
        "&:hover": {
          boxShadow: 4,
          backgroundColor: theme.palette.grey[300],
        },
      }}
      disableRipple
    >
      {label}
    </MuiButton>
  );
};

export default CancelButton;
