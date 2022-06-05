import { connect } from "react-redux";
import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";
import PageDescription from "../page-description/page-description.component";

const ProjectOverview = (props) => {
  const { project } = props;
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={0}>
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
