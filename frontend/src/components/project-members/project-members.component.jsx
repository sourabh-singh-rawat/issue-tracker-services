import { useOutletContext } from "react-router-dom";
import { Typography } from "@mui/material";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const ProjectMembers = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={2}>
      <div>
        <Typography variant="body2">All the members of the project</Typography>
      </div>
    </StyledTabPanel>
  );
};

export default ProjectMembers;
