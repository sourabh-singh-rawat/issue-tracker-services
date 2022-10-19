import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";

import Tab from "../../../../common/Tab";
import Tabs from "../../../../common/Tabs";
import PageTitleSection from "../../../../common/TitleSection";
import ProjectStatusSelector from "../ProjectStatusSelector";

import { setProject, setStatus, updateProject } from "../../project.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";

import {
  useGetStatusQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../project.api";
import {
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
} from "../../../issue/issue.api";
import { setIssueStatus } from "../../../issue/issue.slice";

const Project = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const issueStatus = useGetIssuesStatusQuery();
  const issuePriority = useGetIssuesPriorityQuery();
  const status = useGetStatusQuery();
  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();
  const tabName = location.pathname.split("/")[3];

  const getProjectQuery = useGetProjectQuery(id);
  const project = useSelector((store) => store.project.info);

  const mapPathToIndex = {
    overview: 0,
    issues: 1,
    members: 2,
    activity: 3,
    settings: 4,
  };

  const mapIndexToTab = {
    0: `/projects/${id}/overview`,
    1: `/projects/${id}/issues`,
    2: `/projects/${id}/members`,
    3: `/projects/${id}/activity`,
    4: `/projects/${id}/settings`,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[tabName]);

  const handleChange = (e, newValue) => {
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  const updateTitleQuery = () => {
    updateProjectMutation({ id, payload: { name: project.name } });
  };

  useEffect(() => {
    if (issueStatus.isSuccess) {
      dispatch(setIssueStatus(issueStatus.data));
    }
  }, [issueStatus.data]);

  useEffect(() => {
    if (issueStatus.isSuccess) {
      dispatch(setIssueStatus(issueStatus.data));
    }
  }, [issuePriority.data]);

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  useEffect(() => {
    if (status.data) dispatch(setStatus(status.data));
  }, [status]);

  useEffect(() => {
    setSelectedTab(mapPathToIndex[tabName]);
  }, [tabName, id]);

  useEffect(() => {
    if (getProjectQuery.data)
      dispatch(setProject({ ...getProjectQuery.data, loading: false }));
  }, [getProjectQuery.data]);

  return (
    <MuiGrid container spacing={2}>
      <MuiGrid item xs={12}>
        <PageTitleSection
          page={project}
          updateTitle={updateProject}
          updateTitleQuery={updateTitleQuery}
          loading={project.loading}
          breadcrumbItems={[
            {
              text: "projects",
              onClick: () => navigate("/projects"),
            },
            {
              text: project.name?.toLowerCase(),
              onClick: () => navigate(`/projects/${project.id}/overview`),
            },
          ]}
          statusSelector={
            <ProjectStatusSelector
              value={project.status}
              handleChange={(e) => {
                const { name, value } = e.target;
                updateProjectMutation({ id, payload: { status: value } });
                dispatch(updateProject({ status: value }));
              }}
              variant="dense"
            />
          }
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Overview" value={0} />
          <Tab label="Issues" value={1} />
          <Tab label="Members" value={2} />
          <Tab label="Activity" value={3} />
          <Tab label="Settings" value={4} />
        </Tabs>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Outlet context={[selectedTab, id]} />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Project;