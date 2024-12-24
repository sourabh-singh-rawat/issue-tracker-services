import { Box } from "@mui/material";

interface CustomTabPanelProps {
  id: string;
  selectedTabId: string;
  children: React.ReactNode;
}

export const CustomTabPanel = ({
  children,
  selectedTabId,
  id,
}: CustomTabPanelProps) => {
  return <Box>{selectedTabId === id && <Box>{children}</Box>}</Box>;
};
