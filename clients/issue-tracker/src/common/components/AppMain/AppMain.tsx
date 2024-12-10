import { Box, Container, Grid2, Toolbar, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useFindWorkspacesQuery } from "../../../api/codegen/gql/graphql";
import {
  setDefaultWorkspace,
  setWorkspaces,
} from "../../../features/workspace/workspace.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useLargeScreen } from "../../hooks/useLargeScreen";
import { Navbar } from "../navigation/Navbar";
import { Sidebar } from "../navigation/Sidebar";

export function AppMain() {
  const theme = useTheme();
  const isLargeScreen = useLargeScreen();
  const dispatch = useAppDispatch();
  const { data: workspaces } = useFindWorkspacesQuery();
  const { id } = useAppSelector(
    ({ workspace }) => workspace.defaultWorkspace || { id: "", name: "" },
  );

  useEffect(() => {
    if (workspaces) {
      const defaultWorkspace = workspaces.findWorkspaces.find(
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
      <Sidebar />
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
