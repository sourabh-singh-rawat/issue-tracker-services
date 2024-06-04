import { styled } from "@mui/material/styles";
import MuiListItemButton from "@mui/material/ListItemButton";

const StyledListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadiusMedium,
    height: theme.spacing(4),
  },
  "&.MuiListItemButton-root:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default StyledListItemButton;
