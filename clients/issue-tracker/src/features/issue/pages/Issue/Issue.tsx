import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Link, useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";

import Tab from "../../../../common/components/Tab";
import Tabs from "../../../../common/components/Tabs";

import { useSnackbar } from "../../../../common/components/Snackbar/hooks";

import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

import Title2 from "../../../../common/components/ItemName";
import Chip from "../../../../common/components/Chip";

export default function Issue() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useSnackbar();
  const [issue, setIssue] = useState({ name: "", updatedAt: "" });

  const { data, ...issueRequest } = useState({ id });
  const [updateIssue, updateIssueOptions] = useState();

  const tabName = location.pathname.split("/")[3] || "overview";
  const mapTabToIndex: { [k: string]: number } = {
    overview: 0,
    tasks: 1,
    attachments: 2,
    comments: 3,
    settings: 4,
  };
  const [selectedTab, setSelectedTab] = useState(mapTabToIndex[tabName]);

  useEffect(() => {
    if (updateIssueOptions.isSuccess) {
      showSuccess("Issue title updated successfully");
    }

    if (updateIssueOptions.isError) {
      showError("Failed to update issue title");
    }
  }, [updateIssueOptions.isSuccess]);

  useEffect(() => {
    setSelectedTab(mapTabToIndex[tabName]);
  }, [id, tabName]);

  useEffect(() => {
    if (issueRequest.isSuccess) setIssue(data);
  }, [data]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab: { [k: number]: string } = {
      0: `/items/${id}/overview`,
      1: `/items/${id}/tasks`,
      2: `/items/${id}/attachments `,
      3: `/items/${id}/comments`,
      4: `/items/${id}/settings`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <MuiGrid container>
      <MuiGrid xs={12} item>
        <MuiGrid xs={12} item>
          {/* <IssuePath
            projectName={issue.project.name}
            projectId={issue.project.id}
            tabName={tabName}
          /> */}
        </MuiGrid>
        <MuiGrid xs={12} item>
          <Title2
            defaultValue={issue.name}
            handleSubmit={async (name) => {
              if (!id) return;
              await updateIssue({ id, body: { name } });
            }}
          />
        </MuiGrid>
        <MuiGrid xs={12}>
          <MuiGrid sx={{ color: theme.palette.text.primary }} xs={12} item>
            <MuiBreadcrumbs separator="•">
              {/* {isLoading ? <MuiSkeleton width="80px" /> : statusSelector} */}
              {/* {isLoading ? <MuiSkeleton width="80px" /> : prioritySelector} */}
              {issueRequest.isLoading ? (
                <MuiSkeleton width="80px" />
              ) : (
                <MuiTypography component="span" variant="body2">
                  <Chip label="Issue" color={theme.palette.error.main} /> in{" "}
                  {""}
                  <Link>{data?.project?.name}</Link>
                </MuiTypography>
              )}
              {issueRequest.isLoading ? (
                <MuiSkeleton width="80px" />
              ) : (
                <MuiTypography component="span" variant="body2">
                  {issue?.createdAt && dayjs(issue?.createdAt).fromNow()}
                </MuiTypography>
              )}
            </MuiBreadcrumbs>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>

      <MuiGrid xs={12} item sx={{ pt: theme.spacing(1) }}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab isLoading={issueRequest.isLoading} label="Overview" value={0} />
          <Tab isLoading={issueRequest.isLoading} label="Tasks" value={1} />
          <Tab
            isLoading={issueRequest.isLoading}
            label="Attachments"
            value={2}
          />
          <Tab isLoading={issueRequest.isLoading} label="Comments" value={3} />
        </Tabs>
      </MuiGrid>
      <MuiGrid xs={12} item>
        <Outlet
          context={{
            id,
            selectedTab,
            page: issue,
            setPage: setIssue,
          }}
        />
      </MuiGrid>
    </MuiGrid>
  );
}
