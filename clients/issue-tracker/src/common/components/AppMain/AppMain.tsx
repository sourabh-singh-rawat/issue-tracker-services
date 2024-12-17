import { Box, Container, Grid2, Toolbar, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import { useFindWorkspacesQuery } from "../../../api/codegen/gql/graphql";
import { configureWorkspaceSlice } from "../../../features/workspace/workspace.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useLargeScreen } from "../../hooks/useLargeScreen";
import { Navbar } from "../navigation/Navbar";
import { Sidebar } from "../navigation/Sidebar";

export function AppMain() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isLargeScreen = useLargeScreen();
  const workspaceId = useAppSelector((x) => x.workspace.current?.id);

  useFindWorkspacesQuery({
    onCompleted(response) {
      dispatch(configureWorkspaceSlice(response.findWorkspaces));
    },
  });

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
        <Grid2 container>{workspaceId && <Outlet />}</Grid2>
      </Container>
    </Box>
  );
}
