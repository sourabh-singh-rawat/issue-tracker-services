import { useOutletContext } from "react-router-dom";
import Typography from "@mui/material/Typography";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const ProjectMembers = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={102}>
      <Typography variant="body1">
        All the people working on this project
      </Typography>
    </StyledTabPanel>
  );
};

export default ProjectMembers;
