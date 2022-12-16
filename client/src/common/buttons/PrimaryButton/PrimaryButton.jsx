import MuiButton from "@mui/material/Button";
import MuiAddIcon from "@mui/icons-material/Add";

const PrimaryButton = ({ type, label, onClick }) => {
  return (
    <MuiButton
      type={type}
      variant="contained"
      startIcon={type === "submit" ? null : <MuiAddIcon />}
      onClick={onClick}
      sx={{
        fontWeight: 600,
        borderRadius: "8px",
        textTransform: "none",
      }}
      disableRipple
    >
      {label}
    </MuiButton>
  );
};

export default PrimaryButton;
