import React, { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

import MuiList from "@mui/material/List";
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

const Drawer = styled(MuiDrawer)(({ open, theme }) => {
  const opendrawerWidth = theme.spacing(28);
  const closedDrawerWidth = theme.spacing(9);

  return {
    width: open ? opendrawerWidth : closedDrawerWidth,
    [theme.breakpoints.down("sm")]: {
      width: closedDrawerWidth,
    },
    "& .MuiPaper-root": {
      border: "none",
      backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.grey[400]}`,
    },
    "& .MuiDrawer-paper": {
      padding: theme.spacing(2),
      transition: theme.transitions.create(["width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      ...(open && {
        width: opendrawerWidth,
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
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
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
      <MuiList disablePadding>
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
      </MuiList>
      <MuiDivider />
      <SidebarGroup
        label="Favourites"
        isVisible={open}
        avatarIcon={<MuiStarTwoToneIcon />}
      />
    </Drawer>
  );
}
