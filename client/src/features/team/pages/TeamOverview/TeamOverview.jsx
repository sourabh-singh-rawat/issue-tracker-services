import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import StyledTabPanel from "../../../../common/tabs/TabPanel";

const TeamOverview = () => {
  const [selectedTab] = useOutletContext();
  const { description } = useSelector((store) => store.team);

  return (
    <StyledTabPanel selectedTab={selectedTab} index={0}>
      {description}
    </StyledTabPanel>
  );
};

export default TeamOverview;
