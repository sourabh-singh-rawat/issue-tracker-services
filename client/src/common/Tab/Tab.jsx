import MuiTab from "@mui/material/Tab";

const styles = {
  color: "text.main",
  textTransform: "none",
  fontWeight: 400,
};

const Tab = (props) => {
  return <MuiTab {...props} sx={styles} disableRipple />;
};

export default Tab;
