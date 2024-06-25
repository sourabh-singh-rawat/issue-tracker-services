import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../../../api/generated/project.api";
dayjs.extend(relativeTime);

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Tab from "../../../../common/components/Tab";
import Tabs from "../../../../common/components/Tabs";
import DateTag from "../../../../common/components/DateTag";
import TextButton from "../../../../common/components/buttons/TextButton";

import { useMessageBar } from "../../../message-bar/hooks";
import Chip from "../../../../common/components/Chip";
import Title from "../../../../common/components/Title";

export default function Project() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess } = useMessageBar();
  const { data, isLoading } = useGetProjectQuery({ id });
  const [updateProject, updateProjectOptions] = useUpdateProjectMutation();

  const tabName = location.pathname.split("/")[3] || "overview";
  const mapPathToIndex: Record<string, number> = {
    overview: 0,
    issues: 1,
    members: 2,
    activity: 3,
    settings: 4,
  };

  const mapIndexToTab: Record<number, string> = {
    0: `/projects/${id}/overview`,
    1: `/projects/${id}/issues`,
    2: `/projects/${id}/members`,
    3: `/projects/${id}/activity`,
    4: `/projects/${id}/settings`,
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
      <MuiGrid xs={12} item sx={{ ml: theme.spacing(-1) }}>
        <TextButton
          label="Back to Projects"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/projects")}
        />
      </MuiGrid>

      <MuiGrid xs={12} item>
        <Title defaultValue={data?.name} onTitleSubmit={onTitleSubmit} />
      </MuiGrid>

      <MuiGrid xs={12} container>
        <MuiGrid sx={{ color: theme.palette.text.primary }} xs={12} item>
          <MuiBreadcrumbs separator="•">
            {isLoading ? (
              <MuiSkeleton width="80px" />
            ) : (
              <MuiTypography component="span" variant="body2">
                <Chip label="Project" />
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
          <Tab isLoading={isLoading} label="Issues" value={1} />
          <Tab isLoading={isLoading} label="Members" value={2} />
          <Tab isLoading={isLoading} label="Activity" value={3} />
          <Tab isLoading={isLoading} label="Settings" value={4} />
        </Tabs>
      </MuiGrid>

      <MuiGrid xs={12} item>
        <Outlet
          context={{
            id,
            selectedTab,
            page: data,
            isLoading,
          }}
        />
      </MuiGrid>
    </MuiGrid>
  );
}
