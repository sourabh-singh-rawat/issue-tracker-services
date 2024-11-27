import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

import Tab from "../../../../common/components/Tab";
import Tabs from "../../../../common/components/Tabs";
import DateTag from "../../../../common/components/DateTag";

import { useMessageBar } from "../../../message-bar/hooks";
import Chip from "../../../../common/components/Chip";
import Title from "../../../../common/components/ItemName";

export default function Project() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess } = useMessageBar();
  const { data, isLoading } = useState();
  const [updateProject, updateProjectOptions] = useState();

  const tabName = location.pathname.split("/")[3] || "overview";
  const mapPathToIndex: Record<string, number> = {
    overview: 0,
    items: 1,
    activity: 3,
    settings: 4,
  };

  const mapIndexToTab: Record<number, string> = {
    0: `/lists/${id}/overview`,
    1: `/lists/${id}/items`,
    3: `/lists/${id}/activity`,
    4: `/lists/${id}/settings`,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[tabName]);

  const handleChange = (e: unknown, newValue: number) => {
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  const onTitleSubmit = async (value: string) => {
    if (!id) return;
    await updateProject({ id, body: { name: value } });
  };

  useEffect(() => setSelectedTab(mapPathToIndex[tabName]), [tabName, id]);

  useEffect(() => {
    if (updateProjectOptions.isSuccess) showSuccess("Title updated");
  }, [updateProjectOptions.isSuccess]);

  return (
    <MuiGrid container>
      <MuiGrid xs={12} item>
        <Title defaultValue={data?.name} handleSubmit={onTitleSubmit} />
      </MuiGrid>

      <MuiGrid xs={12} container>
        <MuiGrid sx={{ color: theme.palette.text.primary }} xs={12} item>
          <MuiBreadcrumbs separator="•">
            {isLoading ? (
              <MuiSkeleton width="80px" />
            ) : (
              <MuiTypography component="span" variant="body2">
                <Chip label="List" />
              </MuiTypography>
            )}
            {isLoading ? (
              <MuiSkeleton width="80px" />
            ) : (
              <MuiTypography component="span" variant="body2">
                <DateTag date={data?.updatedAt} />
              </MuiTypography>
            )}
          </MuiBreadcrumbs>
        </MuiGrid>
      </MuiGrid>

      <MuiGrid xs={12} item sx={{ pt: theme.spacing(1) }}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab isLoading={isLoading} label="Overview" value={0} />
          <Tab isLoading={isLoading} label="Items" value={1} />
          <Tab isLoading={isLoading} label="Activity" value={3} />
          <Tab isLoading={isLoading} label="Settings" value={4} />
        </Tabs>
      </MuiGrid>

      <MuiGrid xs={12} item>
        <Outlet context={{ id, selectedTab, page: data, isLoading }} />
      </MuiGrid>
    </MuiGrid>
  );
}
