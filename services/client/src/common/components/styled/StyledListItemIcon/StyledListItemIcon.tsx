import { styled } from "@mui/material/styles";
import MuiListItemIcon from "@mui/material/ListItemIcon";

const StyledListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(0),
  color: "inherit",
  width: theme.spacing(2.5),
}));

export default StyledListItemIcon;
