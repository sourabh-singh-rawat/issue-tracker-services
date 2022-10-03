import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";

import Tab from "../../../../common/Tab";
import Tabs from "../../../../common/Tabs";
import PageTitleSection from "../../../../common/TitleSection";

import { setProject, setStatus, updateProject } from "../../project.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";

import {
  useGetStatusQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../project.api";

const Project = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useGetStatusQuery();
  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();
  const tabName = location.pathname.split("/")[3];

  const { data, isFetching } = useGetProjectQuery(id);
  const project = useSelector((store) => store.project.info);

  const updateDescriptionQuery = () => {
    updateProjectMutation({
      id,
      payload: { description: project.description },
    });
  };

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
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  useEffect(() => {
    if (status.data) dispatch(setStatus(status.data));
  }, [status]);

  useEffect(() => {
    setSelectedTab(mapPathToIndex[tabName]);
  }, [tabName, id]);

  useEffect(() => {
    if (data) dispatch(setProject({ ...data, loading: false }));
  }, [isFetching]);

  return (
    <MuiGrid container gap="20px">
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
            {
              text: tabName,
            },
          ]}
        />
        {/* <PageDescription
          page={project}
          updateDescription={updateProject}
          updateDescriptionQuery={updateDescriptionQuery}
          loading={project.loading}
        /> */}
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
