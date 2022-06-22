import { Button, Grid } from "@mui/material";
import IssuesList from "../IssuesList/IssuesList";

const ProjectIssues = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button variant="contained">Add Issue</Button>
      </Grid>
      <Grid item xs={12}>
        <IssuesList />
      </Grid>
    </Grid>
  );
};

export default ProjectIssues;
