import { styled } from "@mui/material/styles";
import MuiMenu from "@mui/material/Menu";

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  ".MuiPaper-root": {
    boxShadow: theme.shadows[20],
    borderRadius: theme.shape.borderRadiusLarge,
    border: `2px solid ${theme.palette.divider}`,
  },
  ".MuiMenu-list": { padding: 0 },
}));
export default StyledMenu;
