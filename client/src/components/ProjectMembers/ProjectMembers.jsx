import { useOutletContext } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";
import ProjectMemberFormModel from "../ProjectMemberFormModel/ProjectMemberFormModel";
import ProjectMemberList from "../ProjectMemberList/ProjectMemberList";

const ProjectMembers = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={102}>
      <Grid container>
        <Grid item sx={{ display: "flex" }} xs={12}>
          <Box sx={{ flexGrow: 1 }} />
          <ProjectMemberFormModel />
        </Grid>
        <Grid item>
          <ProjectMemberList />
        </Grid>
      </Grid>
    </StyledTabPanel>
  );
};

export default ProjectMembers;
