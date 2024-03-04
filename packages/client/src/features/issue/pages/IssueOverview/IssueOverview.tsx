import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { ImageList, useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/components/TabPanel";
import Description from "../../../../common/components/Description";
import IssueAssignees from "../../../../common/components/IssueAssignees";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import {
  useGetIssueAttachmentListQuery,
  useGetIssuePriorityListQuery,
  useGetIssueStatusListQuery,
  useUpdateIssueMutation,
} from "../../../../api/generated/issue.api";
import { useMessageBar } from "../../../message-bar/hooks";
import Avatar from "../../../../common/components/Avatar";

import MuiTable from "@mui/material/Table";
import MuiTableRow from "@mui/material/TableRow";
import MuiTableBody from "@mui/material/TableBody";
import StyledCell from "../../../../common/components/styled/StyledCell";
import IssuePrioritySelector from "../../../issue-list/components/IssuePrioritySelector";
import IssueStatusSelector from "../../../issue-list/components/IssueStatusSelector";
import DateTag from "../../../../common/components/DateTag";
import ImageCard from "../../../issue-attachments/components/ImageCard";
import IssueResolutionSelector from "../../components/IssueResolutionSelector";

export default function IssueOverview() {
  const theme = useTheme();
  const { id, selectedTab, page, setPage, isLoading } = useSelectedTab();
  const { showSuccess, showError } = useMessageBar();

  const [updateIssueMutation, { isSuccess, isError }] =
    useUpdateIssueMutation();
  const updatePageQuery = async () => {
    updateIssueMutation({ id, body: { description: page?.description } });
  };
  const { data: statuses } = useGetIssueStatusListQuery();
  const { data: priorityList } = useGetIssuePriorityListQuery();
  const { data: attachments } = useGetIssueAttachmentListQuery({ id });
  const isArchived = Boolean(page?.deletedAt);

  useEffect(() => {
    if (isSuccess) showSuccess("Issue description updated successfully");
    if (isError) showError("Issue description not updated successfully");
  }, [isSuccess]);

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <MuiGrid spacing={2} container sx={{ py: theme.spacing(2) }}>
        <MuiGrid md={8} item>
          <MuiGrid spacing={2} container>
            <MuiGrid item xs={12}>
              <Description
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                updateQuery={updatePageQuery}
                isDisabled={isArchived}
              />
            </MuiGrid>
            {/* <MuiGrid item>
              <MuiTypography
                variant="body1"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                Tasks
              </MuiTypography>
              <MuiTypography sx={{ marginTop: "6px" }} variant="body2">
                No current incomplete tasks.{" "}
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/issues/${id}/tasks`}
                >
                  <MuiTypography
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                    variant="body2"
                  >
                    Add task.
                  </MuiTypography>
                </Link>
              </MuiTypography>
            </MuiGrid> */}
            <MuiGrid xs={12} item>
              <MuiTypography
                variant="body1"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                Attachments
              </MuiTypography>
              {attachments?.rows <= 0 ? (
                <MuiTypography sx={{ marginTop: "6px" }} variant="body2">
                  <MuiTypography variant="body2">
                    No attachments.{" "}
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/issues/${id}/attachments`}
                    >
                      <MuiTypography
                        component="span"
                        sx={{
                          color: theme.palette.primary.main,
                          "&:hover": {
                            transitionDuration: "0.5s",
                            color: theme.palette.primary.dark,
                          },
                        }}
                        variant="body2"
                      >
                        Click to add
                      </MuiTypography>
                    </Link>
                  </MuiTypography>
                </MuiTypography>
              ) : (
                <ImageList
                  cols={8}
                  rowHeight={75}
                  sx={{ width: "100%" }}
                  variant="quilted"
                >
                  {attachments?.rows.map(({ id, path }) => (
                    <ImageCard key={id} path={path} />
                  ))}
                </ImageList>
              )}
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid md={4} item>
          <MuiTypography variant="body1">
            <b>Details</b>
          </MuiTypography>
          <MuiTable>
            <MuiTableBody>
              <MuiTableRow>
                <StyledCell>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Resolution
                  </MuiTypography>
                </StyledCell>
                <StyledCell>
                  <IssueResolutionSelector id={id} value={page?.resolution} />
                </StyledCell>
              </MuiTableRow>
              <MuiTableRow>
                <StyledCell>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Status
                  </MuiTypography>
                </StyledCell>
                <StyledCell>
                  <IssueStatusSelector
                    id={id}
                    value={page?.status}
                    options={statuses?.rows}
                    isDisabled={isArchived}
                  />
                </StyledCell>
              </MuiTableRow>
              <MuiTableRow>
                <StyledCell>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Priority
                  </MuiTypography>
                </StyledCell>
                <StyledCell>
                  <IssuePrioritySelector
                    id={id}
                    value={page?.priority}
                    options={priorityList?.rows}
                    isDisabled={isArchived}
                  />
                </StyledCell>
              </MuiTableRow>
              <MuiTableRow>
                <StyledCell>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Assignees
                  </MuiTypography>
                </StyledCell>
                <StyledCell>
                  <IssueAssignees
                    projectId={page.projectId}
                    options={page?.assignees}
                  />
                </StyledCell>
              </MuiTableRow>

              <MuiTableRow>
                <StyledCell>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Reporter
                  </MuiTypography>
                </StyledCell>
                <StyledCell>
                  <Avatar label={page?.reporter?.name} width={28} height={28} />
                </StyledCell>
              </MuiTableRow>

              <MuiTableRow>
                <StyledCell>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Due Date
                  </MuiTypography>
                </StyledCell>
                <StyledCell>
                  <DateTag date={page?.dueDate} />
                </StyledCell>
              </MuiTableRow>

              <MuiTableRow>
                <StyledCell>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Created By
                  </MuiTypography>
                </StyledCell>
                <StyledCell sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar label={page?.reporter?.name} width={28} height={28} />
                  <span style={{ marginLeft: theme.spacing(1) }}>
                    <DateTag date={page?.createdAt} />
                  </span>
                </StyledCell>
              </MuiTableRow>

              <MuiTableRow>
                <StyledCell>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Last Updated
                  </MuiTypography>
                </StyledCell>
                <StyledCell>
                  <DateTag date={page?.updatedAt} />
                </StyledCell>
              </MuiTableRow>
            </MuiTableBody>
          </MuiTable>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
