import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";

import IssueList from "../../../issueList/component/IssueList";
import AddIssue from "../../../issue/components/AddIssue";

const ProjectIssues = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList
  );

  return (
    <MuiGrid container spacing={1}>
      <MuiGrid item xs={12} sx={{ display: "flex" }}>
        <MuiBox sx={{ flexGrow: 1 }} />
        <AddIssue />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <IssueList projectId={id} />
      </MuiGrid>
    </MuiGrid>
  );
};

export default ProjectIssues;
