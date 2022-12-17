import MuiButton from "@mui/material/Button";

const SaveButton = ({ label, onClick }) => {
  return (
    <MuiButton
      onClick={onClick}
      variant="contained"
      sx={{
        height: "100%",
        textTransform: "none",
        borderRadius: "6px",
      }}
      disableRipple
    >
      {label}
    </MuiButton>
  );
};

export default SaveButton;
