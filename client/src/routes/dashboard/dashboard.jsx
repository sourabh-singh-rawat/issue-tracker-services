import { connect } from "react-redux";
import { Box, Grid } from "@mui/material";
import StyledAppBar from "../../components/StyledAppbar/StyledAppbar";

const Dashboard = () => {
  return (
    <>
      <StyledAppBar>Dashboard</StyledAppBar>
      <Box sx={{ marginLeft: 3, marginRight: 3 }}>
        <Grid container spacing={3}></Grid>
      </Box>
    </>
  );
};

export default Dashboard;
