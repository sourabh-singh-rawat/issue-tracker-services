import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Outlet, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { createContext, useEffect, useState } from "react";
import { CustomTab, CustomTabs } from "../../../../common";
import PageHeader from "../../../../common/components/PageHeader";

export const WorkspaceTabContext = createContext<{ selectedTab: number }>({
  selectedTab: 0,
});

export default function Workspace() {
  const theme = useTheme();
  const params = useParams({ strict: false }) as { id?: string };
  const id = params.id;
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tabName = pathname.split("/")[3] || "settings";
  const mapPathToIndex: Record<string, number> = {
    settings: 0,
    members: 1,
  };
  const mapIndexToTab: Record<number, string> = {
    0: `/workspaces/${id}/settings`,
    1: `/workspaces/${id}/members`,
  };
  const selectedTabIndex = mapPathToIndex[tabName] ?? 0;
  const [selectedTab, setSelectedTab] = useState(selectedTabIndex);

  const handleChange = (e: unknown, newValue: number) => {
    const path = mapIndexToTab[newValue];
    if (path) navigate({ to: path as "/me" });
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
