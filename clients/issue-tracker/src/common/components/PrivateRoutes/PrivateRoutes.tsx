import { Box, Container, Grid2, Toolbar, useTheme } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector, useLargeScreen } from "../../hooks";
import { AppLoader } from "../AppLoader";
import { Navbar } from "../navigation/Navbar";
import { Sidebar } from "../navigation/Sidebar";

export const PrivateRoutes = () => {
  const location = useLocation();
  const user = useAppSelector((x) => x.auth);
  const theme = useTheme();
  const isLargeScreen = useLargeScreen();
  const workspaceId = useAppSelector((x) => x.workspace.current?.id);

  if (!user) return <AppLoader />;

  return user ? (
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
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
};
