import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useLargeScreen } from "../../../hooks/useLargeScreen";

import MuiDrawer from "@mui/material/Drawer";
import MuiToolbar from "@mui/material/Toolbar";
import MuiDivider from "@mui/material/Divider";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemButton from "@mui/material/ListItemButton";

import MuiPestControlOutlinedIcon from "@mui/icons-material/PestControlOutlined";
import MuiArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MuiAssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import MuiKeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import WorkspaceSwitcher from "../../../../features/workspace/components/WorkspaceSwitcher";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "../../../enums/menu-item";

const Drawer = styled(MuiDrawer)(({ open, theme }) => {
  const openDrawerWidth = theme.spacing(28);
  const closedDrawerWidth = theme.spacing(8);

  return {
    width: open ? openDrawerWidth : closedDrawerWidth,
    [theme.breakpoints.down("sm")]: {
      width: closedDrawerWidth,
    },
    "& .MuiPaper-root": {
      border: "none",
      backgroundColor: theme.palette.background.paper,
    },
    "& .MuiDrawer-paper": {
      borderRight: `1px solid ${theme.palette.divider}`,
      transition: theme.transitions.create(["width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      ...(open && {
        width: openDrawerWidth,
        [theme.breakpoints.down("sm")]: {
          boxShadow: theme.shadows[5],
        },
      }),
      ...(!open && {
        width: closedDrawerWidth,
      }),
      overflowX: "hidden",
    },
  };
});

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLargeScreen = useLargeScreen();
  const [open, setOpen] = useState(false);
  const sx = {
    ":hover": {
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
    },
  };
  const list: MenuItem[] = [
    {
      icon: <MuiArticleOutlinedIcon />,
      to: "/lists",
      text: "Lists",
      isVisible: open,
    },
    {
      icon: <MuiAssignmentTurnedInOutlinedIcon />,
      to: "/tasks",
      text: "Tasks",
      isVisible: open,
    },
  ];

  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <Drawer open={open} variant="permanent">
      <MuiToolbar variant="dense" disableGutters />
      <MuiList disablePadding>
        <WorkspaceSwitcher />
      </MuiList>
      <MuiDivider />
      <MuiList disablePadding>
        {list.map(({ icon, text, to }) => {
          return (
            <MuiListItem
              onClick={() => {
                if (to) navigate(to);
              }}
            >
              <MuiListItemButton sx={sx}>
                <MuiListItemIcon>{icon}</MuiListItemIcon>
                <MuiListItemText primary={text} />
              </MuiListItemButton>
            </MuiListItem>
          );
        })}
      </MuiList>
      <MuiDivider />
      <MuiList>
        <MuiListItem>
          <MuiListItemButton>
            <MuiListItemIcon>
              <MuiKeyboardDoubleArrowRightIcon />
            </MuiListItemIcon>
            <MuiListItemText primary="Close" />
          </MuiListItemButton>
        </MuiListItem>
      </MuiList>
    </Drawer>
  );
}
