import MuiCircularProgress from "@mui/material/CircularProgress";
import MuiButton from "@mui/material/Button";

const UploadButton = ({ label, onClick, open }) => {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      sx={{
        fontWeight: 600,
        borderRadius: "8px",
        textTransform: "none",
      }}
      endIcon={
        open && <MuiCircularProgress size={20} sx={{ color: "white" }} />
      }
      disableRipple
    >
      {label}
    </MuiButton>
  );
};

export default UploadButton;
