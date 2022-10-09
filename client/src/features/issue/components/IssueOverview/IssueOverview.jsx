import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext } from "react-router-dom";

import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/TabPanel";
import Description from "../../../../common/Description";

import { updateIssue } from "../../issue.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";
import { useUpdateIssueMutation } from "../../issue.api";
import { useEffect } from "react";

export default function IssueOverview() {
  const dispatch = useDispatch();
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();
  const { id } = useParams();
  const [selectedTab] = useOutletContext();
  const issue = useSelector((store) => store.issue.info);

  const updatePageQuery = async () => {
    updateIssueMutation({ id, payload: { description: issue.description } });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={0}>
      <MuiTypography variant="body2" fontWeight={600}>
        Description
      </MuiTypography>
      <Description
        loading={issue.loading}
        page={issue}
        updateDescription={updateIssue}
        updateDescriptionQuery={updatePageQuery}
      />
    </TabPanel>
  );
}
