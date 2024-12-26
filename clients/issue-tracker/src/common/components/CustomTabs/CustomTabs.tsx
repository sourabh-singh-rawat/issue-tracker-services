import { useTheme } from "@mui/material";
import MuiTabs from "@mui/material/Tabs";

interface TabsProps {
  value: number;
  handleChange: (e: unknown, newValue: number) => void;
  children: React.ReactNode;
}

export const CustomTabs = ({ value, handleChange, children }: TabsProps) => {
  const theme = useTheme();

  return (
    <MuiTabs
      value={value}
      onChange={handleChange}
      children={children}
      component="div"
      sx={{
        px: theme.spacing(1),
        ".MuiButtonBase-root": {
          padding: 0,
          minWidth: "auto",
          opacity: 1,
          marginRight: theme.spacing(4),
          fontSize: theme.typography.h6,
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.secondary,
        },
      }}
    />
  );
};
