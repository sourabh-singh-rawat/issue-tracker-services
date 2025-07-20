import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../common/components/PageHeader";
import { CustomTab, CustomTabs } from "../../../../common";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";

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
  const selectedTabIndex = mapPathToIndex[tabName] ?? 0;
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
        <CustomTabs value={selectedTab} handleChange={handleChange}>
          <CustomTab label="Settings" index={0} />
          <CustomTab label="Members" index={1} />
        </CustomTabs>
      </Grid>

      <Grid xs={12}>
        <Outlet context={{ selectedTab }} />
      </Grid>
    </Grid>
  );
}
