import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import { setIssueList } from "../../reducers/issueList.reducer";
import IssueFormModalButton from "../IssueFormModalButton/IssueFormModalButton";
import IssuesList from "../IssuesList/IssuesList";
import { onAuthStateChangedListener } from "../../config/firebase.config";

const ProjectIssues = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  let project_id = id;
  const [isLoading, setIsLoading] = useState(false);
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList
  );

  useEffect(() => {
    setIsLoading(true);
    const fetchIssues = async () => {
      onAuthStateChangedListener(async (user) => {
        const token = await user.getIdToken();

        const response = await fetch(
          `http://localhost:4000/api/issues?limit=${pageSize}&page=${page}&project_id=${project_id}&sort_by=creation_date:desc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          }
        );

        const data = await response.json();
        setIsLoading(false);

        dispatch(setIssueList(data));
      });
    };

    fetchIssues();
  }, [pageSize, page]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }} />
        <IssueFormModalButton />
      </Grid>
      <Grid item xs={12}>
        <IssuesList
          rows={rows}
          rowCount={rowCount}
          page={page}
          pageSize={pageSize}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
};

export default ProjectIssues;
