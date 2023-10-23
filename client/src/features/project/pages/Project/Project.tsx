import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../../../api/generated/project.api";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Tab from "../../../../common/components/Tab";
import Tabs from "../../../../common/components/Tabs";
import TitleSection from "../../../../common/components/TitleSection";
import TextButton from "../../../../common/components/buttons/TextButton";

import { setProject } from "../../project.slice";
import { useMessageBar } from "../../../message-bar/hooks";

export default function Project() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { showSuccess } = useMessageBar();
  const project = useAppSelector(({ project }) => project.settings);
  const { data, isLoading, isSuccess } = useGetProjectQuery({ id });
  const [updateProject, updateProjectOptions] = useUpdateProjectMutation();

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

  const updateTitleQuery = () => {
    if (!id) return;
    updateProject({ id, body: { name: project.name } });
  };

  useEffect(() => {
    dispatch(setProject(data?.rows));
  }, [isSuccess]);

  useEffect(() => setSelectedTab(mapPathToIndex[tabName]), [tabName, id]);

  useEffect(() => {
    if (updateProjectOptions.isSuccess) {
      showSuccess("Title updated");
    }
  }, [updateProjectOptions.isSuccess]);

  return (
    <MuiGrid container>
      <MuiGrid xs={12} item sx={{ marginLeft: theme.spacing(-0.5) }}>
        <TextButton
          label="Back to all projects"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/projects")}
        />
      </MuiGrid>
      <MuiGrid xs={12} item>
        <TitleSection
          page={project}
          isLoading={isLoading}
          updateTitle={setProject}
          updateTitleQuery={updateTitleQuery}
        />
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
        <Outlet context={[selectedTab, id]} />
      </MuiGrid>
    </MuiGrid>
  );
}
