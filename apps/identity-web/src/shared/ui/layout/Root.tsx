import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useGetCurrentUserQuery } from "@generated/api/@tanstack/react-query.gen";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { isNavbarHidden } from "./isNavbarHidden";
import { Navbar } from "./Navbar";

export const Root = () => {
  useGetCurrentUserQuery();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navbarHidden = isNavbarHidden(pathname);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />
      {!navbarHidden ? <Toolbar variant="dense" disableGutters /> : null}
      <Outlet />
    </Box>
  );
};
