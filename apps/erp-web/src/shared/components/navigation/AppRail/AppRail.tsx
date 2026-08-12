import { Box, IconButton, Stack, Toolbar, Tooltip, useTheme } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Link, useRouterState } from "@tanstack/react-router";
import { ERP_APPS, type ErpAppId } from "../../../apps";

const APP_ICONS: Record<ErpAppId, typeof AssignmentOutlinedIcon> = {
  issues: AssignmentOutlinedIcon,
  inventory: Inventory2OutlinedIcon,
  catalog: CategoryOutlinedIcon,
};

export const AppRail = () => {
  const theme = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Box
      component="nav"
      aria-label="Applications"
      sx={{
        width: theme.spacing(8),
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        zIndex: theme.zIndex.drawer,
      }}
    >
      <Toolbar variant="dense" disableGutters />
      <Stack spacing={0.5} sx={{ py: 1, width: "100%", alignItems: "center" }}>
        {ERP_APPS.map((app) => {
          const Icon = APP_ICONS[app.id];
          const active = app.isActive(pathname);

          return (
            <Tooltip key={app.id} title={app.label} placement="right">
              <IconButton
                component={Link}
                to={app.to}
                aria-label={app.label}
                aria-current={active ? "page" : undefined}
                size="medium"
                sx={{
                  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
                  backgroundColor: active ? "rgba(145, 71, 255, 0.12)" : "transparent",
                  borderRadius: theme.shape.borderRadiusMedium,
                  "&:hover": {
                    backgroundColor: active
                      ? "rgba(145, 71, 255, 0.18)"
                      : theme.palette.action.hover,
                  },
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            </Tooltip>
          );
        })}
      </Stack>
    </Box>
  );
};
