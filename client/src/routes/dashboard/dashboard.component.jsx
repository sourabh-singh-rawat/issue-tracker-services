import { connect } from "react-redux";
import { Box, Grid } from "@mui/material";
import StyledAppBar from "../../components/styled-appbar/styled-appbar.component";
import IssueSummary from "../../components/issue-summary/issue-summary.component";
import ProjectSummary from "../../components/project-summary/project-summary.component";

const Dashboard = () => {
  return (
    <>
      <StyledAppBar>Dashboard</StyledAppBar>
      <Box sx={{ marginLeft: 3, marginRight: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8}>
            <ProjectSummary />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <IssueSummary />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Dashboard);
