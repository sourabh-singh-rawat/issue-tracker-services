import { styled } from "@mui/material/styles";
import MuiMenu from "@mui/material/Menu";

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  ".MuiMenu-list": {
    padding: 0,
  },
  ".MuiPaper-root": {
    borderRadius: theme.shape.borderRadiusMedium,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
  },
}));

export default StyledMenu;
