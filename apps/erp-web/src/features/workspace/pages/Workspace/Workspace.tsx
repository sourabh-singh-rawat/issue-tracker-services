import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Outlet, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { createContext, useEffect, useState } from "react";
import { CustomTab, CustomTabs } from "@shared";
import PageHeader from "../../../../shared/components/PageHeader";

export const WorkspaceTabContext = createContext<{ selectedTab: number }>({
  selectedTab: 0,
});

export default function Workspace() {
  const theme = useTheme();
  const { id } = useParams({ from: "/_authenticated/workspaces/$id" });
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tabName = pathname.split("/")[3] || "settings";
  const mapPathToIndex: Record<string, number> = {
    settings: 0,
    members: 1,
  };
  const selectedTabIndex = mapPathToIndex[tabName] ?? 0;
  const [selectedTab, setSelectedTab] = useState(selectedTabIndex);

  const handleChange = (_e: unknown, newValue: number) => {
    if (!id) return;
    if (newValue === 0) {
      void navigate({ to: "/workspaces/$id/settings", params: { id } });
    } else if (newValue === 1) {
      void navigate({ to: "/workspaces/$id/members", params: { id } });
    }
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(selectedTabIndex);
  }, [tabName]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title="Workspace Settings" showButton={false} />
      </Grid>
      <Grid xs={12} item sx={{ pt: theme.spacing(1) }}>
        <CustomTabs value={selectedTab} handleChange={handleChange}>
          <CustomTab label="Settings" index={0} />
          <CustomTab label="Members" index={1} />
        </CustomTabs>
      </Grid>

      <Grid xs={12}>
        <WorkspaceTabContext.Provider value={{ selectedTab }}>
          <Outlet />
        </WorkspaceTabContext.Provider>
      </Grid>
    </Grid>
  );
}
