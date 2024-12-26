import { Grid2, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import {
  useFindListItemsQuery,
  useFindStatusesQuery,
  useFindViewsQuery,
} from "../../../api";
import { ViewLocation } from "../ViewLocation";
import { ViewTabs } from "../ViewTabs";

export const View = () => {
  const theme = useTheme();
  const currentList = JSON.parse(localStorage.getItem("currentList"));
  const id = currentList?.id;

  const { data: statuses } = useFindStatusesQuery({
    variables: { input: { listId: id } },
  });
  const { data: views } = useFindViewsQuery({
    variables: { listId: id },
    skip: !id,
  });
  const { data: items } = useFindListItemsQuery({
    variables: { listId: id },
  });

  return (
    <Grid2 container rowSpacing={1}>
      <Grid2
        size={12}
        sx={{
          borderBottom: `1px solid ${theme.palette.action.hover}`,
          px: theme.spacing(2),
          py: theme.spacing(1),
        }}
      >
        <ViewLocation />
      </Grid2>
      {views?.findViews && (
        <Grid2
          size={12}
          sx={{
            borderBottom: `1px solid ${theme.palette.action.hover}`,
            px: theme.spacing(2),
          }}
        >
          <ViewTabs listId={id} views={views?.findViews} />
        </Grid2>
      )}
      <Grid2 size={12}>
        <Outlet
          context={{
            items: items?.findListItems,
            statuses: statuses?.findStatuses,
          }}
        />
      </Grid2>
    </Grid2>
  );
};
