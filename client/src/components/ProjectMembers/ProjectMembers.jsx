import { useOutletContext } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";

const ProjectMembers = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={102}>
      <Grid container>
        <Grid item>
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
