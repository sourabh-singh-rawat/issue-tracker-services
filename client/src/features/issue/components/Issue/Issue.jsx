import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import Tab from "../../../../common/Tab/Tab";
import Tabs from "../../../../common/Tabs/Tabs";
import TitleSection from "../../../../common/TitleSection";
import IssueStatusSelector from "../IssueStatusSelector";
import IssuePrioritySelector from "../IssuePrioritySelector";

import { setSnackbarOpen } from "../../../snackbar.reducer";
import { setIssue, updateIssue } from "../../issue.slice";
import { useGetIssueQuery, useUpdateIssueMutation } from "../../issue.api";

const Issue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { data } = useGetIssueQuery(id);
  const [updateIssueQuery, { isSuccess }] = useUpdateIssueMutation();

  const issue = useSelector((store) => store.issue.info);
  const tabName = location.pathname.split("/")[3];
  const mapTabToIndex = { overview: 0, tasks: 1, comments: 2, settings: 3 };
  const [selectedTab, setSelectedTab] = useState(mapTabToIndex[tabName]);

  const updateTitleQuery = async () => {
    updateIssueQuery({
      id,
      body: { name: issue.name },
    });
  };

  useEffect(() => {
    setSelectedTab(mapTabToIndex[tabName]);
  }, [id, tabName]);

  useEffect(() => {
    if (data) dispatch(setIssue(data));
  }, [data]);

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      0: `/issues/${issue.id}/overview`,
      1: `/issues/${issue.id}/tasks`,
      2: `/issues/${issue.id}/comments`,
      3: `/issues/${issue.id}/settings`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <MuiGrid container spacing={2}>
      <MuiGrid item xs={12}>
        <TitleSection
          breadcrumbItems={[
            { text: "Projects", onClick: () => navigate(`/projects`) },
            {
              text: issue.project_name?.toLowerCase(),
              onClick: () => navigate(`/projects/${issue.project_id}/overview`),
            },
            {
              text: "issues",
              onClick: () => navigate(`/projects/${issue.project_id}/issues`),
            },
            {
              text: issue.id,
              onClick: () => navigate(`/issues/${issue.id}/overview`),
            },
          ]}
          loading={issue?.loading}
          page={issue}
          updateTitle={updateIssue}
          updateTitleQuery={updateTitleQuery}
          onClick={() => navigate("/issues")}
          statusSelector={
            <IssueStatusSelector
              value={issue.status}
              // handleChange={(e) => {
              //   const { name, value } = e.target;
              //   updateProjectMutation({ id, payload: { status: value } });
              //   dispatch(updateProject({ status: value }));
              // }}
              variant="dense"
            />
          }
          prioritySelector={
            <IssuePrioritySelector value={issue.priority} variant="dense" />
          }
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Overview" value={0} />
          <Tab label="Tasks" value={1} />
          <Tab label={"Comments "} value={2} />
          <Tab label="Settings" value={3} />
        </Tabs>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Outlet context={[selectedTab]} />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Issue;
