import MuiTab from "@mui/material/Tab";

const styles = {
  color: "text.main",
  textTransform: "none",
  fontWeight: 400,
};

export default function Tab(props) {
  return <MuiTab {...props} sx={styles} disableRipple />;
}
