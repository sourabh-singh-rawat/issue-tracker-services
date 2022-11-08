import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

const Dashboard = () => {
  return (
    <MuiBox sx={{ marginLeft: 3, marginRight: 3 }}>
      <MuiGrid container spacing={3}>
        <MuiGrid item>
          <MuiTypography variant="body2">
            This project is work in progress. Not all parts will work. I keep
            updating things when i get time. Thanks for spending your time here
          </MuiTypography>
        </MuiGrid>
      </MuiGrid>
    </MuiBox>
  );
};

export default Dashboard;
