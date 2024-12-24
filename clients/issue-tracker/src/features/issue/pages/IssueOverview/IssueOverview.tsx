import { useEffect, useState } from "react";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/components/CustomTabPanel";
import IssueAssignees from "../../../../common/components/IssueAssignees";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";

import Avatar from "../../../../common/components/Avatar";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";

import MuiTable from "@mui/material/Table";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableRow from "@mui/material/TableRow";
import DateTag from "../../../../common/components/DateTag";
import Description2 from "../../../../common/components/ItemDescription";
import StyledCell from "../../../../common/components/styled/StyledCell";
import IssuePrioritySelector from "../../../issue-list/components/IssuePrioritySelector";
import IssueStatusSelector from "../../../issue-list/components/IssueStatusSelector";
import IssueResolutionSelector from "../../components/IssueResolutionSelector";

export default function IssueOverview() {
  const theme = useTheme();
  const { id, selectedTab, page, isLoading } = useSelectedTab();
  const { success: showSuccess, error: showError } = useSnackbar();

  const [updateIssueMutation, { isSuccess, isError }] = useState();
  const { data: statuses } = useState();
  const { data: priorityList } = useState();
  // const { data: attachments } = useGetIssueAttachmentListQuery({ id });
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
              <Description2
                defaultValue={page?.description}
                isLoading={isLoading}
                isDisabled={isArchived}
                handleSubmit={async (description) => {
                  await updateIssueMutation({ id, body: { description } });
                }}
              />
            </MuiGrid>
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
              {/* {attachments?.rows <= 0 ? (
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
              )} */}
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
