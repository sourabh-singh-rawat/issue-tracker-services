import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/TabPanel";
import Description from "../../../../common/Description";
import IssueAssignee from "../../components/containers/IssueAssignee";

import { setIssueAttachments, updateIssue } from "../../issue.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";
import {
  useGetIssueAttachmentsQuery,
  useUpdateIssueMutation,
} from "../../issue.api";
import { ImageList, ImageListItem } from "@mui/material";

const IssueOverview = () => {
  const dispatch = useDispatch();
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();
  const { id } = useParams();
  const [selectedTab] = useOutletContext();
  const issue = useSelector((store) => store.issue.info);
  const attachments = useSelector((store) => store.issue.attachments);

  const getIssueAttachments = useGetIssueAttachmentsQuery(id);
  const updatePageQuery = async () => {
    updateIssueMutation({ id, body: { description: issue.description } });
  };

  useEffect(() => {
    if (getIssueAttachments.isSuccess)
      dispatch(setIssueAttachments(getIssueAttachments.data));
  }, [getIssueAttachments.data]);

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={0}>
      <MuiGrid container columnSpacing={2} rowSpacing={2}>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body2" fontWeight={500}>
            Description:
          </MuiTypography>
          <Description
            page={issue}
            isLoading={issue.isLoading}
            updateDescription={updateIssue}
            updateDescriptionQuery={updatePageQuery}
          />
        </MuiGrid>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body2" fontWeight={500}>
            Assignee:
          </MuiTypography>
          <IssueAssignee />
        </MuiGrid>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body2" fontWeight={500}>
            Tasks:
          </MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={12}>
          <MuiTypography variant="body2" fontWeight={500}>
            Attachments:
          </MuiTypography>
          <ImageList
            sx={{ width: "100%" }}
            variant="quilted"
            cols={8}
            rowHeight={75}
          >
            {attachments.rows.map(({ id, url }) => {
              return (
                <ImageListItem key={id}>
                  <img src={url} srcSet={url} loading="lazy" />
                </ImageListItem>
              );
            })}
          </ImageList>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default IssueOverview;
