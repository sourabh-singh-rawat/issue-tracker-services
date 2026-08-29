import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Link, useRouterState } from "@tanstack/react-router";

const NAV_ITEMS = [
  { to: "/identities", label: "Identities" },
  { to: "/tenants", label: "Tenants" },
] as const;

export const Navbar = () => {
  const theme = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar variant="dense" disableGutters sx={{ px: 2.5 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit", marginRight: 32 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Platform
          </Typography>
        </Link>

        <Stack direction="row" spacing={3} component="nav" sx={{ flexGrow: 1 }}>
          {NAV_ITEMS.map(({ to, label }) => {
            const isActive = pathname === to || pathname.startsWith(`${to}/`);

            return (
              <Link
                key={to}
                to={to}
                style={{
                  textDecoration: "none",
                  color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
                  fontWeight: isActive ? 600 : 500,
                  borderBottom: isActive
                    ? `2px solid ${theme.palette.primary.main}`
                    : "2px solid transparent",
                  paddingTop: 8,
                  paddingBottom: 8,
                }}
              >
                <Box component="span">{label}</Box>
              </Link>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
