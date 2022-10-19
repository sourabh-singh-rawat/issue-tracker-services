import MuiIconButton from "@mui/material/IconButton";
import MuiGrid from "@mui/material/Grid";
import MuiArrowBackIcon from "@mui/icons-material/ArrowBack";
import MuiArrowRightIcon from "@mui/icons-material/ArrowForward";

const BackButton = ({ message, onClick }) => {
  return (
    <MuiGrid container paddingLeft="18px" paddingRight="10px">
      <MuiIconButton
        variant="text"
        onClick={onClick}
        sx={{
          width: "25px",
          padding: 0,
          color: "text.primary",
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        <MuiArrowBackIcon />
      </MuiIconButton>
      <MuiIconButton
        sx={{
          width: "25px",
          padding: 0,
          color: "text.primary",
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        <MuiArrowRightIcon />
      </MuiIconButton>
    </MuiGrid>
  );
};

export default BackButton;
