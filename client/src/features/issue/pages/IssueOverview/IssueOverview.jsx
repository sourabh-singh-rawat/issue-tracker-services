import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext, Link } from "react-router-dom";

import { theme } from "../../../../config/mui.config";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import { ImageList, ImageListItem } from "@mui/material";

import TabPanel from "../../../../common/tabs/TabPanel";
import Description from "../../../../common/textfields/Description";
import IssueAssignee from "../../components/containers/IssueAssignee";

import { setIssueAttachments, updateIssue } from "../../slice/issue.slice";
import { setMessageBarOpen } from "../../../message-bar/slice/message-bar.slice";
import {
  useGetIssueAttachmentsQuery,
  useUpdateIssueMutation,
} from "../../api/issue.api";

const IssueOverview = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const issue = useSelector((store) => store.issue.info);
  const attachments = useSelector((store) => store.issue.attachments);

  const getIssueAttachments = useGetIssueAttachmentsQuery({ issueId: id });
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();
  const updatePageQuery = async () => {
    updateIssueMutation({ id, body: { description: issue.description } });
  };

  useEffect(() => {
    if (getIssueAttachments.isSuccess)
      dispatch(setIssueAttachments(getIssueAttachments.data));
  }, [getIssueAttachments.data]);

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={0}>
      <MuiGrid container columnSpacing={2} rowSpacing={2}>
        <MuiGrid item xs={12} sm={12} md={6}>
          <Description
            page={issue}
            isLoading={issue.isLoading}
            updateDescription={updateIssue}
            updateDescriptionQuery={updatePageQuery}
          />
        </MuiGrid>
        <MuiGrid item xs={12} sm={12} md={12}>
          <MuiTypography variant="body2" fontWeight={600}>
            Assignee:
          </MuiTypography>
          <IssueAssignee />
        </MuiGrid>
        <MuiGrid item>
          <MuiTypography variant="body2" fontWeight={600}>
            Tasks:
          </MuiTypography>
          <MuiTypography variant="body2" sx={{ marginTop: "6px" }}>
            No current incomplete taks.{" "}
            <Link to={`/issues/${id}/tasks`} style={{ textDecoration: "none" }}>
              <MuiTypography
                variant="body2"
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  "&:hover": {
                    transitionDuration: "0.5s",
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                Add task.
              </MuiTypography>
            </Link>
          </MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={12}>
          <MuiTypography variant="body2" fontWeight={600}>
            Attachments:
          </MuiTypography>
          {attachments.rowCount <= 0 ? (
            <MuiTypography variant="body2" sx={{ marginTop: "6px" }}>
              <MuiTypography variant="body2">
                No attachments.{" "}
                <Link
                  to={`/issues/${id}/attachments`}
                  style={{ textDecoration: "none" }}
                >
                  <MuiTypography
                    variant="body2"
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      "&:hover": {
                        transitionDuration: "0.5s",
                        color: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Click to add.
                  </MuiTypography>
                </Link>
              </MuiTypography>
            </MuiTypography>
          ) : (
            <ImageList
              variant="quilted"
              cols={8}
              rowHeight={75}
              sx={{ width: "100%" }}
            >
              {attachments.rows.map(({ id, url }) => {
                return (
                  <ImageListItem key={id}>
                    <img src={url} srcSet={url} loading="lazy" />
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default IssueOverview;
