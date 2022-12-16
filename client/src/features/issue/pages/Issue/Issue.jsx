import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import Tab from "../../../../common/tabs/Tab";
import Tabs from "../../../../common/tabs/Tabs";
import TitleSection from "../../../../common/headers/TitleSection";
import IssueStatusSelector from "../../components/containers/IssueStatusSelector";
import IssuePrioritySelector from "../../components/containers/IssuePrioritySelector";

import { setMessageBarOpen } from "../../../message-bar/slice/message-bar.slice";
import {
  resetIssueSlice,
  setIssue,
  setIssuePriority,
  setIssueStatus,
  updateIssue,
} from "../../slice/issue.slice";
import {
  useGetIssueQuery,
  useGetIssuesPriorityQuery,
  useGetIssuesStatusQuery,
  useUpdateIssueMutation,
} from "../../api/issue.api";

const Issue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { data } = useGetIssueQuery(id);
  const issueStatus = useGetIssuesStatusQuery();
  const issuePriority = useGetIssuesPriorityQuery();
  const [updateIssueQuery, { isSuccess }] = useUpdateIssueMutation();

  const issue = useSelector((store) => store.issue.info);
  const tabName = location.pathname.split("/")[3];
  const mapTabToIndex = {
    overview: 0,
    tasks: 1,
    attachments: 2,
    comments: 3,
    settings: 4,
  };
  const [selectedTab, setSelectedTab] = useState(mapTabToIndex[tabName]);

  const updateTitleQuery = async () => {
    updateIssueQuery({ id, body: { name: issue.name } });
  };

  useEffect(() => {
    if (issueStatus.isSuccess) {
      dispatch(setIssueStatus(issueStatus.data));
    }
  }, [issueStatus]);

  useEffect(() => {
    if (issuePriority.isSuccess) {
      dispatch(setIssuePriority(issuePriority.data));
    }
  }, [issuePriority]);

  useEffect(() => {
    setSelectedTab(mapTabToIndex[tabName]);
  }, [id, tabName]);

  useEffect(() => {
    if (data) dispatch(setIssue(data));
  }, [data]);

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      0: `/issues/${issue.id}/overview`,
      1: `/issues/${issue.id}/tasks`,
      2: `/issues/${issue.id}/attachments `,
      3: `/issues/${issue.id}/comments`,
      4: `/issues/${issue.id}/settings`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  // On component unmount: clear issue info
  useEffect(() => {
    return () => {
      dispatch(resetIssueSlice());
    };
  }, []);

  return (
    <MuiGrid container spacing={2}>
      <MuiGrid item xs={12}>
        <TitleSection
          breadcrumbItems={[
            { text: "Projects", onClick: () => navigate(`/projects`) },
            {
              text: issue.project_name,
              onClick: () => navigate(`/projects/${issue.project_id}/overview`),
            },
            {
              text: "Issues",
              onClick: () => navigate(`/projects/${issue.project_id}/issues`),
            },
            {
              text: issue.id,
              onClick: () => navigate(`/issues/${issue.id}/overview`),
            },
          ]}
          isLoading={issue.isLoading}
          page={issue}
          updateTitle={updateIssue}
          updateTitleQuery={updateTitleQuery}
          onClick={() => navigate(`/issues`)}
          statusSelector={
            <IssueStatusSelector
              value={issue.status}
              handleChange={async (e) => {
                const { name, value } = e.target;
                dispatch(updateIssue({ status: value }));
                await updateIssueQuery({ id, body: { status: value } });

                if (isSuccess) dispatch(setMessageBarOpen(true));
              }}
              variant="dense"
            />
          }
          prioritySelector={
            <IssuePrioritySelector
              value={issue.priority}
              handleChange={async (e) => {
                const { name, value } = e.target;
                dispatch(updateIssue({ priority: value }));
                await updateIssueQuery({ id, body: { priority: value } });

                if (isSuccess) dispatch(setMessageBarOpen(true));
              }}
              variant="dense"
            />
          }
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Overview" value={0} />
          <Tab label="Tasks" value={1} />
          <Tab label="Attachments" value={2} />
          <Tab label="Comments" value={3} />
          <Tab label="Settings" value={4} />
        </Tabs>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Outlet context={[selectedTab]} />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Issue;
