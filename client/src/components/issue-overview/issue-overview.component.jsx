import { useOutletContext } from "react-router-dom";
import PageDescription from "../page-description/page-description.component";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const IssueOverview = () => {
  const [selectedTab, issue] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={0}>
      <PageDescription page={issue} type="issue" />
    </StyledTabPanel>
  );
};

export default IssueOverview;
