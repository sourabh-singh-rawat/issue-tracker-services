import { Tabs, useTheme } from "@mui/material";

interface TabsProps {
  value: number;
  handleChange: (e: unknown, newValue: number) => void;
  children: React.ReactNode;
}

export const CustomTabs = ({ value, handleChange, children }: TabsProps) => {
  const theme = useTheme();

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      children={children}
      component="div"
      sx={{
        px: theme.spacing(1),
        ".MuiButtonBase-root": {
          p: 0,
          minWidth: "auto",
          marginRight: theme.spacing(4),
          fontWeight: theme.typography.fontWeightMedium,
        },
      }}
    />
  );
};
