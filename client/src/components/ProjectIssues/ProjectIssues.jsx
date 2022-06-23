import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IssueFormModalButton from "../IssueFormModalButton/IssueFormModalButton";
import IssuesList from "../IssuesList/IssuesList";

const ProjectIssues = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }} />
        <IssueFormModalButton />
      </Grid>
      <Grid item xs={12}>
        <IssuesList />
      </Grid>
    </Grid>
  );
};

export default ProjectIssues;
