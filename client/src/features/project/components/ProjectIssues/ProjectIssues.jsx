import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";

import IssueList from "../../../issueList/component/IssueList";
import AddIssueButton from "../../../issue/components/AddIssueButton";

import { setIssueList } from "../../../issueList/issueList.slice";
import { useGetProjectIssuesQuery } from "../../project.api";

const ProjectIssues = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList
  );

  const issues = useGetProjectIssuesQuery({
    projectId: id,
    sortBy: "creation_date:desc",
  });

  useEffect(() => {
    if (issues.data) dispatch(setIssueList(issues.data));
  }, [pageSize, page, issues.data]);

  return (
    <MuiGrid container spacing={2}>
      <MuiGrid item xs={12} sx={{ display: "flex" }}>
        <MuiBox sx={{ flexGrow: 1 }} />
        <AddIssueButton />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <IssueList
          rows={rows}
          rowCount={rowCount}
          page={page}
          pageSize={pageSize}
          isLoading={issues.isLoading}
        />
      </MuiGrid>
    </MuiGrid>
  );
};

export default ProjectIssues;
