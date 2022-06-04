import { useOutletContext } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";
import { Edit3 } from "react-feather";

const ProjectOverview = () => {
  const [selectedTab, project] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={0}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" sx={{ marginRight: 0.5 }}>
          Description
        </Typography>
        <IconButton>
          <Edit3 />
        </IconButton>
      </Box>
      <Typography variant="body2">{project.description}</Typography>
    </StyledTabPanel>
  );
};

export default ProjectOverview;
