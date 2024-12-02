import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiToolbar from "@mui/material/Toolbar";
import MuiContainer from "@mui/material/Container";

import Navbar from "../navigation/Navbar";
import MenuSidebar from "../navigation/Sidebar";
import { useLargeScreen } from "../../hooks/useLargeScreen";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setDefaultWorkspace,
  setWorkspaces,
} from "../../../features/workspace/workspace.slice";
import { useFindWorkspacesQuery } from "../../../api/codegen/gql/graphql";

export default function AppMain() {
  const theme = useTheme();
  const isLargeScreen = useLargeScreen();
  const dispatch = useAppDispatch();
  const { data: workspaces } = useFindWorkspacesQuery();
  const { id } = useAppSelector(
    ({ workspace }) => workspace?.defaultWorkspace || { id: "", name: "" },
  );

  useEffect(() => {
    if (workspaces) {
      const defaultWorkspace = workspaces.findWorkspaces?.find(
        ({ status }) => status === "Default",
      );
      dispatch(setDefaultWorkspace(defaultWorkspace));
      dispatch(setWorkspaces(workspaces));
    }
  }, [workspaces]);

  return (
    <MuiBox display="flex" height="100vh">
      <Navbar />
      <MenuSidebar />
      <MuiContainer
        sx={{
          width: `calc(100% - ${
            isLargeScreen ? theme.spacing(32) : theme.spacing(9)
          })`,
          overflowX: "auto",
        }}
        disableGutters
      >
        <MuiToolbar variant="dense" disableGutters />
        <MuiGrid container>{id && <Outlet />}</MuiGrid>
      </MuiContainer>
    </MuiBox>
  );
}
