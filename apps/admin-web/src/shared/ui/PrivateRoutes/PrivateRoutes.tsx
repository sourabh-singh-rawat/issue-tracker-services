import { useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useAuthStore } from "@features/auth";
import { redirectToOidcSignIn } from "../../../lib/auth";
import { AppLoader } from "../AppLoader";
import { Navbar } from "../Navbar";

interface PrivateRoutesProps {
  children?: React.ReactNode;
}

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const current = useAuthStore((s) => s.current);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!isLoading && !current) {
      redirectToOidcSignIn();
    }
  }, [isLoading, current]);

  if (isLoading || !current) {
    return <AppLoader />;
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Toolbar variant="dense" disableGutters />
      {children}
    </Box>
  );
};
