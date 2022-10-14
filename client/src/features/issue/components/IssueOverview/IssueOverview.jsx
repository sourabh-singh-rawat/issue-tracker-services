import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/TabPanel";
import Description from "../../../../common/Description";

import { updateIssue } from "../../issue.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";
import { useUpdateIssueMutation } from "../../issue.api";
import IssueAssignee from "../IssueAssignee/IssueAssignee";

export default function IssueOverview() {
  const dispatch = useDispatch();
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();
  const { id } = useParams();
  const [selectedTab] = useOutletContext();
  const issue = useSelector((store) => store.issue.info);

  const updatePageQuery = async () => {
    updateIssueMutation({ id, body: { description: issue.description } });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={0}>
      <MuiGrid container columnSpacing={2}>
        <MuiGrid item xs={6}>
          <MuiTypography variant="body2" fontWeight={600}>
            Description:
          </MuiTypography>
          <Description
            loading={issue.loading}
            page={issue}
            updateDescription={updateIssue}
            updateDescriptionQuery={updatePageQuery}
          />
        </MuiGrid>
        <MuiGrid item xs={6}>
          <MuiTypography variant="body2" fontWeight={600}>
            Assignee:
          </MuiTypography>
          <IssueAssignee />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
