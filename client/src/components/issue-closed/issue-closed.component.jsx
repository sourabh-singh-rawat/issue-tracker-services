import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const IssueClosed = () => {
  const [selectedTab, issue] = useOutletContext();
  return (
    <StyledTabPanel selectedTab={selectedTab} index={3}>
      Issue Closed
    </StyledTabPanel>
  );
};

export default IssueClosed;
