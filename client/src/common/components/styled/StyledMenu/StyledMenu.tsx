import { styled } from "@mui/material/styles";
import MuiMenu from "@mui/material/Menu";

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  ".MuiPaper-root": {
    borderRadius: theme.shape.borderRadiusMedium,
    backgroundColor: theme.palette.background.default,
  },
}));
export default StyledMenu;
