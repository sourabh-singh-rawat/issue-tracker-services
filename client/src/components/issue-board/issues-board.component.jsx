import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const IssuesBoard = () => {
  const [selectedTab] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={2}>
      Board
    </StyledTabPanel>
  );
};

export default IssuesBoard;
