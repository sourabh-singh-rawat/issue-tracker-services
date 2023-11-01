import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import {
  useGetProjectMembersQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../../../api/generated/project.api";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Tab from "../../../../common/components/Tab";
import Tabs from "../../../../common/components/Tabs";
import TextButton from "../../../../common/components/buttons/TextButton";

import Title from "../../../../common/components/Title";
import { useMessageBar } from "../../../message-bar/hooks";

export default function Project() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess } = useMessageBar();
  const { data, isLoading } = useGetProjectQuery({ id });
  const [updateProject, updateProjectOptions] = useUpdateProjectMutation();
  const [project, setProject] = useState({
    name: "",
    ownerUserId: "",
    updatedAt: "",
    status: "",
    members: [{ id: "", name: "" }],
  });
  const { data: projectMembers, ...projectMembersResponse } =
    useGetProjectMembersQuery({ id });

  const tabName = location.pathname.split("/")[3] || "overview";
  const mapPathToIndex: { [k: string]: number } = {
    overview: 0,
    issues: 1,
    members: 2,
    activity: 3,
    settings: 4,
  };

  const mapIndexToTab: { [k: number]: string } = {
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

  useEffect(() => {
    setProject(data?.rows);
  }, [data]);

  useEffect(() => setSelectedTab(mapPathToIndex[tabName]), [tabName, id]);

  useEffect(() => {
    if (updateProjectOptions.isSuccess) {
      showSuccess("Title updated");
    }
  }, [updateProjectOptions.isSuccess]);

  useEffect(() => {
    if (projectMembersResponse.isSuccess) {
      setProject((prev) => ({
        ...prev,
        members: projectMembers?.rows,
      }));
    }
  }, [projectMembers]);

  return (
    <MuiGrid container>
      <MuiGrid xs={12} item sx={{ marginLeft: theme.spacing(-1) }}>
        <TextButton
          label="Back to all projects"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/projects")}
        />
      </MuiGrid>

      <MuiGrid xs={12} item>
        <Title
          page={project}
          setPage={setProject}
          updateQuery={async () => {
            if (!id) return;
            await updateProject({ id, body: { name: project.name } });
          }}
        />
      </MuiGrid>

      <MuiGrid xs={12}>
        <MuiGrid sx={{ color: theme.palette.text.primary }} xs={12} item>
          <MuiBreadcrumbs separator="•">
            {/* {isLoading ? <MuiSkeleton width="80px" /> : prioritySelector} */}
            {isLoading ? (
              <MuiSkeleton width="80px" />
            ) : (
              <MuiTypography component="span" variant="body2">
                {project?.status}
              </MuiTypography>
            )}
            {isLoading ? (
              <MuiSkeleton width="80px" />
            ) : (
              <MuiTypography component="span" variant="body2">
                {project?.updatedAt && dayjs(project?.updatedAt).fromNow()}
              </MuiTypography>
            )}
          </MuiBreadcrumbs>
        </MuiGrid>
      </MuiGrid>

      <MuiGrid xs={12} item>
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
            page: project,
            setPage: setProject,
            isLoading,
          }}
        />
      </MuiGrid>
    </MuiGrid>
  );
}
