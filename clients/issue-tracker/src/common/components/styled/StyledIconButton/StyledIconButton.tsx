import { styled } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";

const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default StyledIconButton;
