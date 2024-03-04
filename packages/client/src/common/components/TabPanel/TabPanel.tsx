import React from "react";

import MuiBox from "@mui/material/Box";

function TabPanel({
  children,
  selectedTab,
  index,
  ...otherProps
}): React.JSX.Element {
  return (
    <MuiBox {...otherProps}>
      {selectedTab === index && <MuiBox>{children}</MuiBox>}
    </MuiBox>
  );
}

export default TabPanel;
