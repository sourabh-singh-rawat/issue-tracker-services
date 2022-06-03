import DashboardButton from "../../components/dashboard-button/dashboard-button.component";
import { connect } from "react-redux";

// MUI Styles
import { Grid } from "@mui/material";
import StyledAppBar from "../../components/styled-appbar/styled-appbar.component";

const Dashboard = () => {
  return (
    <>
      <StyledAppBar element={<DashboardButton />}>Dashboard</StyledAppBar>
      <Grid container>
        <Grid item></Grid>
      </Grid>
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
