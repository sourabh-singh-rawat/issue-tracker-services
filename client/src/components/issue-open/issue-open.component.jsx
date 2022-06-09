import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const IssueOpen = () => {
  const [selectedTab, issue] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={1}>
      App
    </StyledTabPanel>
  );
};

export default IssueOpen;
