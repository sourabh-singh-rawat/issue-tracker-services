import { connect } from "react-redux";
import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";
import PageDescription from "../PageDescription/PageDescription";

const ProjectOverview = ({ project }) => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={100}>
      <PageDescription page={project} type="project" />
    </StyledTabPanel>
  );
};

const mapStateToProps = (store) => {
  return {
    project: store.project,
  };
};

export default connect(mapStateToProps)(ProjectOverview);
