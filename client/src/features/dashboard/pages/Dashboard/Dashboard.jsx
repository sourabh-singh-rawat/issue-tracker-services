import React from 'react';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';

function Dashboard() {
  return (
    <MuiBox sx={{ marginLeft: 3, marginRight: 3 }}>
      <MuiGrid spacing={3} container>
        <MuiGrid item>
          <MuiTypography variant="body2">
            This project is a work in progress. Not all parts will work. I keep
            updating things when I get time. Thanks for spending your time here
          </MuiTypography>
        </MuiGrid>
      </MuiGrid>
    </MuiBox>
  );
}

export default Dashboard;
