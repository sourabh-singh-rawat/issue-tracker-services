import DashboardButton from "../../components/dashboard-button/dashboard-button.component";

// MUI Styles
import { Grid } from "@mui/material";
import AppBarContainer from "../../components/appbar-container/appbar-container.component";

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

export default Dashboard;
