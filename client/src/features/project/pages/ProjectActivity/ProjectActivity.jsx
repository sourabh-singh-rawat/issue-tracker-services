import { useOutletContext } from "react-router-dom";

import { Typography } from "@mui/material";

import StyledTabPanel from "../../../../common/TabPanel";

const ProjectActivity = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={3}>
      <Typography variant="body2">This is some text</Typography>
    </StyledTabPanel>
  );
};

export default ProjectActivity;
