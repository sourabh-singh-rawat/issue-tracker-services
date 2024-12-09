import { Grid2, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import TabPanel from "../../../../common/components/TabPanel";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import IssueList from "../../../issue-list/components/ItemList";

export function ListItems() {
  const theme = useTheme();
  const { listId, itemId, selectedTab } = useSelectedTab();

  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      {!itemId && listId ? (
        <Grid2
          container
          rowSpacing={2}
          sx={{ px: theme.spacing(4), py: theme.spacing(2) }}
        >
          <Grid2 size={12}>
            <IssueList listId={listId} />
          </Grid2>
        </Grid2>
      ) : (
        <Outlet />
      )}
    </TabPanel>
  );
}
