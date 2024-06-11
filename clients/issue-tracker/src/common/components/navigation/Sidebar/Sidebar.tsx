import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useLargeScreen } from "../../../hooks/useLargeScreen";

import MuiDrawer from "@mui/material/Drawer";
import MuiToolbar from "@mui/material/Toolbar";
import MuiDivider from "@mui/material/Divider";

import MuiGridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MuiPestControlOutlinedIcon from "@mui/icons-material/PestControlOutlined";
import MuiArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MuiAssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import MuiStarOutlinedIcon from "@mui/icons-material/StarOutlined";

import SidebarGroup from "../SidebarGroup";
import SidebarGroupItem from "../SidebarGroupItem";
import WorkspaceSwitcher from "../../../../features/workspace/components/WorkspaceSwitcher";
import StyledList from "../../styled/StyledList";
import SidebarGroupLabel from "../SidebarGroupLabel";

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
  const isLargeScreen = useLargeScreen();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <Drawer
      open={open}
      variant="permanent"
      onMouseEnter={() => {
        if (!isLargeScreen) setOpen(true);
      }}
      onMouseLeave={() => {
        if (!isLargeScreen) setOpen(false);
      }}
    >
      <MuiToolbar variant="dense" disableGutters />
      <StyledList disablePadding>
        <WorkspaceSwitcher isLargeScreen={isLargeScreen} />
      </StyledList>
      <MuiDivider />
      <StyledList disablePadding>
        <SidebarGroupLabel title="Manage" />
        {[
          {
            icon: <MuiGridViewOutlinedIcon />,
            to: "/",
            title: "Dashboard",
            isVisible: open,
          },
          {
            icon: <MuiArticleOutlinedIcon />,
            to: "/projects",
            title: "Projects",
            isVisible: open,
          },
          {
            icon: <MuiPestControlOutlinedIcon />,
            to: "/issues",
            title: "Issues",
            isVisible: open,
          },
          {
            icon: <MuiAssignmentTurnedInOutlinedIcon />,
            to: "/tasks",
            title: "Tasks",
            isVisible: open,
          },
        ].map(({ icon, to, title, isVisible }) => (
          <SidebarGroupItem
            icon={icon}
            to={to}
            title={title}
            isVisible={open}
          />
        ))}
      </StyledList>
      <MuiDivider />
      <StyledList disablePadding>
        <SidebarGroup
          title="Favourites"
          isVisible={open}
          icon={<MuiStarOutlinedIcon />}
        />
      </StyledList>
    </Drawer>
  );
}
