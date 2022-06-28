import { useOutletContext } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";
import ProjectMemberList from "../ProjectMemberList/ProjectMemberList";
import AddProjectMemberButton from "../AddProjectMemberButton/AddProjectMemberButton";

const ProjectMembers = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={102}>
      <Grid container spacing={2}>
        <Grid item sx={{ display: "flex" }} xs={12}>
          <Box sx={{ flexGrow: 1 }} />
          <AddProjectMemberButton />
        </Grid>
        <Grid item xs={12}>
          <ProjectMemberList />
        </Grid>
      </Grid>
    </StyledTabPanel>
  );
};

export default ProjectMembers;
