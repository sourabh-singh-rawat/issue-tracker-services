import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Grid2, Toolbar, useTheme } from "@mui/material";

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

      if (defaultWorkspace) {
        dispatch(setDefaultWorkspace(defaultWorkspace));
        dispatch(setWorkspaces(workspaces));
      }
    }
  }, [workspaces]);

  return (
    <Box display="flex" height="100vh">
      <Navbar />
      <MenuSidebar />
      <Container
        sx={{
          width: `calc(100% - ${
            isLargeScreen ? theme.spacing(32) : theme.spacing(9)
          })`,
          overflowX: "auto",
        }}
        disableGutters
      >
        <Toolbar variant="dense" disableGutters />
        <Grid2 container>{id && <Outlet />}</Grid2>
      </Container>
    </Box>
  );
}
