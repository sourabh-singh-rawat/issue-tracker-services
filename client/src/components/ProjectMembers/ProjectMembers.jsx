import { useOutletContext } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import { Box } from "@mui/material";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";

const ProjectMembers = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={102}>
      <Grid container>
        <Grid item sx={{ display: "flex" }} xs={12}>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Add Member
          </Button>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </StyledTabPanel>
  );
};

export default ProjectMembers;
