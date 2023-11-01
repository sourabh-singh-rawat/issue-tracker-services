import { styled } from "@mui/material/styles";
import MuiListItemButton from "@mui/material/ListItemButton";

const StyledListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    height: theme.spacing(5),
  },
  "&.MuiListItemButton-root:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default StyledListItemButton;
