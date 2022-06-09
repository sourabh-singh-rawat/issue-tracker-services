import { Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const ProjectActivity = () => {
  const [selectedTab] = useOutletContext();
  return (
    <StyledTabPanel selectedTab={selectedTab} index={103}>
      <Typography variant="body1">This is some text</Typography>
    </StyledTabPanel>
  );
};

export default ProjectActivity;
