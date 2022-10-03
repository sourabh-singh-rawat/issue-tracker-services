import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";

export default function Dashboard() {
  return (
    <MuiBox sx={{ marginLeft: 3, marginRight: 3 }}>
      <MuiGrid container spacing={3}></MuiGrid>
    </MuiBox>
  );
}
