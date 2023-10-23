import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Tabs from "../../../../common/components/Tabs";
import Tab from "../../../../common/components/Tab";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import {
  useGetIssuePriorityListQuery,
  useGetIssueQuery,
  useGetIssueStatusListQuery,
} from "../../../../api/generated/issue.api";
import { setIssue, setIssuePriority, setIssueStatus } from "../../issue.slice";
import TitleSection from "../../../../common/components/TitleSection";
import TextButton from "../../../../common/components/buttons/TextButton";

export default function Issue() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { data, ...issueRequest } = useGetIssueQuery({ id });
  const { data: statusList, ...statusListRequest } =
    useGetIssueStatusListQuery();
  const { data: priorityList, ...priorityListRequest } =
    useGetIssuePriorityListQuery();

  const tabName = location.pathname.split("/")[3] || "overview";
  const mapTabToIndex: { [k: string]: number } = {
    overview: 0,
    tasks: 1,
    attachments: 2,
    comments: 3,
    settings: 4,
  };
  const [selectedTab, setSelectedTab] = useState(mapTabToIndex[tabName]);

  const updateTitleQuery = async () => {
    // updateIssue({ id, body: { name: issue.name } });
  };

  const issue = useAppSelector((store) => store.issue.info);

  useEffect(() => {
    if (statusListRequest.isSuccess) dispatch(setIssueStatus(statusList));
  }, [statusList]);

  useEffect(() => {
    if (priorityListRequest.isSuccess) dispatch(setIssuePriority(priorityList));
  }, [priorityList]);

  useEffect(() => {
    setSelectedTab(mapTabToIndex[tabName]);
  }, [id, tabName]);

  useEffect(() => {
    if (issueRequest.isSuccess) dispatch(setIssue(data?.rows));
  }, [data]);

  // useEffect(() => {
  //   if (isSuccess) dispatch(setMessageBarOpen(true));
  // }, [isSuccess]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab: { [k: number]: string } = {
      0: `/issues/${id}/overview`,
      1: `/issues/${id}/tasks`,
      2: `/issues/${id}/attachments `,
      3: `/issues/${id}/comments`,
      4: `/issues/${id}/settings`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  // On component unmount: clear issue info
  // useEffect(() => () => dispatch(resetIssueSlice()), []);

  return (
    <MuiGrid spacing={2} container>
      <MuiGrid xs={12} item>
        <MuiGrid xs={12} item sx={{ marginLeft: theme.spacing(-0.5) }}>
          <TextButton
            label="Back to all issues"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/issues")}
          />
        </MuiGrid>

        <MuiGrid xs={12} item>
          <TitleSection
            page={issue}
            isLoading={issueRequest.isLoading}
            updateTitle={setIssue}
            updateTitleQuery={updateTitleQuery}
          />
        </MuiGrid>
      </MuiGrid>

      <MuiGrid xs={12} item>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab isLoading={issueRequest.isLoading} label="Overview" value={0} />
          <Tab isLoading={issueRequest.isLoading} label="Tasks" value={1} />
          <Tab
            isLoading={issueRequest.isLoading}
            label="Attachments"
            value={2}
          />
          <Tab isLoading={issueRequest.isLoading} label="Comments" value={3} />
          <Tab isLoading={issueRequest.isLoading} label="Settings" value={4} />
        </Tabs>
      </MuiGrid>
      <MuiGrid xs={12} item>
        <Outlet context={[selectedTab]} />
      </MuiGrid>
    </MuiGrid>
  );
}
