import React from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import StyledTabPanel from '../../../../common/tabs/TabPanel';

function TeamOverview() {
  const [selectedTab] = useOutletContext();
  const { description } = useSelector((store) => store.team);

  return (
    <StyledTabPanel index={0} selectedTab={selectedTab}>
      {description}
    </StyledTabPanel>
  );
}

export default TeamOverview;
