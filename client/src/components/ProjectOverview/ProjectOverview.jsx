import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";
import PageDescription from "../PageDescription/PageDescription";

const ProjectOverview = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={100}>
      <PageDescription type="project" />
    </StyledTabPanel>
  );
};

export default ProjectOverview;
