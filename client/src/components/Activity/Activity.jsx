import { Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";

const ProjectActivity = () => {
  const [selectedTab] = useOutletContext();
  return (
    <StyledTabPanel selectedTab={selectedTab} index={103}>
      <Typography variant="body1">This is some text</Typography>
    </StyledTabPanel>
  );
};

export default ProjectActivity;
