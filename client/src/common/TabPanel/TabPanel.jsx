import MuiBox from "@mui/material/Box";

export default function TabPanel({
  children,
  selectedTab,
  index,
  ...otherProps
}) {
  return (
    <MuiBox {...otherProps}>
      {selectedTab === index && <MuiBox>{children}</MuiBox>}
    </MuiBox>
  );
}
