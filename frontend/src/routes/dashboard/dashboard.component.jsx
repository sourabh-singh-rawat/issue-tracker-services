import DashboardButton from "../../components/dashboard-button/dashboard-button.component";
import { connect } from "react-redux";

// MUI Styles
import { Grid } from "@mui/material";
import AppBarContainer from "../../components/appbar/appbar.component";

const Dashboard = () => {
  return (
    <>
      <AppBarContainer element={<DashboardButton />}>Dashboard</AppBarContainer>
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
