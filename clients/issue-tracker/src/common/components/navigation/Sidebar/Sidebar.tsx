import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useLargeScreen } from "../../../hooks/useLargeScreen";

import MuiDivider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import MuiToolbar from "@mui/material/Toolbar";

import { SpaceList } from "../../../../features/spaces";
import WorkspaceSwitcher from "../../../../features/workspace/components/WorkspaceSwitcher";
import { useAppSelector } from "../../../hooks";

const Drawer = styled(MuiDrawer)(({ open, theme }) => {
  const openDrawerWidth = theme.spacing(32);
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

export function Sidebar() {
  const isLargeScreen = useLargeScreen();
  const [open, setOpen] = useState(false);
  const currentWorkspace = useAppSelector((x) => x.workspace.current);

  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <Drawer open={open} variant="permanent">
      <MuiToolbar variant="dense" disableGutters />
      <List disablePadding>
        <WorkspaceSwitcher />
      </List>
      <MuiDivider />
      {currentWorkspace?.id && <SpaceList workspaceId={currentWorkspace.id} />}
      <MuiDivider />
    </Drawer>
  );
}
