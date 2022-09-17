import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import Tab from "../../../../common/Tab/Tab";
import Tabs from "../../../../common/Tabs/Tabs";
import TitleSection from "../../../../common/TitleSection";
import BackButton from "../../../../common/BackButton/BackButton";

import { setSnackbarOpen } from "../../../snackbar.reducer";
import { setIssue, updateIssue } from "../../issue.slice";

import { useGetIssueQuery } from "../../issue.api";

const Issue = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { data } = useGetIssueQuery(id);
  const issue = useSelector((store) => store.issue.info);
  const tabName = location.pathname.split("/")[3];
  const mapTabToIndex = { overview: 0, tasks: 1, settings: 2 };
  const [selectedTab, setSelectedTab] = useState(mapTabToIndex[tabName]);

  const updateTitleQuery = () => {
    fetch(
      `http://localhost:4000/api/issues/${id}/?projectId=${issue.projectId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ["name"]: issue.name }),
      }
    ).then((response) => {
      if (response.status === 200) dispatch(setSnackbarOpen(true));
    });
  };

  useEffect(() => {
    setSelectedTab(mapTabToIndex[tabName]);
  }, [id, tabName]);

  useEffect(() => {
    if (data) dispatch(setIssue(data));
  }, [data]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      0: `/issues/${issue.id}/overview`,
      1: `/issues/${issue.id}/tasks`,
      2: `/issues/${issue.id}/settings`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <MuiGrid container gap="20px">
      <MuiGrid item xs={12}>
        <TitleSection
          breadcrumbItems={[
            { text: "projects", onClick: () => navigate(`/projects`) },
            {
              text: issue.project_name && issue.project_name.toLowerCase(),
              onClick: () => navigate(`/projects/${issue.project_id}/overview`),
            },
            {
              text: "issues",
              onClick: () => navigate(`/projects/${issue.project_id}/issues`),
            },
            { text: tabName },
          ]}
          page={issue}
          updateTitle={updateIssue}
          updateTitleQuery={updateTitleQuery}
          onClick={() => navigate("/issues")}
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Overview" value={0} />
          <Tab label="Tasks" value={1} />
          <Tab label="Settings" value={2} />
        </Tabs>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Outlet context={[selectedTab]} />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Issue;
