import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext } from "react-router-dom";

import TabPanel from "../../../../common/TabPanel";
import Description from "../../../../common/Description";

import { setSnackbarOpen } from "../../../snackbar.reducer";
import { updateIssue } from "../../issue.slice";

const IssueOverview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedTab] = useOutletContext();
  const issue = useSelector((store) => store.issue.info);

  const updatePageQuery = async () => {
    const response = await fetch(`http://localhost:4000/api/issues/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: issue.description }),
    });

    if (response.status === 200) dispatch(setSnackbarOpen(true));
  };

  return (
    <TabPanel selectedTab={selectedTab} index={0}>
      <Description
        page={issue}
        updateDescription={updateIssue}
        updateDescriptionQuery={updatePageQuery}
      />
    </TabPanel>
  );
};

export default IssueOverview;
