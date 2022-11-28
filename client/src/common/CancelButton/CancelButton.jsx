import MuiButton from "@mui/material/Button";

const CancelButton = ({ label, onClick }) => {
  return (
    <MuiButton
      onClick={onClick}
      sx={{
        textTransform: "none",
        color: "text.primary",
        ":hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      {label}
    </MuiButton>
  );
};

export default CancelButton;
