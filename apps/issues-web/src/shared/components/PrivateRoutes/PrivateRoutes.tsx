import { useEffect } from "react";
import { Box, Container, Grid2, Toolbar, useTheme } from "@mui/material";
import { useAuthStore } from "@features/auth";
import { useWorkspaceStore } from "@features/workspace";
import { useLargeScreen } from "../../hooks";
import { redirectToIdentityLogin } from "../../utils/identity-web";
import { AppLoader } from "../AppLoader";
import { Navbar } from "../navigation/Navbar";
import { Sidebar } from "../navigation/Sidebar";

interface PrivateRoutesProps {
  children?: React.ReactNode;
}

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const current = useAuthStore((s) => s.current);
  const isLoading = useAuthStore((s) => s.isLoading);
  const theme = useTheme();
  const isLargeScreen = useLargeScreen();
  const workspaceId = useWorkspaceStore((s) => s.current?.id);

  useEffect(() => {
    if (!isLoading && !current) {
      redirectToIdentityLogin();
    }
  }, [isLoading, current]);

  if (isLoading || !current) return <AppLoader />;

  return (
    <Box display="flex" height="100vh">
      <Navbar />
      <Sidebar />
      <Container
        sx={{
          width: `calc(100% - ${isLargeScreen ? theme.spacing(32) : theme.spacing(9)})`,
          overflowX: "auto",
        }}
        disableGutters
      >
        <Toolbar variant="dense" disableGutters />
        {workspaceId && (
          <Grid2 container>
            <Grid2 size={12}>{children}</Grid2>
          </Grid2>
        )}
      </Container>
    </Box>
  );
};
