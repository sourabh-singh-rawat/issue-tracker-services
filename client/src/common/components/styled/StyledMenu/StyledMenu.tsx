import { styled } from "@mui/material/styles";
import MuiMenu from "@mui/material/Menu";

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  ".MuiPaper-root": {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadiusLarge,
    backgroundColor: theme.palette.background.default,
  },
}));
export default StyledMenu;
