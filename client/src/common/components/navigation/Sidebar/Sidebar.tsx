import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useLargeScreen } from "../../../hooks/useLargeScreen";

import MuiDrawer from "@mui/material/Drawer";
import MuiToolbar from "@mui/material/Toolbar";
import MuiDivider from "@mui/material/Divider";

import MuiGridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import MuiPestControlTwoToneIcon from "@mui/icons-material/PestControlTwoTone";
import MuiArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import MuiAssignmentTurnedInTwoToneIcon from "@mui/icons-material/AssignmentTurnedInTwoTone";
import MuiStarTwoToneIcon from "@mui/icons-material/StarTwoTone";

import SidebarGroup from "../SidebarGroup";
import SidebarGroupItem from "../SidebarGroupItem";
import WorkspaceSwitcher from "../../../../features/workspace/components/WorkspaceSwitcher";
import StyledList from "../../styled/StyledList";

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
        <SidebarGroupItem
          avatarIcon={<MuiGridViewTwoToneIcon />}
          to="/"
          label="Dashboard"
          isVisible={open}
        />
        <SidebarGroupItem
          avatarIcon={<MuiArticleTwoToneIcon />}
          to="/projects"
          label="Projects"
          isVisible={open}
        />
        <SidebarGroupItem
          avatarIcon={<MuiPestControlTwoToneIcon />}
          to="/issues"
          label="Issues"
          isVisible={open}
        />
        <SidebarGroupItem
          avatarIcon={<MuiAssignmentTurnedInTwoToneIcon />}
          to="/tasks"
          label="Tasks"
          isVisible={open}
        />
      </StyledList>
      <MuiDivider />
      <SidebarGroup
        label="Favourites"
        isVisible={open}
        avatarIcon={<MuiStarTwoToneIcon />}
      />
    </Drawer>
  );
}
