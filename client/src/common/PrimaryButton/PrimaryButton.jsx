import MuiButton from "@mui/material/Button";
import MuiAddIcon from "@mui/icons-material/Add";

const PrimaryButton = ({ label, onClick }) => {
  return (
    <MuiButton
      variant="contained"
      startIcon={<MuiAddIcon />}
      onClick={onClick}
      sx={{ textTransform: "none", fontWeight: 600, borderRadius: "8px" }}
    >
      {label}
    </MuiButton>
  );
};

export default PrimaryButton;
