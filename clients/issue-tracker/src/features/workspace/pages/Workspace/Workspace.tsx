import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Tab from "../../../../common/components/CustomTab";
import Tabs from "../../../../common/components/CustomTabs";
import PageHeader from "../../../../common/components/PageHeader";

export default function Workspace() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tabName = location.pathname.split("/")[3] || "settings";
  const mapPathToIndex: Record<string, number> = {
    settings: 0,
    members: 1,
  };
  const mapIndexToTab: Record<number, string> = {
    0: `/workspaces/${id}/settings`,
    1: `/workspaces/${id}/members`,
  };
  const selectedTabIndex = mapPathToIndex[tabName];
  const [selectedTab, setSelectedTab] = useState(selectedTabIndex);

  const handleChange = (e: unknown, newValue: number) => {
    navigate(`${mapIndexToTab[newValue]}`);
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
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab isLoading={false} label="Settings" id={0} />
          <Tab isLoading={false} label="Members" id={1} />
        </Tabs>
      </Grid>

      <Grid xs={12}>
        <Outlet context={{ selectedTab }} />
      </Grid>
    </Grid>
  );
}
