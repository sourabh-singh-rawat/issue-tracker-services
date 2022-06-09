import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const IssueProgress = () => {
  const [selectedTab, issue] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={2}>
      Issue in progress
    </StyledTabPanel>
  );
};

export default IssueProgress;
