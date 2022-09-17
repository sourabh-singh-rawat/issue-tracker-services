import MuiBox from "@mui/material/Box";

const TabPanel = ({ children, selectedTab, index, ...otherProps }) => {
  return (
    <MuiBox {...otherProps}>
      {selectedTab === index && <MuiBox>{children}</MuiBox>}
    </MuiBox>
  );
};

export default TabPanel;
