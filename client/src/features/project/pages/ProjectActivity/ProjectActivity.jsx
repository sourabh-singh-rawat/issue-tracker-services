import { useOutletContext } from "react-router-dom";

import Typography from "@mui/material/Typography";

import StyledTabPanel from "../../../../common/tabs/TabPanel";

const ProjectActivity = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={3}>
      <Typography variant="body2">WIP</Typography>
    </StyledTabPanel>
  );
};

export default ProjectActivity;
