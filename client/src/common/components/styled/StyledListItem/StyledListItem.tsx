import { styled } from "@mui/material/styles";
import MuiListItem from "@mui/material/ListItem";

const StyledListItem = styled(MuiListItem)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  "&.MuiListItem-root": {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  "&.MuiListItem-root:hover": {
    cursor: "pointer",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
    transition: theme.transitions.create(["backgroundColor"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default StyledListItem;
