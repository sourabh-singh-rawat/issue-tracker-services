import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";

import IssueList from "../../../issueList/component/IssueList";
import AddIssue from "../../../issue/components/AddIssue";

import { setIssueList } from "../../../issueList/issueList.slice";
import { useGetProjectIssuesQuery } from "../../project.api";

const ProjectIssues = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList
  );

  const getProjectIssuesQuery = useGetProjectIssuesQuery({
    projectId: id,
    sortBy: "creation_date:desc",
  });

  useEffect(() => {
    if (getProjectIssuesQuery.data)
      dispatch(setIssueList(getProjectIssuesQuery.data));
  }, [pageSize, page, getProjectIssuesQuery.isSuccess]);

  return (
    <MuiGrid container spacing={2}>
      <MuiGrid item xs={12} sx={{ display: "flex" }}>
        <MuiBox sx={{ flexGrow: 1 }} />
        <AddIssue />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <IssueList
          rows={rows}
          rowCount={rowCount}
          page={page}
          pageSize={pageSize}
          isLoading={getProjectIssuesQuery.isLoading}
        />
      </MuiGrid>
    </MuiGrid>
  );
};

export default ProjectIssues;
