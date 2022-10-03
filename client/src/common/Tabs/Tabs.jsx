import MuiTabs from "@mui/material/Tabs";

export default function Tabs(props) {
  return (
    <MuiTabs
      {...props}
      textColor="inherit"
      sx={{
        borderBottom: "1px solid #e3e4e6",
        ".MuiButtonBase-root": {
          padding: 0,
          marginRight: 4,
          minWidth: "auto",
          opacity: 1,
          color: "text.subtitle1",
          fontWeight: 500,
        },
        ".Mui-selected": {
          color: "primary.main",
        },
      }}
    />
  );
}
