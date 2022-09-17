import { Fragment } from "react";
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
          color: "text.subtitle1",
          padding: 0,
          fontWeight: "bold",
          textTransform: "none",
          width: "25px",
        }}
      >
        <MuiArrowBackIcon />
      </MuiIconButton>
      <MuiIconButton
        sx={{
          color: "text.subtitle1",
          padding: 0,
          fontWeight: "bold",
          textTransform: "none",
          width: "25px",
        }}
      >
        <MuiArrowRightIcon />
      </MuiIconButton>
    </MuiGrid>
  );
};

export default BackButton;
