import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { ImageList, useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import { useAppSelector } from "../../../../common/hooks";
import TabPanel from "../../../../common/components/TabPanel";
import Description from "../../../../common/components/Description";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import { useUpdateIssueMutation } from "../../../../api/generated/issue.api";
import { useMessageBar } from "../../../message-bar/hooks";

export default function IssueOverview() {
  const theme = useTheme();
  const { id, selectedTab, page, setPage, isLoading } = useSelectedTab();
  const { showSuccess, showError } = useMessageBar();

  const attachments = useAppSelector((store) => store.issue.attachments);

  const [updateIssueMutation, { isSuccess, isError }] =
    useUpdateIssueMutation();
  const updatePageQuery = async () => {
    updateIssueMutation({ id, body: { description: page?.description } });
  };

  useEffect(() => {
    if (isSuccess) showSuccess("Issue description updated successfully");

    if (isError) showError("Issue description not updated successfully");
  }, [isSuccess]);

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <MuiGrid spacing={2} container sx={{ py: theme.spacing(2) }}>
        <MuiGrid md={8} item>
          <MuiGrid spacing={2} container>
            <MuiGrid item>
              <MuiTypography
                fontWeight={600}
                sx={{ color: theme.palette.text.primary }}
                variant="body1"
              >
                Tasks:
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
            </MuiGrid>
            <MuiGrid xs={12} item>
              <MuiTypography
                fontWeight={600}
                sx={{ color: theme.palette.text.primary }}
                variant="body1"
              >
                Attachments:
              </MuiTypography>
              {attachments.rowCount <= 0 ? (
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
                          fontWeight: 600,
                          "&:hover": {
                            transitionDuration: "0.5s",
                            color: theme.palette.primary.dark,
                          },
                        }}
                        variant="body2"
                      >
                        Click to add.
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
                  {attachments.rows.map(({ id: attachmentId }) => (
                    <ImageCard
                      key={attachmentId}
                      attachmentId={attachmentId}
                      issueId={id}
                    />
                  ))}
                </ImageList>
              )}
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid md={4} item>
          <MuiGrid xs={12} item>
            <Description
              isLoading={isLoading}
              page={page}
              setPage={setPage}
              updateQuery={updatePageQuery}
            />
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
