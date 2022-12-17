import MuiButton from "@mui/material/Button";
import { theme } from "../../../config/mui.config";

const SecondaryButton = ({ label, onClick }) => {
  return (
    <MuiButton
      onClick={onClick}
      sx={{
        textTransform: "none",
        backgroundColor: theme.palette.warning.main,
        borderRadius: "6px",
        color: "white",
        ":hover": {
          backgroundColor: theme.palette.warning.dark,
          boxShadow: 4,
        },
      }}
      disableRipple
    >
      {label}
    </MuiButton>
  );
};

export default SecondaryButton;
