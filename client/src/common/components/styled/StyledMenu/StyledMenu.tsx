import { styled } from "@mui/material/styles";
import MuiMenu from "@mui/material/Menu";

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  ".MuiPaper-root": {
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[6],
    borderRadius: theme.shape.borderRadiusMedium,
  },
  ".MuiMenu-list": { padding: 0 },
}));

export default StyledMenu;
