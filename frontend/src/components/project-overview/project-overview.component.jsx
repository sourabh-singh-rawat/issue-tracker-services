import Typography from "@mui/material/Typography";
import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const ProjectOverview = () => {
  const [selectedTab, project] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={0}>
      <Typography variant="body2">{project.description}</Typography>
    </StyledTabPanel>
  );
};

export default ProjectOverview;
