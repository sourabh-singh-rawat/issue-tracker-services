import MuiTabs from "@mui/material/Tabs";

const Tabs = (props) => {
  return (
    <MuiTabs
      {...props}
      textColor="inherit"
      sx={{
        borderTop: "1px solid #e3e4e6",
        borderBottom: "1px solid #e3e4e6",

        ".MuiButtonBase-root": {
          padding: 0,
          marginRight: 4,
          minWidth: "auto",
          opacity: 1,
          color: "text.primary",
          fontWeight: 600,
        },
        ".Mui-selected": {
          color: "primary.main",
        },
      }}
    />
  );
};

export default Tabs;
